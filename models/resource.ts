import axios from "axios"
import { LIST_RESOURCE } from "./api"

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

export async function listResources(path: string) {
  return (await axios.get(`${LIST_RESOURCE}?path=${path}`)).data
}