import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/providers/app-providers'
import { Toaster } from '@/components/ui/toaster'

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
      <body>
        <AppProviders>
          {children}
        </AppProviders>
        <Toaster />
      </body>
    </html>
  )
}