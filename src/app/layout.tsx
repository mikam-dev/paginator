import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ConnectionIndicator } from '@/components/connection-indicator'
import Header from '@/components/core/Header';
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
            <Header />
            <main className="flex flex-col flex-1">{children}</main>
          </div>
          <TailwindIndicator />
          <ConnectionIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
