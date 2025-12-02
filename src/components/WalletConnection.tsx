'use client'

import { useMemo } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
} from 'wagmi'
import styles from './WalletConnection.module.css'
import { intuitionMainnet } from '@/lib/wagmiConfig'

export function WalletConnection() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  const {
    connect,
    connectors,
    status,
    error: connectError,
  } = useConnect()
  const { disconnect } = useDisconnect()

  const primary = useMemo(() => {
    return (
      connectors.find(
        (c) =>
          c.id === 'io.metamask' ||
          c.id === 'metaMask' ||
          c.name.toLowerCase().includes('metamask'),
      ) ?? connectors[0]
    )
  }, [connectors])

  const wrongNetwork =
    isConnected && chainId !== intuitionMainnet.id

  if (!primary) {
    return (
      <div className={styles.infoBox}>
        <span>No wallet connector available</span>
      </div>
    )
  }

  if (isConnected && wrongNetwork) {
    return (
      <div className={styles.warningBox}>
        Wrong network — switch to Intuition Mainnet (id {intuitionMainnet.id})
      </div>
    )
  }

  if (isConnected && !wrongNetwork) {
    return (
      <div className={styles.connectedContainer}>
        <span className={styles.connectedBadge}>
          {address
            ? `${address.slice(0, 6)}…${address.slice(-4)}`
            : 'Connected'}
        </span>

        <button
          type="button"
          className={styles.disconnectButton}
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => connect({ connector: primary })}
      disabled={status === 'pending'}
      className={styles.connectButton}
    >
      {status === 'pending' ? 'Connecting…' : 'Connect wallet'}
      {connectError && (
        <span className={styles.errorText}>
          {connectError.message}
        </span>
      )}
    </button>
  )
}
