import set from "lodash/set"
import get from "lodash/get"
import { rest } from "msw"
import { CREATE_RESOURCE } from "../../models/api";
import { CreateResourcePostParams } from "../../models/resource";
import { db } from "../db";

function urlPathToObjectPath(path: string) {
  const pathArray = path.split("/").filter(x => !!x)
  if (pathArray.length !== 0) {
    return `${pathArray.join(".children.")}.children`
  } else return ""
}

function create(name: string, type: "file" | "folder", path?: string) {
  let result
  if (type === "file") {
    result = {
      name,
      type: "file"
    }
  } else {
    result = {
      name,
      type: "folder",
      children: {}
    }
  }
  if (path) {
    set(db, path, {
      ...get(db, path),
      [name]: result
    })
  } else {
    console.log("here")
    Object.assign(db, { [name]: result })
  }
}

export const createHandlers = [
  rest.post(CREATE_RESOURCE, async (req, res, ctx) => {
    const body: CreateResourcePostParams = await req.json()
    const objectPath = urlPathToObjectPath(body.path)

    console.log({ objectPath, body })

    create(body.name, body.type, objectPath)

    return res(ctx.status(201), ctx.json({ created: true }))
  })
]