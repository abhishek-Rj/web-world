import { Press_Start_2P, Geist, Geist_Mono, Inter, Space_Mono, Saira  } from "next/font/google";

const pressStart2P = Press_Start_2P({
    variable: "--font-press-start-2p",
    weight: "400",
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    weight: "400",
    subsets: ["latin"],
});

const saira = Saira({
    variable: "--font-saira",
    weight: "400",
    subsets: ["latin"],
});

export { pressStart2P, geistMono, geistSans, inter, spaceMono, saira };
