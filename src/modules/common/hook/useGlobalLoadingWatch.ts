'use client'

import { useEffect } from 'react'
import { useGlobalLoading } from '../stores'

export function useGlobalLoadingWatch() {
  const { stop } = useGlobalLoading()

  useEffect(() => {
    stop()
  }, [])
}
