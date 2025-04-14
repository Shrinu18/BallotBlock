"use client";
import supabase from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function useUserData({ setIData, userId }) {
  useEffect(() => {
    const channel = supabase
      .channel("room2_c")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bbcreatepoll" },
        (payload) => {
          const eventType = payload.eventType;

          if (eventType === "INSERT") {
            setIData((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, setIData]);

  return;
}
