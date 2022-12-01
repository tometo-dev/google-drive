import { rest } from "msw"
import { RENAME_RESOURCE } from "../../models/api"

function rename(oldName: string, newName: string, path: string) {

}

export const renameHandlers = [
  rest.put(RENAME_RESOURCE, async (req, res, ctx) => {
    const body = await req.json()

    console.log({ body })

    return res(ctx.status(200))
  })
]