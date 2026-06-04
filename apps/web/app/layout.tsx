import { Geist_Mono, Nunito_Sans, Noto_Sans } from "next/font/google"

import "@workspace/ui/globals.css"

import { ThemeProvider } from "@/components/theme-provider"

import { cn } from "@workspace/ui/lib/utils"

import { TooltipProvider } from "@workspace/ui/components/tooltip"

const notoSansHeading = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import { LayoutProvider } from "@/contexts/layout-context"
import { RightSidebarProvider } from "@/contexts/right-sidebar-context"
import { SessionProvider } from "@/lib/auth-client"
import { CookieConsentBanner } from "@/components/privacy/cookie-consent-banner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontMono.variable,
        nunitoSans.variable,
        notoSansHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <RightSidebarProvider>
              <LayoutProvider>
                <SessionProvider>
                  {children}
                  <CookieConsentBanner />
                </SessionProvider>
              </LayoutProvider>
            </RightSidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
