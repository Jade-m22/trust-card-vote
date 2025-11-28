import type { VaultSummary } from './types'

export function calcStake(
  vault: { current_share_price?: string | null },
  rawShares: string | number | bigint | null | undefined,
): { shares: number; value: number; price: number } {
  const shares = Number(rawShares ?? 0) / 1e18
  const price = Number(vault.current_share_price ?? 0) / 1e18
  const value = price > 0 ? shares * price : shares
  return { shares, value, price }
}

export function parseTTrustToWei(raw: string): bigint {
  const input = raw.trim()
  if (!input) throw new Error('Please enter an amount.')

  if (!/^\d*\.?\d*$/.test(input)) {
    throw new Error('Invalid amount format.')
  }

  const [intRaw, fracRaw = ''] = input.split('.')
  const intPart = intRaw || '0'
  const fracPart = (fracRaw + '000000000000000000').slice(0, 18)
  const weiStr = intPart + fracPart
  const wei = BigInt(weiStr || '0')
  if (wei <= 0n) throw new Error('Amount must be greater than 0.')
  return wei
}

export function parseTTrustToWeiAllowZero(raw: string): bigint {
  const input = raw.trim() || '0'
  if (!/^\d*\.?\d*$/.test(input)) {
    throw new Error('Invalid amount format.')
  }

  const [intRaw, fracRaw = ''] = input.split('.')
  const intPart = intRaw || '0'
  const fracPart = (fracRaw + '000000000000000000').slice(0, 18)
  const weiStr = intPart + fracPart
  const wei = BigInt(weiStr || '0')
  if (wei < 0n) throw new Error('Amount cannot be negative.')
  return wei
}

export function parseAmountToNumber(raw: string): number {
  const v = Number(raw.trim() || '0')
  if (!Number.isFinite(v) || v <= 0) {
    throw new Error('Amount must be greater than 0.')
  }
  return v
}
