"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TechUsed() {
	return (
		<div className="min-h-screen md:container mx-auto flex flex-col justify-center items-center px-6 text-[#FFFFFF]">
			{/* Heading */}
			<motion.h2
				className="text-6xl font-extrabold mb-2 z-10 text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				Tech Stack
			</motion.h2>

			{/* Subtext */}
			<motion.p
				className="text-lg text-[#FFFFFF] mb-12 max-w-xl text-center z-10"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				Powerful technologies powering our secure voting platform
			</motion.p>

			{/* Tech Stack Sections */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
				{/* Front-End Section */}
				<motion.div
					className="bg-[#FFFFFF] px-4 py-3 rounded-xl shadow-lg shadow-[#007FFF]"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-2xl font-bold mb-8 text-center text-[#000000] uppercase">
						Front-End
					</h1>
					<div className="flex justify-around items-center gap-6 ">
						{/* Next JS SVG */}
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-20 h-fit"
								preserveAspectRatio="xMidYMid"
								viewBox="0 0 256 256"
							>
								<path d="M119.617.069c-.55.05-2.302.225-3.879.35-36.36 3.278-70.419 22.894-91.99 53.044-12.012 16.764-19.694 35.78-22.597 55.922C.125 116.415 0 118.492 0 128.025s.125 11.61 1.151 18.64c6.957 48.065 41.165 88.449 87.56 103.411 8.309 2.678 17.067 4.504 27.027 5.605 3.879.425 20.645.425 24.524 0 17.192-1.902 31.756-6.155 46.12-13.486 2.202-1.126 2.628-1.426 2.327-1.677-.2-.15-9.584-12.735-20.845-27.948l-20.47-27.648-25.65-37.956c-14.114-20.868-25.725-37.932-25.825-37.932-.1-.025-.2 16.84-.25 37.431-.076 36.055-.1 37.506-.551 38.357-.65 1.226-1.151 1.727-2.202 2.277-.801.4-1.502.475-5.28.475h-4.33l-1.15-.725a4.7 4.7 0 0 1-1.677-1.827l-.526-1.126.05-50.166.075-50.192.776-.976c.4-.525 1.251-1.2 1.852-1.526 1.026-.5 1.426-.55 5.755-.55 5.105 0 5.956.2 7.282 1.651.376.4 14.264 21.318 30.88 46.514 16.617 25.195 39.34 59.599 50.5 76.488l20.27 30.7 1.026-.675c9.084-5.905 18.693-14.312 26.3-23.07 16.191-18.59 26.626-41.258 30.13-65.428 1.026-7.031 1.151-9.108 1.151-18.64 0-9.534-.125-11.61-1.151-18.641-6.957-48.065-41.165-88.449-87.56-103.411-8.184-2.652-16.892-4.479-26.652-5.58-2.402-.25-18.943-.525-21.02-.325m52.401 77.414c1.201.6 2.177 1.752 2.527 2.953.2.65.25 14.562.2 45.913l-.074 44.987-7.933-12.16-7.958-12.16v-32.702c0-21.143.1-33.028.25-33.603.4-1.401 1.277-2.502 2.478-3.153 1.026-.525 1.401-.575 5.33-.575 3.704 0 4.354.05 5.18.5"></path>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 top-19 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Next JS
							</span>
						</motion.div>
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{/* Tailwind CSS SVG */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="w-20 h-fit"
								viewBox="0 0 54 33"
							>
								<g clipPath="url(#prefix__clip0)">
									<path
										fill="#38bdf8"
										fillRule="evenodd"
										d="M27 0Q16.2 0 13.5 10.8q4.05-5.4 9.45-4.05c2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2q10.8 0 13.5-10.8-4.05 5.4-9.45 4.05c-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0M13.5 16.2Q2.7 16.2 0 27q4.05-5.4 9.45-4.05c2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4q10.8 0 13.5-10.8-4.05 5.4-9.45 4.05c-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2"
										clipRule="evenodd"
									></path>
								</g>
								<defs>
									<clipPath id="prefix__clip0">
										<path fill="#fff" d="M0 0h54v32.4H0z"></path>
									</clipPath>
								</defs>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 top-12 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Tailwind CSS
							</span>
						</motion.div>
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{/* Framer Motion SVG */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-26 h-fit"
								viewBox="0 0 48 48"
							>
								<path fill="#05F" d="M14.4 32H24v9.6z" />
								<path
									fill="#0AF"
									d="M14.4 22.4H24V32h-9.6zm9.6 0 9.6 9.6H24z"
								/>
								<path fill="#8DF" d="M24 12.8h9.6v9.6H24zm-9.6 0H24v9.6z" />
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 top-22 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Framer Motion
							</span>
						</motion.div>
					</div>
				</motion.div>

				{/* Back-End Section */}
				<motion.div
					className="bg-[#FFFFFF] px-4 py-3 rounded-xl shadow-lg shadow-[#007FFF]"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-2xl font-bold mb-8 text-center text-[#000000] uppercase">
						Back-End
					</h1>
					<div className="flex justify-around items-center gap-6">
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{/* Node.js SVG */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-20 h-fit"
								fill="none"
								viewBox="0 0 71 80"
							>
								<g fill="#5FA04E">
									<path d="M35.625 79.5c-1.081 0-2.09-.288-3.028-.792l-9.59-5.686c-1.442-.792-.721-1.08-.289-1.224 1.947-.648 2.308-.792 4.327-1.944.216-.144.504-.072.72.072l7.356 4.391c.288.144.649.144.865 0l28.77-16.628c.289-.144.433-.431.433-.791V23.714c0-.36-.144-.648-.432-.792L35.986 6.366c-.288-.144-.65-.144-.865 0L6.35 22.922c-.29.144-.434.504-.434.792v33.184c0 .287.145.647.433.791l7.86 4.535c4.254 2.16 6.922-.36 6.922-2.879V26.593c0-.432.36-.864.865-.864h3.678c.432 0 .865.36.865.864v32.752c0 5.687-3.1 8.998-8.509 8.998-1.658 0-2.956 0-6.633-1.8l-7.572-4.319A6.07 6.07 0 0 1 .798 56.97V23.786a6.07 6.07 0 0 1 3.028-5.255l28.77-16.628c1.804-1.008 4.255-1.008 6.058 0l28.77 16.628a6.07 6.07 0 0 1 3.029 5.255V56.97a6.07 6.07 0 0 1-3.029 5.254l-28.77 16.628c-.865.36-1.947.648-3.029.648"></path>
									<path d="M44.567 56.682c-12.62 0-15.215-5.759-15.215-10.654 0-.432.36-.864.865-.864h3.75c.433 0 .793.288.793.72.577 3.815 2.235 5.687 9.879 5.687 6.057 0 8.652-1.368 8.652-4.607 0-1.871-.72-3.24-10.167-4.175-7.86-.792-12.762-2.52-12.762-8.782 0-5.83 4.903-9.285 13.123-9.285 9.23 0 13.772 3.167 14.35 10.077q0 .324-.217.648c-.144.144-.36.288-.577.288h-3.822a.844.844 0 0 1-.793-.648c-.865-3.96-3.1-5.255-9.013-5.255-6.634 0-7.427 2.304-7.427 4.031 0 2.088.937 2.736 9.879 3.887 8.869 1.152 13.05 2.808 13.05 8.998 0 6.335-5.263 9.934-14.348 9.934"></path>
								</g>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 top-22 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Node.js
							</span>
						</motion.div>
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{/* Supabase SVG */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-20 h-fit"
								fill="none"
								viewBox="0 0 109 113"
							>
								<path
									fill="url(#paint0_linear)"
									d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874z"
								></path>
								<path
									fill="url(#paint1_linear)"
									fillOpacity="0.2"
									d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874z"
								></path>
								<path
									fill="#3ECF8E"
									d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875z"
								></path>
								<defs>
									<linearGradient
										id="paint0_linear"
										x1="53.974"
										x2="94.163"
										y1="54.974"
										y2="71.829"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#249361"></stop>
										<stop offset="1" stopColor="#3ECF8E"></stop>
									</linearGradient>
									<linearGradient
										id="paint1_linear"
										x1="36.156"
										x2="54.484"
										y1="30.578"
										y2="65.081"
										gradientUnits="userSpaceOnUse"
									>
										<stop></stop>
										<stop offset="1" stopOpacity="0"></stop>
									</linearGradient>
								</defs>
							</svg>
							<span className="absolute left-1/2 -translate-x-1/2 top-20 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Supabase
							</span>
						</motion.div>
					</div>
				</motion.div>

				{/* Deployment Section */}
				<motion.div
					className="bg-[#FFFFFF] px-4 py-3 rounded-xl shadow-lg shadow-[#007FFF]"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-2xl font-bold mb-8 text-center text-[#000000] uppercase">
						Deployement
					</h1>
					<div className="flex justify-around items-center gap-6">
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.2 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-20 h-fit"
								viewBox="0 0 512 512"
							>
								<path fillRule="evenodd" d="m256 48 240 416H16Z"></path>
							</svg>
							{/* Tooltip */}
							<span className="absolute left-1/2 -translate-x-1/2 top-18 mt-2 w-max px-2 py-1 text-sm text-[#FFFFFF] bg-[#000000] rounded opacity-0 group-hover:opacity-100 transition-all">
								Vercel
							</span>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
