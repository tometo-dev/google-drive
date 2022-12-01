import { useMutation } from "react-query"
import { createResource, CreateResourcePostParams, deleteResource, DeleteResourceParams, renameResource, RenameResourceParams } from "./resource";

export function useCreateResourceMutation() {
  return useMutation(
    (params: CreateResourcePostParams) => createResource(params)
  )
}

export function useRenameResourceMutation() {
  return useMutation(
    (params: RenameResourceParams) => renameResource(params)
  )
}

export function useDeleteResourceMutation() {
  return useMutation(
    (params: DeleteResourceParams) => deleteResource(params)
  )
}