import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { sfMono } from '@/utils/font'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Careers Simbase',
  description: 'Careers Simbase',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={sfMono.className}>{children}</body>
    </html>
  )
}
