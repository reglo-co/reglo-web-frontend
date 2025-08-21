'use client'
import { useEffect, useState, RefObject } from 'react'

export function useSticky(elRef: RefObject<HTMLDivElement | null>) {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [elRef])
  return stuck
}
