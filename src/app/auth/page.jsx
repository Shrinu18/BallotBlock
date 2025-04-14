"use client";
import SignIn from "@/components/AuthComponents/SignIn";
import SignUp from "@/components/AuthComponents/SignUp";
import React, { useState } from "react";

export default function AuthPage() {
  const [authTab, setAuthTab] = useState("SignIN");

  return (
    <div className="flex justify-center items-center min-h-screen z-10">
      <div className="md:w-[600px] w-full mx-4">
        <h1 className="text-[#FFFFFF] md:text-2xl text-base font-bold mb-2">
          Ballot<span className="font-light">Block</span>
        </h1>
        {authTab === "SignIN" ? (
          <>
            <SignIn />
          </>
        ) : (
          <>
            <SignUp />
          </>
        )}
        <div className="mt-4">
          {authTab === "SignIN" ? (
            <span className="text-[#FFFFFF] text-sm">
              Do not have a Account!{" "}
              <button
                onClick={() => setAuthTab("SignUP")}
                className="transition-all duration-300 text-[#007FFF] font-bold hover:underline cursor-pointer hover:text-[#FFFFFF]"
              >
                Create Account.
              </button>
            </span>
          ) : (
            <span className="text-[#FFFFFF] text-sm">
              Already have a account!{" "}
              <button
                onClick={() => setAuthTab("SignIN")}
                className="transition-all duration-300 text-[#007FFF] font-bold hover:underline cursor-pointer hover:text-[#FFFFFF]"
              >
                Sign In.
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
