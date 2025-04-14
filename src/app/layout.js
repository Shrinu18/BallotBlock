import { Montserrat } from "next/font/google";
import "./globals.css";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "BallotBlock",
  description: "Blockchain based Decentralized Polling Web App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="hydrated">
      <body className={mont.className}>
        <div className="bg-[url('/BG-Dark.png')] bg-cover bg-no-repeat bg-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
