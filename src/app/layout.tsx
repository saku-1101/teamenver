import { getAccessToken } from '@auth0/nextjs-auth0'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import { Inter } from 'next/font/google'

import { ApolloWrapper } from '@/libs/graphql/apolloProvider'

import type { Metadata } from 'next'

// eslint-disable-next-line
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { accessToken } = await getAccessToken()
  return (
    <html lang='en'>
      <ApolloWrapper>
        <UserProvider>
          <body className={inter.className}>{children}</body>
        </UserProvider>
      </ApolloWrapper>
    </html>
  )
}
