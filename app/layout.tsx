import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "timer",
  description: "this is description for timer",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="w-screen h-screen flex justify-center items-center bg-black">{children}</main>
      </body>
    </html>
  )
}
