"use client";
import React, { useState } from "react";
import ViewModal from "../Modal/ViewModal";

export default function RecentPollResult({ recentPollsData }) {
  const [showView, setshowView] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  return (
    <div className="md:container md:mx-auto mt-6">
      <div className="border-2 p-4 border-[#FFFFFF] rounded-4xl">
        <span className="text-[#007FFF] md:text-4xl text-xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="md:w-10 w-7"
            fill={"none"}
          >
            <path
              d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Recent <span className="text-[#FFFFFF]">Poll Results</span>
        </span>
        {Array.isArray(recentPollsData) && recentPollsData.length > 0 ? (
          <>
            <div className="mt-4 md:max-h-[50vh] max-h-[28vh] custom-scrollbar overflow-y-auto rounded-lg md:[&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar-thumb]:bg-[#007FFF] md:pr-1">
              {recentPollsData?.length === 0 ? (
                <div className="text-white text-center py-4">
                  No Data Available
                </div>
              ) : (
                recentPollsData.map((poll, idx) => {
                  const flatOptions = Array.isArray(poll.polloptions)
                    ? poll.polloptions.flatMap((optionObj) =>
                        Object.entries(optionObj).map(([key, value]) => ({
                          key,
                          description: value.description,
                          totalvotes: value.totalvotes,
                        }))
                      )
                    : [];

                  const maxVotes = Math.max(
                    ...flatOptions.map((opt) => opt.totalvotes)
                  );
                  const topOptions = flatOptions.filter(
                    (opt) => opt.totalvotes === maxVotes
                  );
                  const hasClearWinner = topOptions.length === 1;
                  const winnerKey = hasClearWinner ? topOptions[0].key : null;

                  return (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] md:p-4 p-2 rounded-4xl mb-2"
                    >
                      <div className="w-full">
                        <div className="md:grid grid-cols-7 items-center justify-between">
                          <div className="md:col-span-5 items-center gap-6">
                            <h1 className="md:text-4xl text-xl text-[#000000] font-bold md:text-left text-center">
                              {poll.pollname}
                            </h1>
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex md:justify-end justify-center">
                              <p className="md:text-lg md:mt-0 mb-1 mt-1 text-right px-4 bg-[#000000] text-[#FFFFFF] rounded-xl py-1 font-medium">
                                {hasClearWinner ? (
                                  <>
                                    <span className="text-[#FFC100] font-bold">
                                      {topOptions[0].description}
                                    </span>{" "}
                                    won by{" "}
                                    <span className="text-[#FFC100] font-bold">
                                      {topOptions[0].totalvotes} Votes
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-[#007FFF] font-bold">
                                    Draw
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPoll(poll);
                                  setshowView(true);
                                }}
                                className="md:mt-0 mt-1 w-full md:w-fit py-2 px-6 bg-[#007FFF] hover:bg-[#000000] hover:text-[#FFFFFF] rounded-2xl font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-1"
                              >
                                View
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-6"
                                  fill={"none"}
                                >
                                  <path
                                    d="M16.5 7.5L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M8 6.18791C8 6.18791 16.0479 5.50949 17.2692 6.73079C18.4906 7.95209 17.812 16 17.812 16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-[#000000] font-medium md:text-base text-sm md:mt-4 mt-2">
                          {poll.polldes}
                        </p>
                        {flatOptions.map((opt, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1 mt-2 font-bold md:text-lg text-base ${
                              hasClearWinner && opt.key === winnerKey
                                ? "text-green-500"
                                : "text-[#000000]"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-6 text-[#007FFF]"
                              fill={"none"}
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="8"
                                strokeWidth="2"
                                fill="currentColor"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {opt.description} ({opt.totalvotes} votes)
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <div className="text-white text-center py-4">
            No Poll Data Available
          </div>
        )}

        {showView && (
          <ViewModal
            show={showView}
            onClose={() => setshowView(false)}
            pData={selectedPoll}
          />
        )}
      </div>
    </div>
  );
}
