"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SuccessModal({ show, onClose, successText, route }) {
  if (!show) return null;
  const router = useRouter();
  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-40 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:w-[600px] mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl font-bold text-[#007FFF]">
            Success !
          </h1>
          <p className="text-[#FFFFFF] md:text-lg text-sm font-medium">
            <span className="text-[#0080FF] font-bold">Congratulations!</span>{" "}
            {successText || "Success"}
          </p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                router.push("/main");
                onClose();
              }}
              className="flex items-center gap-2 bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF] px-6 py-2 rounded-2xl text-lg font-bold transition-all duration-300 cursor-pointer"
            >
              Continue.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8"
                fill={"none"}
              >
                <path
                  d="M12.9997 11L5.99969 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5407 6.08278L14.2989 6.19567C12.287 6.37857 11.2811 6.47002 11.0444 7.12388C10.8076 7.77774 11.5219 8.49198 12.9504 9.92046L14.0792 11.0493C15.5077 12.4778 16.222 13.1921 16.8758 12.9553C17.5297 12.7186 17.6211 11.7127 17.804 9.70078L17.9169 8.45902C18.027 7.24766 18.0821 6.64198 17.7199 6.27979C17.3577 5.9176 16.752 5.97266 15.5407 6.08278Z"
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
