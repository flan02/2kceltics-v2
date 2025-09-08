import { PlayoffSpans, roundPlayoffs, SeasonSpans } from "@/lib/types"
import ky from "ky"
import useSWR from "swr"


type SpansResults = {
  spans: typeof SeasonSpans
  round?: typeof PlayoffSpans
  stage: string
  isLoading: boolean
  error: any
}

export function useAvailableSpans(season: string, stage: string): SpansResults {
  type AvailableSpansResponse = {
    spans: typeof SeasonSpans
    round?: typeof PlayoffSpans
  }

  const fetcher = (url: string) => ky.get(url).json<AvailableSpansResponse>()
  const { data, isLoading, error } = useSWR<AvailableSpansResponse>(
    season ? `/api/v1/available-spans?stage=${stage}&season=${season}` : null,
    fetcher,
  )

  return {
    spans: data?.spans ?? [],
    round: data?.round ?? [],
    stage,
    isLoading,
    error,
  }
}

