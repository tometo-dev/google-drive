import { rest } from "msw"
import get from "lodash/get"
import set from "lodash/set"
import { RENAME_RESOURCE } from "../../models/api"
import { RenameResourceParams } from "../../models/resource"
import { db } from "../db"
import { updateLocalDB } from "../../utils"

function rename(oldName: string, newName: string, path: string) {
  const oldNameWithoutDot = oldName.replaceAll(/\./g, "(dot)")
  const newNameWithoutDot = newName.replaceAll(/\./g, "(dot)")
  let objectPath
  if (path) {
    objectPath = `${path.split("/").filter(p => !!p).join(".children")}.children`
  } else {
    objectPath = ""
  }


  if (objectPath) {
    const resourceObject = (get(db, objectPath) as any)
    const newResourceObject = { ...resourceObject[oldNameWithoutDot], name: newNameWithoutDot }
    delete resourceObject[oldNameWithoutDot]

    // update the resource object with new info
    Object.assign(resourceObject, { [newNameWithoutDot]: newResourceObject })

    // update the db
    set(db, objectPath, resourceObject)

  } else {
    // objectPath empty for "root" location
    const newResourceObject = { ...db[oldNameWithoutDot], name: newNameWithoutDot }
    Object.assign(db, { [newNameWithoutDot]: newResourceObject })

    delete db[oldNameWithoutDot]
    // update the resource object with new info
  }

  // update localStorage
  updateLocalDB(db)

}

export const renameHandlers = [
  rest.put(RENAME_RESOURCE, async (req, res, ctx) => {
    const body: RenameResourceParams = await req.json()

    rename(body.oldName, body.newName, body.path)

    return res(ctx.status(200))
  })
]