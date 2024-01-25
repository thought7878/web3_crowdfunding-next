import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import MyThirdwebProvider from "../context/MyThirdwebProvider"

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Web3 Crowdfunding",
  description: "Web3 Crowdfunding",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MyThirdwebProvider>{children}</MyThirdwebProvider>
      </body>
    </html>
  )
}
