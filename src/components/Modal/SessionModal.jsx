"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SessionModal({ show, onClose }) {
  if (!show) return null;
  const router = useRouter();
  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-40 bg-[#0080FF] flex items-center justify-center">
        <div className="md:w-[600px] mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#FF0000]">
            Session Expired !
          </h1>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            Please log in again !
          </p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                router.push("/auth");
                onClose();
              }}
              className="flex items-center gap-2 bg-[#FF0000] text-[#000000] hover:bg-[#007FFF] px-6 py-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              Sign In !
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14C8.91212 15.2144 10.3643 16 12 16C13.6357 16 15.0879 15.2144 16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 8C15 8 14 9 14 10C14.75 9 16.25 9 17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.00897 9H8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 16L14.2348 17.3203C14.644 17.9703 15.5502 18.1929 16.2589 17.8177C16.9676 17.4424 17.2104 16.6113 16.8012 15.9614L16 15"
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
