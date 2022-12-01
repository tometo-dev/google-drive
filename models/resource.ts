import axios from "axios"
import { CREATE_RESOURCE, DELETE_RESOURCE, LIST_RESOURCE, RENAME_RESOURCE } from "./api"

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

export async function listResources(path: string): Promise<Record<string, Resource>> {
  return (await axios.get(`${LIST_RESOURCE}?path=${path}`)).data
}

export type CreateResourcePostParams = {
  path: string,
  name: string,
  type: "file" | "folder"
}
export type CreateResourcePostResponse = {}
export async function createResource({ path, name, type }: CreateResourcePostParams): Promise<CreateResourcePostResponse> {
  return await axios.post(CREATE_RESOURCE, {
    path: path,
    name: name,
    type: type
  })
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