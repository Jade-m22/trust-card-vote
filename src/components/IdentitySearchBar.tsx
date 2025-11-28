'use client'

import styles from './IdentitySearchBar.module.css'

interface IdentitySearchBarProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  loading?: boolean
}

export default function IdentitySearchBar({
  value,
  onChange,
  onAdd,
  loading = false,
}: IdentitySearchBarProps) {
  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search or enter a new identity…"
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />

      <button
        type="button"
        onClick={onAdd}
        disabled={loading || !value.trim()}
        className={styles.button}
      >
        {loading ? 'Creating…' : 'Create'}
      </button>
    </div>
  )
}
