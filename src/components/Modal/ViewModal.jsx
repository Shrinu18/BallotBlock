"use client";
import { getTokenByVid } from "@/services/allService";
import React, { useEffect, useMemo, useState } from "react";

export default function ViewModal({ show, onClose, pData }) {
  const [voterSummary, setVoterSummary] = useState([]);

  const polloptions = useMemo(() => {
    return Array.isArray(pData?.polloptions)
      ? pData.polloptions.flatMap((opt) =>
          Object.entries(opt).map(([key, value]) => ({
            key,
            description: value.description,
            totalvotes: value.totalvotes,
            votes: value.votes ?? [],
          }))
        )
      : [];
  }, [pData]);

  const maxVotes = Math.max(...polloptions.map((o) => o.totalvotes), 0);
  const topOptions = polloptions.filter((o) => o.totalvotes === maxVotes);
  const isDraw = topOptions.length > 1;
  const sortedOptions = [...polloptions].sort(
    (a, b) => b.totalvotes - a.totalvotes
  );
  const secondHighestVotes = sortedOptions[1]?.totalvotes ?? 0;
  const voteDifference = maxVotes - secondHighestVotes;

  useEffect(() => {
    const fetchVoterTokens = async () => {
      const allVotes = [];

      for (const option of polloptions) {
        for (const voter of option.votes) {
          const token = await getTokenByVid(voter);
          allVotes.push({
            token,
            votedFor: option.description,
          });
        }
      }

      setVoterSummary(allVotes);
    };

    if (pData) fetchVoterTokens();
  }, [pData, polloptions]);

  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-30 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:container md:mx-0 mx-2 w-full md:p-8 p-4 bg-[#FFFFFF] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl text-[#000000] font-bold text-center">
            Poll Details!
          </h1>
          {pData ? (
            <>
              <div className="mt-2 md:max-h-[70vh] max-h-[60vh] custom-scrollbar overflow-y-auto md:[&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar-thumb]:bg-[#007FFF] md:pr-1">
                <div className="mt-4 px-2">
                  <p className="text-[#007FFF] text-center font-bold text-2xl">
                    {pData.pollname}
                  </p>
                  <p className="text-[#000000] font-semibold mt-3 text-lg">
                    {pData.polldes}
                  </p>
                  <div className="flex justify-between flex-col md:flex-row mt-4">
                    <div>
                      <p className="text-[#007FFF] font-semibold">
                        Started:{" "}
                        <span className="text-[#000000]">
                          {new Date(pData.startdatetime).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[#007FFF] font-semibold">
                        Ended:{" "}
                        <span className="text-[#000000]">
                          {new Date(pData.enddatetime).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-xl text-[#000000] font-bold mb-2">
                      Polling Options:
                    </h2>
                    {polloptions.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col mt-2 md:text-lg text-base font-bold ${
                          topOptions.some((top) => top.key === opt.key) &&
                          !isDraw
                            ? "bg-[#FFC100] px-6 py-2 rounded-xl"
                            : "bg-[#000000] px-6 py-2 rounded-xl"
                        }`}
                      >
                        {topOptions.some((top) => top.key === opt.key) &&
                        !isDraw ? (
                          <>
                            <div className="flex justify-between items-center text-[#000000] md:text-xl text-base">
                              <div>{opt.description}</div>
                              <div className="flex justify-center items-center gap-1 ">
                                ({opt.totalvotes} votes) Won
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-6"
                                  fill={"none"}
                                >
                                  <path
                                    d="M12 17C10.3264 17 8.86971 18.265 8.11766 20.1312C7.75846 21.0225 8.27389 22 8.95877 22H15.0412C15.7261 22 16.2415 21.0225 15.8823 20.1312C15.1303 18.265 13.6736 17 12 17Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M18.5 5H19.7022C20.9031 5 21.5035 5 21.8168 5.37736C22.13 5.75472 21.9998 6.32113 21.7393 7.45395L21.3485 9.15307C20.7609 11.7086 18.6109 13.6088 16 14"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M5.5 5H4.29779C3.09692 5 2.49649 5 2.18324 5.37736C1.86999 5.75472 2.00024 6.32113 2.26075 7.45395L2.65148 9.15307C3.23914 11.7086 5.38912 13.6088 8 14"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 17C15.0208 17 17.565 12.3379 18.3297 5.99089C18.5412 4.23558 18.647 3.35793 18.0868 2.67896C17.5267 2 16.6223 2 14.8134 2H9.18658C7.37775 2 6.47333 2 5.91317 2.67896C5.35301 3.35793 5.45875 4.23558 5.67025 5.99089C6.435 12.3379 8.97923 17 12 17Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-center text-[#FFFFFF] md:text-base text-sm">
                              <div>{opt.description}</div>
                              <div className="flex justify-center items-center gap-1 ">
                                ({opt.totalvotes} votes)
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    <p className="mt-2 text-center text-sm text-[#007FFF] font-black">
                      {isDraw
                        ? "Result: Draw between top options."
                        : `Winner: ${
                            topOptions[0]?.description
                          } by ${voteDifference} vote${
                            voteDifference === 1 ? "" : "s"
                          }`}
                    </p>
                  </div>
                  {voterSummary.length > 0 ? (
                    <div className="mt-6">
                      <h2 className="text-xl text-[#000000] font-bold mb-2">
                        Voter Summary
                      </h2>
                      <div>
                        <div className="grid grid-cols-8 bg-[#000000] px-6 py-2 rounded-lg items-center">
                          <div className="col-span-7 overflow-hidden">
                            <span className="text-[#007FFF] truncate whitespace-nowrap overflow-hidden text-ellipsis block text-xl font-bold">
                              Token
                            </span>
                          </div>
                          <div className="hidden sm:block">
                            <p className="flex justify-end items-center gap-3 text-yellow-400 text-xl  font-bold">
                              Cost
                            </p>
                          </div>
                        </div>
                        {voterSummary.map((entry, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-8 bg-[#000000] px-6 py-2 rounded-lg items-center mt-1"
                          >
                            <div className="col-span-7 overflow-hidden">
                              <span className="text-[#FFFFFF] truncate whitespace-nowrap overflow-hidden text-ellipsis block text-xs font-bold">
                                {entry.token}
                              </span>
                            </div>
                            <div className="hidden sm:block">
                              <p className="flex justify-end items-center gap-3 text-yellow-400 font-bold">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-6"
                                  fill={"none"}
                                >
                                  <path
                                    d="M15 15C15 15.8284 15.6716 16.5 16.5 16.5C17.3284 16.5 18 15.8284 18 15C18 14.1716 17.3284 13.5 16.5 13.5C15.6716 13.5 15 14.1716 15 15Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M15.0038 7.80257C9.57619 7.42647 5.1047 6.62109 3 5.99976V15.0612C3 17.0556 3 18.0528 3.61958 18.8661C4.23916 19.6794 5.08923 19.9091 6.78937 20.3685C9.53623 21.1107 12.4235 21.5527 15.0106 21.8055C17.6919 22.0675 19.0325 22.1985 20.0163 21.2995C21 20.4005 21 18.9564 21 16.068V14.0544C21 11.2495 21 9.84706 20.1929 8.97664C19.3859 8.10622 17.9252 8.005 15.0038 7.80257Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.6258 8C18.0035 6.57673 18.3453 3.98822 17.327 2.70292C16.6816 1.88827 15.7223 1.96654 14.7818 2.04926C9.83791 2.48406 6.34544 3.36731 4.39301 3.96737C3.55348 4.2254 3 5.04522 3 5.96044"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                2 BaBl
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl text-[#FFFFFF] font-bold mb-2">
                        Voter Summary
                      </h2>
                      <div className="text-white text-center py-4">
                        No Voters
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-white text-center py-4">
              No Poll Data Available
            </div>
          )}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex items-center gap-2 bg-[#FF0000] text-[#000000] hover:bg-[#007FFF] px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
