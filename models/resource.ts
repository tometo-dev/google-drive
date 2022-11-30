import axios from "axios"
import { CREATE_RESOURCE, LIST_RESOURCE } from "./api"

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