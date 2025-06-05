import type { Metadata } from "next";
import { languages } from "../i18n/settings";
import { getT } from "../i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT("translation");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
