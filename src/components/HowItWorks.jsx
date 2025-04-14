"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
	const steps = [
		{
			title: "Register",
			description:
				"Sign up easily with verified credentials to securely access the platform.",
			image: "/images/1.png",
		},
		{
			title: "Authenticate",
			description:
				"Use your unique identity securely stored on the blockchain.",
			image: "/images/2.png",
		},
		{
			title: "Vote",
			description: "Cast your vote safely and confidentially on-chain.",
			image: "/images/3.png",
		},
		{
			title: "Verify",
			description:
				"Confirm your vote is recorded permanently and transparently.",
			image: "/images/4.png",
		},
	];

	const [activeStep, setActiveStep] = useState(0);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center text-[#FFFFFF] px-6">
			{/* Heading */}
			<motion.h2
				className="text-5xl font-bold mb-4"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				How It Works
			</motion.h2>

			{/* Subtitle */}
			<motion.p
				className="text-md text-[#FFFFFF] mb-10 max-w-xl text-center"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				A simple and secure voting process using blockchain technology.
			</motion.p>

			{/* Grid Layout */}
			<div className="grid grid-cols-3 w-full md:container mx-auto place-items-center gap-8">
				{/* Left Column */}
				<div className="flex flex-col gap-6 w-full">
					{steps.slice(0, 2).map((step, index) => (
						<motion.div
							key={index}
							className={`relative p-6 w-full text-left rounded-bl-[60px] rounded-tr-[60px] transition-all duration-500 overflow-hidden ${
								activeStep === index
									? "bg-[#007FFF] text-[#000000] shadow-lg"
									: "bg-[#FFFFFF] text-[#000000]"
							}`}
							onMouseEnter={() => setActiveStep(index)}
						>
							{/* Sliding Heading Effect */}
							<motion.h3
								className="text-2xl font-bold relative z-10"
								animate={{ x: activeStep === index ? 10 : 0 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								{step.title}
							</motion.h3>

							{/* Description (Static) */}
							<p className="mt-2 text-xl relative z-10">{step.description}</p>

							{/* Active Underline Effect */}
							<motion.div
								className="absolute inset-x-0 bottom-0 h-1 bg-[#007FFF]"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: activeStep === index ? 1 : 0 }}
								transition={{ duration: 0.3 }}
							/>
						</motion.div>
					))}
				</div>

				{/* Center Image with Smooth Zoom-in Rotation Effect */}
				<motion.img
					key={activeStep}
					src={steps[activeStep].image}
					alt="Step Image"
					className="rounded-2xl object-cover w-full h-fit"
					initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
					animate={{ opacity: 1, rotate: 0, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
				/>

				{/* Right Column */}
				<div className="flex flex-col gap-6 w-full">
					{steps.slice(2, 4).map((step, index) => (
						<motion.div
							key={index + 2}
							className={`relative p-6 w-full text-left rounded-br-[60px] rounded-tl-[60px] transition-all duration-500 overflow-hidden ${
								activeStep === index + 2
									? "bg-[#007FFF] text-[#000000] shadow-lg"
									: "bg-[#FFFFFF] text-[#000000]"
							}`}
							onMouseEnter={() => setActiveStep(index + 2)}
						>
							{/* Sliding Heading Effect */}
							<motion.h3
								className="text-2xl font-bold relative z-10"
								animate={{ x: activeStep === index + 2 ? 10 : 0 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								{step.title}
							</motion.h3>

							{/* Description (Static) */}
							<p className="mt-2 text-xl relative z-10">{step.description}</p>

							{/* Active Underline Effect */}
							<motion.div
								className="absolute inset-x-0 bottom-0 h-1 bg-[#007FFF]"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: activeStep === index + 2 ? 1 : 0 }}
								transition={{ duration: 0.3 }}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
