type FileResource = {
  name: string,
  type: "file"
}

type FolderResource = {
  name: string,
  type: "folder",
  children: Array<FileResource | FolderResource>
}

export type Resource = FileResource | FolderResource