"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
	{
		title: "True Ownership & Privacy",
		content:
			"Your vote belongs to you. With wallet-based identity and JOSE-secured tokens, there’s no need for emails or passwords — just cryptographic security, from end to end.",
		image: "/images/1.png",
	},
	{
		title: "Tokenized Voting Power",
		content:
			"We’ve integrated the BaBl Token to bring real value to participation. Whether you're creating a poll or casting a vote, every action is logged and rewarded transparently.",
		image: "/images/2.png",
	},
	{
		title: "Real-Time Updates",
		content:
			"No more refreshing. Thanks to Supabase Realtime, new polls, live vote counts, and user activity are reflected instantly.",
		image: "/images/3.png",
	},
	{
		title: "Lightweight. Fast. No Bloat.",
		content:
			"Built with Next.js, Tailwind CSS, and pure React — BallotBlock loads fast, feels snappy, and works seamlessly across devices.",
		image: "/images/4.png",
	},
	{
		title: "Auditable & Verifiable",
		content:
			"Every vote is stored with a tamper-proof transaction token. Anyone can verify the legitimacy of voting history — no admin overrides, no hidden results.",
		image: "/images/5.png",
	},
	{
		title: "Community-Driven",
		content:
			"Whether you're organizing a club vote or hosting a DAO decision — BallotBlock is flexible, scalable, and designed for communities of any size.",
		image: "/images/1.png",
	},
];

export default function WhyChoose() {
	const [openIndex, setOpenIndex] = useState(0); // First section open by default

	const toggleSection = (index) => {
		setOpenIndex(index);
	};

	return (
		<div className="md:container mx-auto min-h-screen flex justify-around items-center">
			<div className="flex w-full gap-6 items-end">
				{/* Left Section (Text + Image) */}
				<div className="w-1/3">
					<h1 className="text-[#FFFFFF] text-2xl md:text-2xl text-left font-black">
						Why Choose{" "}
					</h1>
					<h1 className="text-[#FFFFFF] text-2xl md:text-7xl font-bold text-left leading-tight">
						Ballot<span className="font-light text-[#FFFFFF]">Block ?</span>
					</h1>
					<h1 className="text-[#FFFFFF] text-xl font-light leading-tight text-left">
						BallotBlock isn't just another polling app — it’s a <br />
						<span className="text-[#007FFF] text-2xl font-bold">
							Decentralized, Transparent, and User-First
						</span>{" "}
						voting experience.
					</h1>

					{/* Animated Image */}
					<div className="relative mt-6 w-full h-[300px] flex justify-start items-center">
						<AnimatePresence mode="wait">
							<motion.img
								key={sections[openIndex].image}
								src={sections[openIndex].image}
								alt={sections[openIndex].title}
								className="absolute w-full h-full object-cover rounded-xl shadow-lg"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.05 }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
							/>
						</AnimatePresence>
					</div>
				</div>

				{/* Right Section (Accordion) */}
				<div className="text-[#FFFFFF] w-2/3">
					<div className="space-y-2">
						{sections.map((section, index) => (
							<div
								key={index}
								className="bg-[#FFFFFF] px-6 py-3 rounded-xl w-full"
							>
								<button
									className="text-[#000000] text-2xl font-bold text-left flex justify-between items-center w-full"
									onClick={() => toggleSection(index)}
								>
									{section.title}
									<span>
										{openIndex === index ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="w-8"
												fill={"none"}
											>
												<path
													d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
													stroke="currentColor"
													strokeWidth="2"
												/>
												<path
													d="M8 13.1667L10.1144 15.2109C11.0033 16.0703 11.4477 16.5 12 16.5C12.5523 16.5 12.9967 16.0703 13.8856 15.2109L16 13.1667M8 7.5L10.1144 9.54423C11.0033 10.4036 11.4477 10.8333 12 10.8333C12.5523 10.8333 12.9967 10.4036 13.8856 9.54423L16 7.5"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="w-8"
												fill={"none"}
											>
												<path
													d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
													stroke="currentColor"
													strokeWidth="2"
												/>
												<path
													d="M13.1667 8L15.2109 10.1144C16.0703 11.0033 16.5 11.4477 16.5 12C16.5 12.5523 16.0703 12.9967 15.2109 13.8856L13.1667 16M7.5 8L9.54423 10.1144C10.4036 11.0033 10.8333 11.4477 10.8333 12C10.8333 12.5523 10.4036 12.9967 9.54424 13.8856L7.5 16"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										)}
									</span>
								</button>

								<AnimatePresence mode="sync">
									{openIndex === index && (
										<motion.div
											key={index}
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.4, ease: "easeInOut" }}
											className="overflow-hidden"
										>
											<p className="mt-2 font-medium text-[#000000] text-lg text-left">
												{section.content}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
