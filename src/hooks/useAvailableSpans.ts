import { SeasonSpans } from "@/lib/types"
import ky from "ky"
import useSWR from "swr"


type SpansResults = {
  spans: typeof SeasonSpans
  isLoading: boolean
  error: any
}

export function useAvailableSpans(season: string): SpansResults {
  type AvailableSpansResponse = {
    spans: typeof SeasonSpans
  }

  const fetcher = (url: string) => ky.get(url).json<AvailableSpansResponse>()
  const { data, isLoading, error } = useSWR<AvailableSpansResponse>(
    season ? `/api/v1/available-spans?season=${season}` : null,
    fetcher,
  )

  return {
    spans: data?.spans ?? [],
    isLoading,
    error,
  }
}

