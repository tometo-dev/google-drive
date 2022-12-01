import { useQuery } from "react-query"
import { listResources } from "./resource"

export function useResourceList(path: string) {
  return useQuery({
    queryKey: ["list-resource", path],
    queryFn: () => listResources(path),
    staleTime: Infinity,
  })
}