import Link from "next/link";

export function PortfolioTitle({ asLink = true }: { asLink?: boolean }) {
  return asLink ? (
    <Link href="/">
      <span className="text-muted-foreground">Gust</span>
      <span className="text-primary">4</span>
      <span className="text-muted-foreground">s</span>
    </Link>
  ) : (
    <>
      <span className="text-muted-foreground">Gust</span>
      <span className="text-primary">4</span>
      <span className="text-muted-foreground">s</span>
    </>
  );
}
