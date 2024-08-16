import { createContext, useContext } from 'react'

export const SearchParamsContext = createContext<{ [key: string]: string | undefined }>({})

export function useSearchParamsContext() {
  return useContext(SearchParamsContext)
}