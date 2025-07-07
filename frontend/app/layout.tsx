import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Twitter MVP',
  description: 'Twitter MVP clone with Next.js and Nest.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}