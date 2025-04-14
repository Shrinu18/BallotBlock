"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CreateVote from "./CreateVote";

export default function VoteNow({ show, onClose, pData, uData }) {
  const router = useRouter();
  const [showCreateVote, setShowCreateVote] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!show || !pData) return null;

  const handleOptionChange = (optionKey) => {
    setSelectedOption(optionKey);
  };

  const handleSubmitVote = () => {
    if (!selectedOption) return;
    setShowCreateVote(true);
  };

  // Get selected option's description
  const selectedOptionDesc = selectedOption
    ? pData.polloptions.find((opt) => Object.keys(opt)[0] === selectedOption)?.[
        selectedOption
      ]?.description
    : null;

  console.log(selectedOptionDesc);

  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-30 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:container md:mx-0 mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#FFFFFF] text-center">
            {pData.pollname}
          </h1>

          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium mt-4">
            {pData.polldes}
          </p>
          <p className="text-[#0080FF] md:text-sm text-xs font-bold mt-2 text-center">
            You can vote for just one option —{" "}
            <span className="uppercase">choose wisely!</span>
          </p>

          <div className="mt-6 space-y-3">
            {pData.polloptions.map((optObj, idx) => {
              const [key] = Object.keys(optObj);
              const { description } = optObj[key];
              const isSelected = selectedOption === key;
              return (
                <div
                  key={key}
                  onClick={() => handleOptionChange(key)}
                  className={`flex items-center justify-between border-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-[#007FFF] border-[#007FFF] text-white"
                      : "bg-white border-gray-300 text-black hover:border-[#007FFF]"
                  }`}
                >
                  <span className="font-semibold text-lg">{description}</span>
                  {isSelected && (
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleSubmitVote}
              disabled={!selectedOption}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300 ${
                selectedOption
                  ? "bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF]"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Submit & Pay!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <path
                  d="M3.3457 16.1976L16.1747 3.36866M18.6316 11.0556L16.4321 13.2551M14.5549 15.1099L13.5762 16.0886"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3.17467 16.1411C1.60844 14.5749 1.60844 12.0355 3.17467 10.4693L10.4693 3.17467C12.0355 1.60844 14.5749 1.60844 16.1411 3.17467L20.8253 7.85891C22.3916 9.42514 22.3916 11.9645 20.8253 13.5307L13.5307 20.8253C11.9645 22.3916 9.42514 22.3916 7.85891 20.8253L3.17467 16.1411Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4 22H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#FF0000] text-[#000000] hover:bg-[#007FFF] px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              Close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <path
                  d="M14.9994 15L9 9M9.00064 15L15 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showCreateVote && (
        <CreateVote
          onClose={() => {
            setShowCreateVote(false);
            onClose();
          }}
          show={showCreateVote}
          pData={pData}
          selectedOption={selectedOption}
          selectedOptionDesc={selectedOptionDesc}
          uData={uData}
        />
      )}
    </div>
  );
}
