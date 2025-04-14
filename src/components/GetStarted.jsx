import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GetStarted() {
	const router = useRouter();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.2,
				when: "beforeChildren",
			},
		},
		exit: { opacity: 0, transition: { duration: 0.5 } },
	};

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { delay: 0.4, duration: 0.6 },
		},
		hover: {
			scale: 1.05,
			boxShadow: "0px 12px 24px rgba(0,127,255,0.4)",
			transition: { duration: 0.3 },
		},
		tap: { scale: 0.98 },
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
		hover: { scale: 1.05, transition: { duration: 0.4 } },
	};

	return (
		<motion.div
			className=" flex justify-center items-center min-h-screen overflow-hidden "
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={containerVariants}
		>
			<div className="container mx-auto grid md:grid-cols-3 items-center">
				{/* Text and Button Column */}
				<div className="text-[#FFFFFF] text-center md:text-left col-span-2">
					<motion.h2
						variants={textVariants}
						className="text-4xl md:text-6xl font-black mb-2"
					>
						Ready to Vote Securely?
					</motion.h2>
					<motion.p variants={textVariants} className="text-lg md:text-xl">
						Join Ballot Block today and experience next-gen voting.
					</motion.p>
				</div>

				<div className=" flex justify-end">
					<motion.button
						onClick={() => router.push("/auth")}
						variants={buttonVariants}
						initial="hidden"
						animate="visible"
						whileHover="hover"
						whileTap="tap"
						className="flex justify-center items-center size-[500px] bg-[#007FFF] text-[#000000] rounded-[200px] shadow-lg cursor-pointer group"
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="w-[300px] group-hover:-rotate-45 transition-all duration-300"
							fill="none"
						>
							<path
								d="M7 11.295C12.284 1.447 18.864 1.333 21.493 2.507c1.174 2.629 1.06 9.208-8.788 14.492-.102-.587-.67-2.125-2.125-3.58-1.455-1.455-2.993-2.023-3.58-2.125z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M14 16.8c2.043.934 2.261 2.607 2.544 4.2 0 0 4.278-2.952 1.542-7"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M7.2 10C6.267 7.957 4.593 7.739 3 7.456c0 0 2.952-4.278 7-1.542"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6.21 14c-.632.632-1.706 2.464-.948 4.739 2.275.758 4.107-.316 4.739-.948"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M18.095 7.753a1.848 1.848 0 1 1-3.696 0 1.848 1.848 0 0 1 3.696 0z"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</motion.svg>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}
