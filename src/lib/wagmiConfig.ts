import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import { injected } from 'wagmi/connectors'

export const intuitionTestnet = defineChain({
  id: 13579,
  name: 'Intuition Testnet',
  nativeCurrency: {
    name: 'tTRUST',
    symbol: 'tTRUST',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.intuition.systems/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Intuition Explorer',
      url: 'https://testnet.explorer.intuition.systems',
    },
  },
})

export const wagmiConfig = createConfig({
  chains: [intuitionTestnet],
  connectors: [injected()],
  transports: {
    [intuitionTestnet.id]: http('https://testnet.rpc.intuition.systems/'),
  },
  ssr: true,
})
