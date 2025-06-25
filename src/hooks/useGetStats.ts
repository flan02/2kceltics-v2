
import ky from 'ky'

import { useStatsStore } from '@/zustand/store'
import { StatsResponse } from '@/lib/types'

const useGetStats = () => {
  const data = useStatsStore((state) => state.data)
  const isLoading = useStatsStore((state) => state.isLoading)
  const error = useStatsStore((state) => state.error)
  const selectedKey = useStatsStore((state) => state.selectedKey)

  // Usamos getState para funciones no reactivas (como setData)
  const { setData, setIsLoading, setError, setSelectedKey } = useStatsStore.getState()

  const getStats = async (gamespan: number, season: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await ky
        .get(`/api/v1/season-stats?gamespan=${gamespan}&season=${season}`, {
          timeout: 10000,
        })
        .json<StatsResponse>()

      console.log('Fetched stats:', response)
      setData(response)
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, error, selectedKey, getStats }
}

export default useGetStats
