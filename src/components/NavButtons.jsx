import React from "react";

export default function NavButtons({ setActiveTab }) {
	return (
		<div className="fixed top-4 z-50 w-full">
			<div className="flex text-[#000000] justify-center items-center gap-6">
				<button
					className="bg-[#007FFF] px-2 py-1 rounded-xl cursor-pointer"
					onClick={() => setActiveTab("Banner")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-6"
						fill={"none"}
					>
						<path
							d="M3.16405 11.3497L4 11.5587L4.45686 16.1005C4.715 18.6668 4.84407 19.9499 5.701 20.7249C6.55793 21.5 7.84753 21.5 10.4267 21.5H13.5733C16.1525 21.5 17.4421 21.5 18.299 20.7249C19.1559 19.9499 19.285 18.6668 19.5431 16.1005L20 11.5587L20.836 11.3497C21.5201 11.1787 22 10.564 22 9.85882C22 9.35735 21.7553 8.88742 21.3445 8.59985L13.1469 2.86154C12.4583 2.37949 11.5417 2.37949 10.8531 2.86154L2.65549 8.59985C2.24467 8.88742 2 9.35735 2 9.85882C2 10.564 2.47993 11.1787 3.16405 11.3497Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<circle
							cx="12"
							cy="14.5"
							r="2.5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<button
					className="bg-[#007FFF] px-2 py-1 rounded-xl cursor-pointer"
					onClick={() => setActiveTab("WhyChoose")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-6"
						fill={"none"}
					>
						<path
							d="M6.18007 15.2964C4.92249 16.0335 1.62521 17.5386 3.63348 19.422C4.6145 20.342 5.7071 21 7.08077 21H14.9192C16.2929 21 17.3855 20.342 18.3665 19.422C20.3748 17.5386 17.0775 16.0335 15.8199 15.2964C12.8709 13.5679 9.12906 13.5679 6.18007 15.2964Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<path
							d="M18 5.53846C18 4.68879 18.6716 4 19.5 4C20.3284 4 21 4.68879 21 5.53846C21 5.84473 20.9127 6.1301 20.7623 6.36984C20.3141 7.08436 19.5 7.76572 19.5 8.61538V9"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M19.4998 11H19.5088"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<button
					className="bg-[#007FFF] px-2 py-1 rounded-xl cursor-pointer"
					onClick={() => setActiveTab("HowItWorks")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-6"
						fill={"none"}
					>
						<path
							d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M16 7C16 5.11438 16 4.17157 15.4142 3.58579C14.8284 3 13.8856 3 12 3C10.1144 3 9.17157 3 8.58579 3.58579C8 4.17157 8 5.11438 8 7"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M6 11L6.65197 11.202C10.0851 12.266 13.9149 12.266 17.348 11.202L18 11M12 12V14"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<button
					className="bg-[#007FFF] px-2 py-1 rounded-xl cursor-pointer"
					onClick={() => setActiveTab("TechUsed")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-6"
						fill={"none"}
					>
						<path
							d="M17 9H7C5.13077 9 4.19615 9 3.5 9.44212C3.04394 9.73175 2.66523 10.1483 2.40192 10.65C2 11.4158 2 12.4438 2 14.5C2 16.5562 2 17.5842 2.40192 18.35C2.66523 18.8517 3.04394 19.2682 3.5 19.5579C4.19615 20 5.13077 20 7 20C7.61332 20 7.91998 20 8.21032 19.9529C8.98496 19.8272 9.70902 19.4541 10.2927 18.88C10.5115 18.6648 10.7078 18.4057 11.1005 17.8874L11.4346 17.4463C11.6334 17.1839 11.7328 17.0527 11.8543 17.0014C11.9552 16.9587 12.0659 16.9532 12.1699 16.9856C12.2951 17.0246 12.4049 17.1454 12.6245 17.3869L13.5858 18.4444C13.8243 18.7067 13.9435 18.8379 14.0676 18.9537C14.7056 19.5498 15.4976 19.9106 16.3319 19.9855C16.4941 20 16.6627 20 17 20C18.8692 20 19.8038 20 20.5 19.5579C20.9561 19.2682 21.3348 18.8517 21.5981 18.35C22 17.5842 22 16.5562 22 14.5C22 12.4438 22 11.4158 21.5981 10.65C21.3348 10.1483 20.9561 9.73175 20.5 9.44212C19.8038 9 18.8692 9 17 9Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M16 13H18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M22 15V12.4522C22 11.4723 22 10.9823 21.9227 10.5086C21.8844 10.2743 21.8322 10.0438 21.7664 9.81888C21.6333 9.36411 21.427 8.94392 21.0145 8.1036C20.1876 6.41927 19.7742 5.5771 19.1715 5.01138C18.8756 4.73365 18.5493 4.50788 18.2022 4.34065C17.4952 4 16.6916 4 15.0845 4H8.91548C7.30836 4 6.5048 4 5.79779 4.34065C5.45069 4.50788 5.12444 4.73365 4.82853 5.01138C4.22579 5.5771 3.81236 6.41927 2.9855 8.1036C2.57298 8.94394 2.36671 9.3641 2.23364 9.81888C2.16781 10.0438 2.11557 10.2743 2.07733 10.5086C2 10.9823 2 11.4723 2 12.4522V15"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
				<button
					className="bg-[#007FFF] px-2 py-1 rounded-xl cursor-pointer"
					onClick={() => setActiveTab("GetStarted")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-6"
						fill={"none"}
					>
						<path
							d="M13.9841 6.01233C13.9841 3.79746 12.2051 2.00195 10.0106 2.00195C7.81611 2.00195 6.03711 3.79746 6.03711 6.01233"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M9.37635 21.9925L9.27193 20.8967C8.78437 18.8793 8.11805 18.6134 7.03331 17.1675C6.54359 16.5147 5.5203 15.5898 4.68367 14.3404C4.12621 13.5078 4.87008 11.6153 6.56595 12.1923C6.84825 12.2883 7.08555 12.4807 7.29594 12.692L8.94241 14.3457C8.92894 12.0081 8.95893 7.24935 8.92261 5.78903C8.88628 4.32871 11.4204 3.85879 11.5697 5.85539V10.3468M11.5697 10.3468V11.2124M11.5697 10.3468C12.3984 9.24878 13.9664 9.21013 14.1946 11.0483M14.1946 11.0483C14.2317 11.3476 14.2346 11.6972 14.1946 12.1008M14.1946 11.0483C14.6133 9.7641 16.4526 10.274 16.8186 11.7687M16.8186 11.7687C16.9054 12.123 16.8186 12.533 16.8535 13.0064M16.8186 11.7687C17.0563 11.0483 19.6844 10.9951 19.4345 13.778L19.5 16.3019C19.3995 17.8089 19.1783 18.4403 18.6368 19.1687C18.3562 19.5463 17.9881 19.8788 17.8475 20.3278C17.7297 20.704 17.6555 21.2547 17.7367 22.0001"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
