"use client";
import Header from "@/components/BallotBlockComponents/Header";
import LivePolling from "@/components/BallotBlockComponents/LivePolling";
import RecentPollResult from "@/components/BallotBlockComponents/RecentPollResult";
import ErrorModal from "@/components/Modal/ErrorModal";
import SessionModal from "@/components/Modal/SessionModal";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import React, { useEffect, useState } from "react";

export default function BallotBlockMainPage() {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSessionOver, setShowSessionOver] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);

  const { uData, recentPollsData, livePollsData, setLivePollsData } =
    useGetUserDetails({
      setLoading,
      setErrors,
      setShowSessionOver,
      setErrorPresent,
    });

  const handleError = (error) => {
    setLoading(false);
    setErrors(error);
    setShowError(true);
  };

  useEffect(() => {
    const handleiferror = () => {
      if (errorPresent) {
        handleError(errors);
      }
      if (!showError) {
        setErrorPresent(false);
      }
    };
    handleiferror();
  }, []);

  if (loading) {
    return (
      <div className="text-[#FFFFFF] flex justify-center items-center min-h-screen text-4xl font-black">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <Header uData={uData} />
      <LivePolling
        livePollData={livePollsData}
        uData={uData}
        setLivePollsData={setLivePollsData}
      />
      <RecentPollResult recentPollsData={recentPollsData} />

      {showError && (
        <ErrorModal
          show={showError}
          onClose={() => setShowError(false)}
          errorText={errors}
        />
      )}
      {showSessionOver && (
        <SessionModal
          onClose={() => setShowSessionOver(false)}
          show={showSessionOver}
        />
      )}
    </div>
  );
}
