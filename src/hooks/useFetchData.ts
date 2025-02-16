/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react'

interface FetchResult<T> {
  data: T
  totalElements: number
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useFetchData<T>(
  serviceFn: (...args: any[]) => Promise<any>,
  params: any[] = [],
  autoFetch: boolean = false,
  
  //kondisional, jika membutuhkan data beserta image maka true (biasanya di detail),
  // jika untuk keperluan table saja tanpa images tidak perlu diisi, otomatis false
  withImages: boolean = false
): FetchResult<T> {
  const [data, setData] = useState<T>([] as unknown as T)
  const [totalElements, setTotalElements] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await serviceFn(...params)
      if (result.data) {
        setData(withImages ? result : result.data.content)
        setTotalElements((prevTotalElements) =>
          result.data.totalElements !== prevTotalElements
            ? result.data.totalElements
            : prevTotalElements
        )
      } else {
        setData(result)
      }
      setError(null)
    } catch (err: any) {
      console.error('Error fetching data:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [serviceFn, ...params])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  const memoizedTotalElements = useMemo(() => totalElements, [totalElements])

  return { data, totalElements: memoizedTotalElements, loading, error, refetch: fetchData }
}
