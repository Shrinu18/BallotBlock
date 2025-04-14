"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogOut({ show, onClose }) {
  if (!show) return null;
  const router = useRouter();
  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-40 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:w-[600px] mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#FFFFFF]">
            Do you want to <span className="text-[#FF0000]">LogOut !</span>
          </h1>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/auth");
              }}
              className="flex items-center gap-2 bg-[#FF0000] text-[#000000] hover:bg-[#007FFF] p-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6"
                fill={"none"}
              >
                <path
                  d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF] p-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
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
