import { marketingConfig } from "@/config/marketing";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SquaresPattern } from "@/components/shared/squares-pattern";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar items={marketingConfig.mainNav} scroll={true} />
      <SquaresPattern />
      <main className="flex-1">{children}</main>
      <SiteFooter className="pb-4 lg:pb-0" />
    </div>
  );
}
