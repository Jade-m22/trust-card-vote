'use client'

import { useEffect } from 'react'
import styles from './Notification.module.css'

export interface NotificationProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

export default function Notification({ type, message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`${styles.toast} ${styles[type]}`.trim()}>
      <span className={styles.message}>{message}</span>
      <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  )
}

export function NotificationContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>
}
