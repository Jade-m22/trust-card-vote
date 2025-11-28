'use client'

import { useMemo, useState } from 'react'
import styles from './TrustCardListSection.module.css'
import TrustCardItem from './TrustCardItem'
import type { TrustCardTriple, UserStake } from '@/lib/intuition/types'

interface Props {
  triples: TrustCardTriple[]
  filter: string
  onFilterChange: (value: string) => void
  onAddNew: () => void
  workingId: string | null
  userStakes: Record<string, UserStake>
  onUpvote: (t: TrustCardTriple, amount: string) => void | Promise<void>
  onDownvote: (t: TrustCardTriple, amount: string) => void | Promise<void>
}

const EMPTY_STAKE: UserStake = {
  support: { value: 0, shares: 0 },
  oppose: { value: 0, shares: 0 },
}

export default function TrustCardListSection({
  triples,
  filter,
  onFilterChange,
  onAddNew,
  workingId,
  userStakes,
  onUpvote,
  onDownvote,
}: Props) {
  const [view, setView] = useState<'list' | 'grid'>('grid')

  const rankById = useMemo(() => {
    const byCap = [...triples].sort((a, b) => {
      const aCap = Number(a.supportVault?.market_cap ?? 0)
      const bCap = Number(b.supportVault?.market_cap ?? 0)
      return bCap - aCap
    })

    return byCap.reduce<Record<string, number>>((acc, t, idx) => {
      acc[t.term_id] = idx
      return acc
    }, {})
  }, [triples])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()

    const byLabel = (t: TrustCardTriple) =>
      (t.subject.label ?? '').toLowerCase()

    const arr = triples
      .filter((t) => (q ? byLabel(t).includes(q) : true))
      .sort(
        (a, b) =>
          Number(b.supportVault?.market_cap ?? 0n) -
          Number(a.supportVault?.market_cap ?? 0n),
      )

    return arr
  }, [triples, filter])

  const listClass = view === 'grid' ? styles.listGrid : styles.listList

  return (
    <section className={styles.section}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <input
            type="text"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search identities…"
            className={styles.searchInput}
          />
          <button
            type="button"
            onClick={onAddNew}
            className={styles.toolbarCreate}
          >
            Add new candidate
          </button>
        </div>

        <div className={styles.viewToggle}>
          <button
            type="button"
            onClick={() => setView('list')}
            className={view === 'list' ? styles.viewActive : styles.viewBtn}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setView('grid')}
            className={view === 'grid' ? styles.viewActive : styles.viewBtn}
          >
            Grid
          </button>
        </div>
      </div>

      <div className={listClass}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No identities found.</div>
        ) : (
          filtered.map((triple, index) => {
            const stake = userStakes[triple.term_id] ?? EMPTY_STAKE

            return (
              <TrustCardItem
                key={triple.term_id}
                triple={triple}
                loading={workingId === triple.term_id}
                userStake={stake}
                view={view}
                rank={rankById[triple.term_id] ?? index}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
              />
            )
          })
        )}
      </div>
    </section>
  )
}
