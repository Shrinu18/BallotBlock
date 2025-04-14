"use client";
import { pollCreation } from "@/services/allService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreatePoll({ show, onClose, pollCreateData, uData }) {
  if (!show) return null;
  const router = useRouter();
  const [errors, setErrors] = useState("");

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    try {
      const walletaddress = uData.walletaddress;
      const { success, error } = await pollCreation(
        walletaddress,
        pollCreateData
      );
      if (error) {
        setErrors(error);
      }
      if (success) {
        window.location.reload();
        onClose();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-40 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:w-[600px] mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#FFFFFF]">
            For Creating a Poll
          </h1>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            Current Balance :{" "}
            <span className="text-[#0080FF] font-bold">
              {uData ? uData.balance : "0"} BaBl Coins
            </span>
          </p>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            <span className="text-[#0080FF] font-bold">10 BaBl Coins</span> is
            Required.
          </p>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            After Payment Balance :{" "}
            <span className="text-[#0080FF] font-bold">
              {uData ? uData.balance - 10 : "0"} BaBl Coins
            </span>
          </p>
          {errors ? <p>{errors}</p> : ""}
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCreatePoll}
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF] px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              Create Poll
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <path
                  d="M7.78057 13.9568V9.49317M7.78057 9.49317V3.97805C7.78057 3.15846 8.46365 2.49792 9.28334 2.49792C10.103 2.49792 10.7489 3.15846 10.7489 3.97805V7.974M7.78057 9.49317C6.46629 10.684 5.05198 12.1884 4.86153 12.5737C3.97535 13.9225 4.06824 14.5755 5.05582 16.2259C5.89463 17.6277 7.02271 19.1833 7.08856 19.2579C7.7588 20.0174 7.62553 20.0175 8.59699 20.7307C9.46447 21.3327 11.2638 21.7522 15.4822 21.3327C18.9186 20.8019 19.7419 17.8026 19.7241 16.3692V12.8295C19.9381 9.88749 18.7083 9.75469 16.4751 9.46512M10.7489 7.974V10.4976M10.7489 7.974C11.3062 7.06532 13.3302 7.43254 13.7247 9.14847M13.7603 10.4936V9.49317C13.7603 9.4143 13.7564 9.33519 13.7453 9.25717M13.7247 9.14847C13.7263 9.15569 13.728 9.16293 13.7296 9.1702C13.7359 9.19899 13.7411 9.228 13.7453 9.25717M13.7247 9.14847C13.7288 9.18343 13.7356 9.21967 13.7453 9.25717M13.7247 9.14847C13.5846 7.95246 16.6156 8.24402 16.7389 10.3474V11.4905"
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
              Cancel
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
    </div>
  );
}
