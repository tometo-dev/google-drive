import { Resource } from "../models";

function seedResources(): Array<Resource> {
  return [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        {
          name: "Something",
          type: "folder",
          children: []
        }
      ]
    },
    {
      name: "Folder 2",
      type: "folder",
      children: []
    },
    {
      name: "File1.txt",
      type: "file"
    },
    {
      name: "File2.txt",
      type: "file"
    }
  ]
}

export const db: Array<Resource> = [...seedResources()]