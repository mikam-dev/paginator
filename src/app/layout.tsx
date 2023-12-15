import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ConnectionIndicator } from '@/components/connection-indicator'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from '@/components/ui/toaster'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paginator',
  description: 'Technical assessment project for Lexamica candidate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <TailwindIndicator />
          <ConnectionIndicator />
          <Toaster />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
