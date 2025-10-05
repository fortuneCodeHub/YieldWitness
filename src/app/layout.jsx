import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import ReduxLandingProvider from "@/components/hooks/ReduxLandingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YieldWitness: Finance & Tech Blog",
  description: "Modern blog focused on finance and technology.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // normal, semi-bold, bold
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${poppins.className} antialiased`}
      >
        <ReduxLandingProvider>{children}</ReduxLandingProvider>
      </body>
    </html>
  );
}
