'use client'

import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureClient, API_URL_DEV } from '@0xintuition/graphql'
import { wagmiConfig } from '@/lib/wagmiConfig'

const queryClient = new QueryClient()

configureClient({ apiUrl: API_URL_DEV })

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
