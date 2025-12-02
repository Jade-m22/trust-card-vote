import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import { injected } from 'wagmi/connectors'

export const intuitionMainnet = defineChain({
  id: 1155,
  name: 'Intuition Mainnet',
  nativeCurrency: {
    name: 'TRUST',
    symbol: 'TRUST',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.intuition.systems/http'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://explorer.intuition.systems',
    },
  },
})

export const wagmiConfig = createConfig({
  chains: [intuitionMainnet],
  connectors: [injected()],
  transports: {
    [intuitionMainnet.id]: http('https://rpc.intuition.systems/http'),
  },
  ssr: true,
})
