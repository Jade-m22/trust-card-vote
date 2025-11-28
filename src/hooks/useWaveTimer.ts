import { useEffect, useState } from 'react'

export function useWaveTimer(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now()
    const remainingMs = Math.max(targetMs - now, 0)
    return {
      days: Math.floor(remainingMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((remainingMs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((remainingMs / (1000 * 60)) % 60),
      seconds: Math.floor((remainingMs / 1000) % 60),
    }
  })

  useEffect(() => {
    function update() {
      const now = Date.now()
      const remainingMs = Math.max(targetMs - now, 0)
      const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
      const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((remainingMs / (1000 * 60)) % 60)
      const seconds = Math.floor((remainingMs / 1000) % 60)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  return timeLeft
}
