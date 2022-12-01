import { DialogOverlay, DialogContent } from "@reach/dialog"
import * as React from "react"
import { useRouter } from "next/router"
import "@reach/dialog/styles.css"
import { useQueryClient } from "react-query"

import { useRenameResourceMutation } from "../models"

export interface RenameResourceProps {
  open: boolean
  onClose: () => void
  oldName: string
  type: "file" | "folder"
}

export function RenameResourceDialog({
  open,
  onClose,
  oldName,
  type,
}: RenameResourceProps) {
  const mutation = useRenameResourceMutation()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleRenameResource = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values = Object.fromEntries(data.entries())

    mutation.mutate(
      {
        newName: values.resourceName as string,
        oldName: oldName,
        path: decodeURI(router.asPath).split("?")[0].replace(/\/$/, ""),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["list-resource"])
          onClose()
        },
      }
    )
  }

  return (
    <DialogOverlay isOpen={open} onDismiss={onClose}>
      <DialogContent className="relative rounded-lg min-w-[22rem] max-w-[22rem]">
        <div
          className="absolute top-2 right-4 cursor-pointer"
          onClick={onClose}
        >
          X
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="font-semibold text-lg mb-4">Rename</div>
          <form onSubmit={handleRenameResource}>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resourceName"
              name="resourceName"
              type="text"
              placeholder="Name"
              required
              pattern={type === "folder" ? `^[\\w\\-\\s]+$` : undefined}
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Rename
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
