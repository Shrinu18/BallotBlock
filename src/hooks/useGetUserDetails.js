"use client";
import { validLoginSession } from "@/services/allService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useGetUserDetails({
  setLoading,
  setErrors,
  setShowSessionOver,
  setErrorPresent,
}) {
  const router = useRouter();
  const [uData, setUData] = useState({});
  const [livePollsData, setLivePollsData] = useState({});
  const [recentPollsData, setRecentPollsData] = useState({});

  useEffect(() => {
    const userlogInfo = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          localStorage.clear();
          router.push("/auth");
          return;
        }
        if (token) {
          const {
            success,
            situation,
            error,
            userData,
            livepolls,
            recentpollresults,
          } = await validLoginSession(token);

          if (error) {
            setErrors(error);
            setErrorPresent(true);
          }
          if (situation) {
            setShowSessionOver(true);
          }
          if (success) {
            setUData(userData);
            setRecentPollsData(recentpollresults);
            setLivePollsData(livepolls);
          }
        }
      } catch (err) {
        setErrors(err.message);
        setErrorPresent(true);
      } finally {
        setLoading(false);
      }
    };
    userlogInfo();
  }, [router]);

  return {
    uData,
    livePollsData,
    setLivePollsData,
    recentPollsData,
  };
}
