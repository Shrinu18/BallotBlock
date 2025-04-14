"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateAccount({ show, onClose }) {
  if (!show) return null;
  const router = useRouter();
  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-40 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:w-[600px] mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#FFFFFF]">
            Account Created!
          </h1>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            <span className="text-[#0080FF] font-bold">Congratulations!</span>{" "}
            You have free 100 BaBl Coins
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => router.push("/main")}
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF] px-6 py-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              Let's Go.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <path
                  d="M8.49101 16.9944C5.84739 17.3919 3.99991 18.3674 3.99991 19.4237C3.99991 20.8463 7.35113 21.9996 11.4851 21.9996C15.619 21.9996 18.9703 20.8463 18.9703 19.4237C18.9703 18.3021 16.8874 17.348 13.9801 16.9944"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10.9803 19.0279C11.063 11.8537 10.7826 5.1379 11.1511 2.88854C11.4308 2.09171 11.9223 1.29472 15.1486 3.06315L17.3293 4.13174C18.6711 4.78928 20.5387 5.83761 19.7703 7.1192C19.4206 7.70244 18.6245 8.35403 17.0701 9.01647L10.9782 11.9837"
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
    </div>
  );
}
