"use client";
import BannerDesign from "@/components/BannerDesign";
import GetStarted from "@/components/GetStarted";
import HowItWorks from "@/components/HowItWorks";
import NavButtons from "@/components/NavButtons";
import WhyChoose from "@/components/WhyChoose";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TechUsed from "@/components/TechUsed";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Banner");

  return (
    <div>
      <NavButtons setActiveTab={setActiveTab} />
      <AnimatePresence mode="wait">
        {activeTab === "Banner" && (
          <BannerDesign key="Banner" setActiveTab={setActiveTab} />
        )}
        {activeTab === "WhyChoose" && (
          <WhyChoose key="WhyChoose" setActiveTab={setActiveTab} />
        )}
        {activeTab === "HowItWorks" && (
          <HowItWorks key="HowItWorks" setActiveTab={setActiveTab} />
        )}
        {activeTab === "TechUsed" && (
          <TechUsed key="TechUsed" setActiveTab={setActiveTab} />
        )}
        {activeTab === "GetStarted" && (
          <GetStarted key="GetStarted" setActiveTab={setActiveTab} />
        )}
      </AnimatePresence>
    </div>
  );
}
