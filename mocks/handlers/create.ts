import set from "lodash/set"
import { db } from "../db";

function create(name: string, type: "file" | "folder", path?: string) {
  if (path) {
    set(db, path, {
      [name]: {
        name: name,
        type: type
      }
    })
  }
}