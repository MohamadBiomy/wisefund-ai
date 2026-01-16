import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { processIncomeSources } from '@/module/processIncomeSources'

/**
 * Component to handle periodic income processing
 * Processes income sources on app load and sets up hourly checks
 */
export function IncomeProcessor() {
  const dispatch = useDispatch()
  const incomeSources = useSelector((state: RootState) => state.incomeSources.incomeSources)

  useEffect(() => {
    // Process income sources on app load
    processIncomeSources(incomeSources, dispatch)

    // Set up interval to check every hour (optional, for more frequent checks)
    const interval = setInterval(() => {
      processIncomeSources(incomeSources, dispatch)
    }, 60 * 60 * 1000) // Check every hour

    return () => clearInterval(interval)
  }, [dispatch, incomeSources])

  return null
}

