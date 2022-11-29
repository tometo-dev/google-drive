import type { QueryClient } from "react-query"
import { listResources } from "./resource"

export async function prefetchResourceList(queryClient: QueryClient, path: string) {
  await queryClient.prefetchQuery(["list-resource", path], () => listResources(""))
}