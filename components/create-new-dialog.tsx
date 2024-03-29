import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@reach/tabs"
import * as React from "react"
import { useRouter } from "next/router"
import clsx from "clsx"
import "@reach/dialog/styles.css"
import { useQueryClient } from "react-query"

import { useCreateResourceMutation } from "../models"

export interface CreateNewDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateNewDialog({ open, onClose }: CreateNewDialogProps) {
  const mutation = useCreateResourceMutation()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [errorText, setErrorText] = React.useState("")

  const handleResourceCreate =
    (type: "file" | "folder") =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const values = Object.fromEntries(data.entries())
      mutation.mutate(
        {
          name: values.resourceName as string,
          path: decodeURI(router.asPath),
          type: type,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["list-resource"])
            setErrorText("")
            onClose()
          },

          onError: (error: any) => {
            const message = error?.response?.data?.error
            setErrorText(message || "Something wrong happened!")
          },
        }
      )
    }

  const handleClose = () => {
    onClose()
    setErrorText("")
  }

  return (
    <DialogOverlay isOpen={open} onDismiss={handleClose}>
      <DialogContent className="relative rounded-lg min-w-[22rem] max-w-[22rem]">
        <div
          className="absolute top-2 right-4 cursor-pointer"
          onClick={handleClose}
        >
          X
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="font-semibold text-lg mb-4">Create New</div>
          <Tabs>
            {({ selectedIndex }) => (
              <>
                <TabList className="rounded-lg flex justify-center">
                  <Tab
                    className={clsx(
                      {
                        "bg-blue-400 text-white": selectedIndex === 0,
                      },
                      {
                        border: selectedIndex === 1,
                      },
                      "rounded-l-lg p-2"
                    )}
                  >
                    File
                  </Tab>
                  <Tab
                    className={clsx(
                      {
                        "bg-blue-400 text-white": selectedIndex === 1,
                      },
                      {
                        border: selectedIndex === 0,
                      },
                      "rounded-r-lg p-2"
                    )}
                  >
                    Folder
                  </Tab>
                </TabList>
                <TabPanels className="mt-4">
                  <TabPanel index={0}>
                    <form onSubmit={handleResourceCreate("file")}>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="resourceName"
                        name="resourceName"
                        type="text"
                        placeholder="Name"
                        required
                      />
                      <span
                        className={clsx(
                          { hidden: !errorText },
                          "text-red-600 mt-2"
                        )}
                      >
                        {errorText}
                      </span>
                      <button
                        className="bg-blue-400 hover:bg-blue-500 w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
                        type="submit"
                      >
                        Create
                      </button>
                    </form>
                  </TabPanel>
                  <TabPanel index={1}>
                    <form onSubmit={handleResourceCreate("folder")}>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="resourceName"
                        name="resourceName"
                        type="text"
                        placeholder="Name"
                        required
                        pattern="^[\w\-\s]+$"
                      />
                      <span
                        className={clsx(
                          { hidden: !errorText },
                          "text-red-600 mt-2"
                        )}
                      >
                        {errorText}
                      </span>
                      <button
                        className="bg-blue-400 hover:bg-blue-500 w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
                        type="submit"
                      >
                        Create
                      </button>
                    </form>
                  </TabPanel>
                </TabPanels>
              </>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
