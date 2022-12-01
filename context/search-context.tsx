import * as React from "react"

export interface SearchContextValue {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = React.createContext<SearchContextValue | null>(null)

export interface SearchContextProviderProps {
  children: React.ReactNode
}
export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchText, setSearchText] = React.useState("")

  const value = React.useMemo(
    () => ({ searchText, setSearchText }),
    [searchText]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = React.useContext(SearchContext)
  if (context === null) {
    throw new Error(
      `useSearchContext must be used within SearchContextProvider`
    )
  }

  return context
}
