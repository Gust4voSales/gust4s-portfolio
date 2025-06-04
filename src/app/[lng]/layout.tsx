import type { Metadata } from "next";
import { languages } from "../i18n/settings";
import { getT } from "../i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateMetadata(_: { params: { lng: string } }): Promise<Metadata> {
  const { t } = await getT("translation");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

interface LngLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default async function LngLayout({ children }: LngLayoutProps) {
  return children;
}
