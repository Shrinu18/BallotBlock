"use client";
import React, { useEffect, useState } from "react";
import VoteNow from "../Modal/VoteNowModal";
import { getUserVidsByWallet, hasUserVoted } from "@/services/allService";
import useUserData from "@/hooks/useUserData";

export default function LivePolling({ livePollData, uData, setLivePollsData }) {
  const [showVoteNow, setShowVoteNow] = useState(false);
  const [pData, setpData] = useState({});
  const [disabledVotes, setDisabledVotes] = useState([]);
  const [timers, setTimers] = useState({});
  const [userVids, setUserVids] = useState([]);
  const now = new Date();

  useUserData({ setIData: setLivePollsData, userId: uData?.walletaddress });

  useEffect(() => {
    if (!Array.isArray(livePollData)) return;

    const interval = setInterval(() => {
      const now = new Date();

      const updated = {};
      let hasRefreshed = false;
      livePollData.forEach((poll) => {
        const start = new Date(poll.startdatetime);
        const end = new Date(poll.enddatetime);

        if (now < start) {
          updated[poll.cpid] = `Starts in ${formatTimeDiff(start - now)}`;
        } else if (now >= start && now < end) {
          updated[poll.cpid] = `Ends in ${formatTimeDiff(end - now)}`;
        } else {
          updated[poll.cpid] = `Poll Ended`;
          if (!hasRefreshed) {
            hasRefreshed = true;
            setTimeout(() => window.location.reload(), 1000);
          }
        }
      });

      setTimers(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [livePollData]);

  useEffect(() => {
    const fetchVids = async () => {
      const vids = await getUserVidsByWallet(uData?.walletaddress);
      setUserVids(vids);
    };

    if (uData?.walletaddress) fetchVids();
  }, [uData?.walletaddress]);

  useEffect(() => {
    const checkVotes = async () => {
      if (!uData?.walletaddress || !livePollData?.length) return;

      const results = await Promise.all(
        livePollData.map((poll) =>
          hasUserVoted(uData.walletaddress, poll.polloptions).then((voted) => ({
            cpid: poll.cpid,
            voted,
          }))
        )
      );

      const votedPolls = results.filter((r) => r.voted).map((r) => r.cpid);

      setDisabledVotes(votedPolls);
    };

    checkVotes();
  }, [uData?.walletaddress, livePollData]);
  const formatTimeDiff = (ms) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="border-2 p-4 border-[#FFFFFF] rounded-4xl">
        <span className="text-[#007FFF] md:text-4xl text-xl font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="md:w-10 w-7"
            fill={"none"}
          >
            <circle
              cx="12"
              cy="12"
              r="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 8C6.5 9 6 10.5 6 12C6 13.5 6.5 15 7.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 6C3 7.5 2 9.5 2 12C2 14.5 3 16.5 4.5 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 16C17.5 15 18 13.5 18 12C18 10.5 17.5 9 16.5 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5 18C21 16.5 22 14.5 22 12C22 9.5 21 7.5 19.5 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Live <span className="text-[#FFFFFF]">Polling</span>
        </span>

        {Array.isArray(livePollData) && livePollData.length > 0 ? (
          <>
            <div className="md:mt-4 mt-2 md:max-h-[50vh] max-h-[40vh] custom-scrollbar overflow-y-auto rounded-lg md:[&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar-thumb]:bg-[#007FFF] md:pr-1">
              {livePollData.map((poll) => {
                const startTime = new Date(poll.startdatetime);
                const isUpcoming = startTime > now;
                const hasVoted = disabledVotes.includes(poll.cpid);
                const isDisabled = isUpcoming || hasVoted;
                return (
                  <div
                    key={poll.cpid}
                    className="bg-[#FFFFFF] md:p-4 p-2 rounded-4xl mb-2"
                  >
                    <div className="w-full">
                      <div className="md:flex items-center justify-between">
                        <div className="md:flex justify-center items-center gap-4">
                          <h1 className="md:text-4xl md:text-left text-center text-xl text-[#000000] font-bold">
                            {poll.pollname}
                          </h1>
                        </div>
                        <div>
                          <button
                            disabled={isDisabled}
                            onClick={() => {
                              if (!isDisabled) {
                                setShowVoteNow(true);
                                setpData(poll);
                              }
                            }}
                            className={`cursor-pointer md:w-fit w-full md:mt-0 mt-2 py-2 px-6 rounded-2xl font-bold flex justify-center items-center gap-1 transition-all duration-300 ${
                              isDisabled
                                ? "bg-[#00000070] text-[#FFFFFF] cursor-not-allowed"
                                : "bg-[#007FFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]"
                            }`}
                          >
                            {isUpcoming
                              ? "Upcoming"
                              : hasVoted
                              ? "Already Voted"
                              : "Vote Now"}
                            {!isDisabled && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-6"
                                fill={"none"}
                              >
                                <path
                                  d="M13.9841 6.01233C13.9841 3.79746 12.2051 2.00195 10.0106 2.00195C7.81611 2.00195 6.03711 3.79746 6.03711 6.01233"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.37635 21.9925L9.27193 20.8967C8.78437 18.8793 8.11805 18.6134 7.03331 17.1675C6.54359 16.5147 5.5203 15.5898 4.68367 14.3404C4.12621 13.5078 4.87008 11.6153 6.56595 12.1923C6.84825 12.2883 7.08555 12.4807 7.29594 12.692L8.94241 14.3457C8.92894 12.0081 8.95893 7.24935 8.92261 5.78903C8.88628 4.32871 11.4204 3.85879 11.5697 5.85539V10.3468M11.5697 10.3468V11.2124M11.5697 10.3468C12.3984 9.24878 13.9664 9.21013 14.1946 11.0483M14.1946 11.0483C14.2317 11.3476 14.2346 11.6972 14.1946 12.1008M14.1946 11.0483C14.6133 9.7641 16.4526 10.274 16.8186 11.7687M16.8186 11.7687C16.9054 12.123 16.8186 12.533 16.8535 13.0064M16.8186 11.7687C17.0563 11.0483 19.6844 10.9951 19.4345 13.778L19.5 16.3019C19.3995 17.8089 19.1783 18.4403 18.6368 19.1687C18.3562 19.5463 17.9881 19.8788 17.8475 20.3278C17.7297 20.704 17.6555 21.2547 17.7367 22.0001"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                          <p className="text-[#007FFF] text-center font-bold text-sm md:text-base mt-1">
                            {timers[poll.cpid]}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#000000] font-medium md:text-base text-sm md:mt-4 mt-2">
                        {poll.polldes}
                      </p>

                      {poll.polloptions.map((optObj, idx) => {
                        const [optionKey] = Object.keys(optObj);
                        const option = optObj[optionKey];
                        const { description, votes } = option;

                        // const isUserVote =
                        // Array.isArray(votes) &&
                        // votes.some((voteVid) => userVids.includes(voteVid));

                        const isUserVote =
                          disabledVotes.includes(poll.cpid) &&
                          Array.isArray(votes) &&
                          votes.length > 0 &&
                          votes.some((voteVid) => userVids.includes(voteVid));

                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 mt-2 font-semibold md:text-lg text-base ${
                              isUserVote ? "text-green-500" : "text-black"
                            }`}
                          >
                            <svg
                              className="w-6 text-[#007FFF]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="8" />
                            </svg>
                            {description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-white text-center text-lg font-semibold py-4">
            No Live Polls Available
          </div>
        )}
      </div>
      {showVoteNow && (
        <VoteNow
          show={showVoteNow}
          onClose={() => setShowVoteNow(false)}
          pData={pData}
          uData={uData}
        />
      )}
    </div>
  );
}
