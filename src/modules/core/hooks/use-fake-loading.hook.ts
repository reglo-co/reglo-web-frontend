import { useEffect, useRef, useState } from 'react'

export function useFakeLoading(loading: boolean, delay: number = 1000) {
  const [delayFetching, setDelayFetching] = useState(loading)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTimeoutRef() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    if (loading) {
      clearTimeoutRef()
      setDelayFetching(true)
      return
    }
    timeoutRef.current = setTimeout(() => {
      setDelayFetching(false)
      timeoutRef.current = null
    }, delay)
    return () => {
      clearTimeoutRef()
    }
  }, [loading, delay])

  return delayFetching || loading
}
