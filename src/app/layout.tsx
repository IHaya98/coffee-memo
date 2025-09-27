import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'
import { headers } from 'next/headers'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee Memo - コーヒー記録アプリ',
  description: '飲んだコーヒーを記録して、味の傾向を分析できるアプリケーション',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = (await headers()).get('x-nextjs-pathname') || ''
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navigation pathname={pathname} />
          <main className="pb-12 md:ml-48">{children}</main>
        </div>
      </body>
    </html>
  )
}
