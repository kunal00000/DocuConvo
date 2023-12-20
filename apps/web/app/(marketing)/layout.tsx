import { NavBar } from "@/components/layout/navbar"
import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { Suspense } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode
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
