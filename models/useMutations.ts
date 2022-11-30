import { useMutation } from "react-query"
import { createResource, CreateResourcePostParams } from "./resource";

export function useCreateResourceMutation() {
  return useMutation(async (params: CreateResourcePostParams) => {
    await createResource(params)
  })
}