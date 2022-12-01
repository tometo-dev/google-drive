import { useQuery } from "react-query"
import { listResources } from "./resource"

export function useResourceList(path: string, searchText?: string) {
  return useQuery({
    queryKey: ["list-resource", path, searchText],
    queryFn: () => listResources(path, searchText),
    staleTime: Infinity,
  })
}