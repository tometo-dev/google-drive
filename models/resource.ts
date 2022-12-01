import axios from "axios"
import { COPY_RESOURCE, CREATE_RESOURCE, DELETE_RESOURCE, LIST_RESOURCE, RENAME_RESOURCE } from "./api"

type FileResource = {
  name: string,
  type: "file"
}

type FolderResource = {
  name: string,
  type: "folder",
  children: Record<string, FileResource | FolderResource>
}

export type Resource = FileResource | FolderResource

export type ListResourceResultType = Resource & { path: string }

export async function listResources(path: string, searchText?: string): Promise<Array<ListResourceResultType>> {
  let url = `${LIST_RESOURCE}?path=${path}`

  if (searchText) {
    url = `${url}&searchText=${searchText}`
  }
  return (await axios.get(url)).data
}

export type CreateResourcePostParams = {
  path: string,
  name: string,
  type: "file" | "folder"
}
export type CreateResourcePostResponse = {}
export async function createResource(params: CreateResourcePostParams): Promise<CreateResourcePostResponse> {
  return await axios.post(CREATE_RESOURCE, params)
}

export type RenameResourceParams = {
  path: string,
  oldName: string,
  newName: string,
}
export async function renameResource(params: RenameResourceParams) {
  return await axios.put(RENAME_RESOURCE, params)
}

export type DeleteResourceParams = {
  path: string,
  name: string,
}

export async function deleteResource({ name, path }: DeleteResourceParams) {
  return await axios.delete(`${DELETE_RESOURCE}?path=${path}&name=${name}`)
}

export type CopyResourceParams = {
  path: string,
  name: string
}
export async function copyResource(params: CopyResourceParams) {
  return await axios.post(COPY_RESOURCE, params)
}