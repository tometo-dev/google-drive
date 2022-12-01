import get from "lodash/get"
import set from "lodash/set"
import { rest } from "msw"
import { COPY_RESOURCE } from "../../models/api"
import { CopyResourceParams } from "../../models/resource"
import { updateLocalDB } from "../../utils"
import { db } from "../db"
import { urlPathToObjectPath } from "./utils"

function copy(resourceName: string, path?: string) {

  const nameWithoutDot = resourceName.replaceAll(/\./g, "(dot)")

  const newName = `${nameWithoutDot} (copy)`

  if (path) {
    const resource = get(db, `${path}.${nameWithoutDot}`)

    set(db, path, {
      ...get(db, path),
      [newName]: {
        ...resource,
        name: newName
      }
    })
  } else {
    Object.assign(db, {
      [newName]: {
        ...db[nameWithoutDot],
        name: newName
      }
    })
  }

  //Persisting data to the localStorage
  updateLocalDB(db)
}

export const copyHandlers = [
  rest.post(COPY_RESOURCE, async (req, res, ctx) => {
    const body: CopyResourceParams = await req.json()
    const objectPath = urlPathToObjectPath(body.path)

    copy(body.name, objectPath)

    return res(ctx.status(201), ctx.json({ created: true }))
  })
]