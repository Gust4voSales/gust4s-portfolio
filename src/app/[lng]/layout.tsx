import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Manoel Gustavo - Full Stack Developer",
  description: "Portfolio of Manoel Gustavo, a Full Stack Developer with experience in modern web technologies.",
};

interface LngLayoutProps {
  children: React.ReactNode;
}

export default function LngLayout({ children }: LngLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
