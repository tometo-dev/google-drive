import set from "lodash/set"
import get from "lodash/get"
import { rest } from "msw"
import { CREATE_RESOURCE } from "../../models/api";
import { CreateResourcePostParams } from "../../models/resource";
import { db } from "../db";
import { updateLocalDB } from "../../utils";
import { urlPathToObjectPath } from "./utils";



function create(name: string, type: "file" | "folder", path?: string) {
  let result
  const nameWithoutDot = name.replaceAll(/\./g, "(dot)")
  if (type === "file") {
    result = {
      name: nameWithoutDot,
      type: "file"
    }
  } else {
    result = {
      name: nameWithoutDot,
      type: "folder",
      children: {}
    }
  }
  if (path) {
    const resource = get(db, path)
    // @ts-ignore
    if (resource[nameWithoutDot] != undefined) {
      return false
    }
    set(db, path, {
      ...get(db, path),
      [nameWithoutDot]: result
    })
  } else {
    if (db[nameWithoutDot] != undefined) {
      return false
    }
    Object.assign(db, { [nameWithoutDot]: result })
  }


  //Persisting data to the localStorage
  updateLocalDB(db)
  return true
}

export const createHandlers = [
  rest.post(CREATE_RESOURCE, async (req, res, ctx) => {
    const body: CreateResourcePostParams = await req.json()
    const objectPath = urlPathToObjectPath(body.path)

    if (create(body.name, body.type, objectPath)) {
      return res(ctx.status(201), ctx.json({ created: true }))
    } else {
      return res(ctx.status(500), ctx.json({ error: `Resource with ${body.name} already exists` }))
    }
  })
]