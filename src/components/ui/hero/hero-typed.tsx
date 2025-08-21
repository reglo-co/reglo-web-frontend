// app/components/HeroTyped.tsx
'use client'
import { useEffect, useState } from 'react'

export function HeroTyped({
  words,
  speed = 55,
  pause = 900,
}: {
  words: string[]
  speed?: number
  pause?: number
}) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[i] || ''
    const done = txt === w
    const empty = txt === ''

    const t = setTimeout(
      () => {
        if (!del) {
          const next = w.slice(0, txt.length + 1)
          setTxt(next)
          if (next === w) setTimeout(() => setDel(true), pause)
        } else {
          const next = w.slice(0, txt.length - 1)
          setTxt(next)
          if (next === '') {
            setDel(false)
            setI((i + 1) % words.length)
          }
        }
      },
      del ? Math.max(30, speed * 0.6) : done ? pause : speed
    )
    return () => clearTimeout(t)
  }, [txt, del, i, words, speed, pause])

  return (
    <span className="relative ml-2 inline-block h-[1.2em] animate-[caret_1s_step-end_infinite] overflow-hidden border-r pr-1 align-baseline whitespace-nowrap">
      {txt}
      <style jsx global>{`
        @keyframes caret {
          0%,
          100% {
            border-right-color: currentColor;
          }
          50% {
            border-right-color: transparent;
          }
        }
      `}</style>
    </span>
  )
}
