import supabase from "@/lib/supabaseClient";
import {
	createJWT,
	createJWTNoExpiry,
	verifyJWT,
	verifyJWTNoExpiry,
} from "@/lib/jose";

const XOR_KEY = process.env.NEXT_PUBLIC_SEC_KEY;

export function xorCipher(input, key) {
	let result = "";
	for (let i = 0; i < input.length; i++) {
		const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
		result += String.fromCharCode(charCode);
	}
	return result;
}

export function xorEncryptToBase64(plaintext, key) {
	const encrypted = xorCipher(plaintext, key);
	return btoa(encrypted);
}
export function xorDecryptFromBase64(base64Ciphertext, key) {
	const decrypted = xorCipher(atob(base64Ciphertext), key);
	return decrypted;
}

class BBAMethod {
	async smac(walletaddress, nce, otherdetails = null) {
		try {
			let verifiedPayload;
			try {
				verifiedPayload = await verifyJWTNoExpiry(walletaddress);
			} catch (err) {
				verifiedPayload = null;
			}

			if (!verifiedPayload || !verifiedPayload.uid) {
				return { success: false, error: "JWT verification failed" };
			}

			const { data: user, error } = await supabase
				.from("bbuser")
				.select("*")
				.eq("uid", verifiedPayload.uid)
				.maybeSingle();

			console.log(user);

			if (error || !user) {
				return { success: false, error: "User not found" };
			}

			const status = verifiedPayload.uid == user.uid ? "success" : "failed";

			let purpose, amount;

			if (nce === 1234) {
				purpose = "credited";
				amount = 100;
			} else if (nce === 4321) {
				purpose = "debited";
				amount = 10;
			} else if (nce === 5678) {
				purpose = "debited";
				amount = 2;
			} else {
				return { success: false, error: "Invalid nonce" };
			}

			const txnPayload = {
				timestamp: Date.now(),
				walletaddress,
				amount,
				purpose,
				nonce: nce,
				status,
			};

			const txnToken = await createJWTNoExpiry(txnPayload);

			const { data: txnData, error: insertError } = await supabase
				.from("bbtxn")
				.insert({
					walletaddress,
					token: txnToken,
				})
				.select("tid")
				.single();

			if (insertError) {
				return { success: false, error: insertError.message };
			}

			const tid = txnData?.tid;

			const balance = Number(user?.balance || 0);
			const amt = Number(amount || 0);

			const newBalance =
				purpose === "credited" ? balance + amt : Math.max(balance - amt, 0);

			const { error: balanceUpdateError } = await supabase
				.from("bbuser")
				.update({ balance: newBalance })
				.eq("uid", user.uid);

			if (balanceUpdateError) {
				return { success: false, error: balanceUpdateError.message };
			}

			if (nce === 4321 && otherdetails?.polladdress) {
				const { data: pollTransData, error: pollTransError } = await supabase
					.from("bbpolltrans")
					.insert({
						walletaddress,
						polladdress: otherdetails.polladdress,
					})
					.select("pid")
					.single();

				if (pollTransError) {
					return { success: false, error: pollTransError.message };
				}

				const pid = pollTransData?.pid;

				const voteraddress = await createJWTNoExpiry({ pid });

				const ptxnpayload = {
					timestamp: Date.now(),
					walletaddress,
					tid,
					polladdress: otherdetails.polladdress,
					pollname: otherdetails.pollname,
					polldes: otherdetails.polldes,
					nonce: otherdetails.polloptions,
					voteraddress,
				};

				console.log("ptxnpayload:", ptxnpayload);

				const ptxnToken = await createJWTNoExpiry(ptxnpayload);

				const { error: updatePollTransError } = await supabase
					.from("bbpolltrans")
					.update({ token: ptxnToken })
					.eq("pid", pid);

				if (updatePollTransError) {
					return { success: false, error: updatePollTransError.message };
				}
			}

			if (nce === 5678 && otherdetails?.polladdress) {
				const { data: pollTransRow, error: pollTransErr } = await supabase
					.from("bbpolltrans")
					.select("pid, token")
					.eq("polladdress", otherdetails.polladdress)
					.maybeSingle();

				if (pollTransErr || !pollTransRow) {
					return { success: false, error: "Poll transaction not found" };
				}

				const { pid, token } = pollTransRow;

				let decoded;
				try {
					decoded = await verifyJWTNoExpiry(token);
				} catch (err) {
					return { success: false, error: "Invalid poll transaction token" };
				}

				const voteraddress = decoded?.voteraddress;
				if (!voteraddress) {
					return { success: false, error: "Voter address missing in token" };
				}
				console.log("voteraddress", voteraddress);

				const voterTxnPayload = {
					timestamp: Date.now(),
					walletaddress,
					tid,
					voteraddress,
					pid,
					nonce: otherdetails.nonce,
				};

				const voterTxnToken = await createJWTNoExpiry(voterTxnPayload);

				const { data: voterInsert, error: voterInsertError } = await supabase
					.from("bbvoterstrans")
					.insert({
						walletaddress,
						voteraddress,
						token: voterTxnToken,
					})
					.select("vid")
					.single();

				if (voterInsertError) {
					return { success: false, error: voterInsertError.message };
				}
				const vid = voterInsert?.vid;

				const selectedOptionKey = otherdetails.selectedOption;
				const selectedOptionDesc = otherdetails.selectedOptionDesc;

				const selectedOption = otherdetails.polloptions.find((optObj) => {
					const key = Object.keys(optObj)[0];
					const option = optObj[key];
					return (
						key === selectedOptionKey &&
						option.description === selectedOptionDesc
					);
				});

				if (!selectedOption) {
					return { success: false, error: "Selected option not found" };
				}

				const votesArray = selectedOption[selectedOptionKey]?.votes || [];

				if (votesArray.includes(vid)) {
					return {
						success: false,
						error: "You have already voted in this poll.",
					};
				}

				const updatedOptions = otherdetails.polloptions.map((optObj) => {
					const key = Object.keys(optObj)[0];
					const option = optObj[key];

					if (
						key === otherdetails.selectedOption &&
						option.description === otherdetails.selectedOptionDesc
					) {
						return {
							[key]: {
								...option,
								totalvotes: option.totalvotes + 1,
								votes: [...option.votes, vid],
							},
						};
					}

					return optObj;
				});

				const aa = await supabase
					.from("bbcreatepoll")
					.update({ polloptions: updatedOptions })
					.eq("cpid", otherdetails.cpid);
			}

			return { success: true };
		} catch (err) {
			return { success: false, error: err.message };
		}
	}
}

export const signUpUser = async (userData) => {
	try {
		const encryptedUsername = xorEncryptToBase64(userData.username, XOR_KEY);
		const encryptedPassword = xorEncryptToBase64(userData.password, XOR_KEY);

		const { data: existingUser } = await supabase
			.from("bbuser")
			.select("uid")
			.eq("username", encryptedUsername)
			.maybeSingle();

		if (existingUser)
			return { success: false, error: "Username already exists" };

		const { data, error } = await supabase
			.from("bbuser")
			.insert({
				username: encryptedUsername,
				password: encryptedPassword,
			})
			.select("uid")
			.single();

		if (error) return { success: false, error: error.message };

		const walletaddress = await createJWTNoExpiry({ uid: data.uid });

		const { data: updata, error: uperr } = await supabase
			.from("bbuser")
			.update({
				walletaddress,
				balance: 0,
			})
			.eq("uid", data.uid);

		if (uperr) return { success: false, error: uperr.message };

		const bba = new BBAMethod();
		const { success, error: smacerror } = await bba.smac(walletaddress, 1234);

		if (smacerror) {
			return { success: false, error: smacerror };
		}

		const token = await createJWT({
			uid: data.uid,
		});

		if (typeof window !== "undefined") {
			localStorage.setItem("jwt", token);
		}

		return { success: true };
	} catch (err) {
		return { success: false, error: err.message };
	}
};

export const signInUser = async (userData) => {
	try {
		const encryptedUsername = xorEncryptToBase64(userData.username, XOR_KEY);
		const encryptedPassword = xorEncryptToBase64(userData.password, XOR_KEY);

		const { data, error } = await supabase
			.from("bbuser")
			.select("uid")
			.match({ username: encryptedUsername, password: encryptedPassword });

		if (error) {
			return { success: false, error: error.message };
		}

		if (data && data.length > 0) {
			const token = await createJWT({ uid: data[0].uid });

			if (typeof window !== "undefined") {
				localStorage.setItem("jwt", token);
			}

			return { success: true };
		} else {
			return {
				success: false,
				error: "Invalid Username or Password!",
			};
		}
	} catch (err) {
		return { success: false, error: err.message };
	}
};

export const validLoginSession = async (token) => {
	try {
		let payload;
		try {
			payload = await verifyJWT(token);
		} catch {
			return { situation: "Session Expired!" };
		}

		const uid = payload?.uid;
		if (!uid) return { situation: "Session Expired!" };

		const { data: user, error } = await supabase
			.from("bbuser")
			.select("uid, username, walletaddress, balance")
			.eq("uid", uid)
			.maybeSingle();

		if (error || !user) return { error: error?.message || "User not found" };

		const decodedUsername = xorDecryptFromBase64(user.username, XOR_KEY);

		const userData = {
			uid: user.uid,
			username: decodedUsername,
			walletaddress: user.walletaddress,
			balance: user.balance,
		};

		const { data: polls, error: pollError } = await supabase
			.from("bbcreatepoll")
			.select("*");

		if (pollError) return { error: pollError.message };

		const now = new Date();
		const liveAndUpcoming = [];
		const recentpollresults = [];

		polls.forEach((poll) => {
			const start = new Date(poll.startdatetime);
			const end = new Date(poll.enddatetime);

			if (end < now) {
				recentpollresults.push(poll);
			} else {
				liveAndUpcoming.push(poll);
			}
		});

		return {
			success: true,
			userData,
			livepolls: liveAndUpcoming.sort(
				(a, b) => new Date(a.startdatetime) - new Date(b.startdatetime)
			),
			recentpollresults: recentpollresults.sort(
				(a, b) => new Date(b.enddatetime) - new Date(a.enddatetime)
			),
		};
	} catch (err) {
		return { success: false, error: err.message };
	}
};

export const pollCreation = async (walletaddress, polldata) => {
	try {
		const { data, error } = await supabase
			.from("bbcreatepoll")
			.insert({
				pollname: polldata.pollname,
				polldes: polldata.polldes,
				polloptions: polldata.polloptions,
				startdatetime: polldata.startdatetime,
				enddatetime: polldata.enddatetime,
			})
			.select("cpid")
			.single();

		if (error) return { success: false, error: error.message };
		const cpid = data?.cpid;

		if (!cpid) return { success: false, error: "CPID not returned." };

		const polladdress = await createJWTNoExpiry({ cpid });

		const { error: updateError } = await supabase
			.from("bbcreatepoll")
			.update({ polladdress })
			.eq("cpid", cpid);

		if (updateError) return { success: false, error: updateError.message };

		const odet = {
			polladdress,
			pollname: polldata.pollname,
			polldes: polldata.polldes,
			polloptions: polldata.polloptions,
		};

		const bba = new BBAMethod();
		const smacResult = await bba.smac(walletaddress, 4321, odet);

		if (!smacResult.success) {
			return { success: false, error: "Transaction (smac) failed." };
		}

		return { success: true };
	} catch (err) {
		return { success: false, error: err.message };
	}
};

export const voteCreation = async (walletaddress, pData) => {
	try {
		console.log("data in voteCreation", walletaddress, pData);

		const smacInstance = new BBAMethod();
		const { success, error } = await smacInstance.smac(
			walletaddress,
			5678,
			pData
		);
		if (error) {
			return { success: false, error };
		}

		return { success: true };
	} catch (err) {
		return { success: false, error: err.message };
	}
};

export const hasUserVoted = async (walletaddress, polloptions) => {
	try {
		const { data: voterTransData, error } = await supabase
			.from("bbvoterstrans")
			.select("vid")
			.eq("walletaddress", walletaddress);

		if (error || !voterTransData?.length) {
			// console.log("No voter records found or error occurred", error);
			return false;
		}

		const userVids = voterTransData.map((row) => row.vid);

		for (const optObj of polloptions) {
			const key = Object.keys(optObj)[0];
			const votes = optObj[key]?.votes || [];

			if (votes.some((voteVid) => userVids.includes(voteVid))) {
				return true;
			}
		}

		return false;
	} catch (err) {
		// console.log("Error checking vote status:", err.message);
		return false;
	}
};

export const getTokenByVid = async (vid) => {
	try {
		const { data, error } = await supabase
			.from("bbvoterstrans")
			.select("token")
			.eq("vid", vid)
			.maybeSingle();

		if (error || !data?.token) {
			return "Unknown Token";
		}

		return data.token;
	} catch (err) {
		return "Unknown Token";
	}
};

export const getUserVidsByWallet = async (walletaddress) => {
	try {
		if (!walletaddress) return [];

		const { data, error } = await supabase
			.from("bbvoterstrans")
			.select("vid")
			.eq("walletaddress", walletaddress);

		if (error) {
			return "Error fetching user vids";
		}

		return data.map((row) => row.vid);
	} catch (err) {
		return "Exception in getUserVidsByWallet";
	}
};
