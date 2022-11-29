import { useQuery } from "react-query"
import axios from "axios"
import { LIST_RESOURCE } from "./api"

export function useResourceList(path: string) {
  return useQuery({
    queryKey: ["list-resource", path], queryFn: async () => {
      return (await axios.get(LIST_RESOURCE)).data
    }
  })
}