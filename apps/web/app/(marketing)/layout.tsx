import { NavBar } from "@/components/layout/navbar"
import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { Metadata } from "next"
import { Suspense } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export async function generateMetadata(): Promise<Metadata> {
  const description = "Making Documentation Fun";
  const title = "docuconvo.vercel.app";
  return {
    title,
    description,
    openGraph: {
      images: ["https://docuconvo.vercel.app/og.jpg"],
      description,
      title,
      type: "website",
    },
    twitter: {
      images: ["og.jpg"],
      title,
      description,
      card: "summary_large_image",
    },
  };

}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1 checks-container">{children}</main>
    </div>
  )
}
