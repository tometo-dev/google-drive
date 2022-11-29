import { Resource } from "../models";

function seedResources(): Record<string, Resource> {
  return {
    "Folder 1": {
      name: "Folder 1",
      type: "folder",
      children: {
        "Something": {
          name: "Something",
          type: "folder",
          children: {
            "Something Else": {
              name: "Something Else",
              type: "file"
            }
          }
        }
      }
    },
    "Folder 2": {
      name: "Folder 2",
      type: "folder",
      children: {}
    },
    "File1.txt": {
      name: "File1.txt",
      type: "file"
    },
    "File2.txt": {
      name: "File2.txt",
      type: "file"
    }
  }
}

export const db: Record<string, Resource> = { ...seedResources() }