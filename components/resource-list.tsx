import { useRouter } from "next/router"
import * as React from "react"
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button"
import "@reach/menu-button/styles.css"
import { CreateNewDialog } from "./create-new-dialog"

import { AddNewIcon, FileIcon, FolderIcon } from "./icons"
import { useDeleteResourceMutation, useRenameResourceMutation } from "../models"
import { useQueryClient } from "react-query"

type ResourceListFileItem = {
  name: string
  type: "file"
}

type ResourceListFolderItem = {
  name: string
  type: "folder"
  link: string
}

type ResourceProps = ResourceListFileItem | ResourceListFolderItem

function Resource(props: ResourceProps) {
  const router = useRouter()
  const hiddenDivRef = React.useRef<any>()

  const queryClient = useQueryClient()
  const renameMutation = useRenameResourceMutation()
  const deleteMutation = useDeleteResourceMutation()

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    /** This is to prevent the default mouse down event, which is captured by the <MenuButton> component
     * See: https://github.com/reach/reach-ui/blob/43f450db7bcb25a743121fe31355f2294065a049/packages/dropdown/src/reach-dropdown.tsx#L268
     */
    event.preventDefault()
  }

  const handleResourceContextClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    /**
     * 1. Prevent the default browser behavior
     * 2. Dispatch a new event from the hidden div
     * 3. The newly dispatched event is captured by the onMouseDownHandler of <MenuButton> component to open the context menu
     */
    event.stopPropagation()
    event.preventDefault()
    hiddenDivRef.current.dispatchEvent(
      new Event("mousedown", { bubbles: true })
    )
  }

  const handleDoubleClick =
    (link: string) => (_event: React.MouseEvent<HTMLDivElement>) => {
      router.push(link)
    }

  return (
    <Menu>
      <MenuButton>
        <div ref={hiddenDivRef} className="hidden"></div>
        {props.type === "file" ? (
          <div
            className="flex gap-2 flex-col justify-center items-center hover:bg-blue-100 p-4"
            onContextMenu={handleResourceContextClick}
            onMouseDown={handleMouseDown}
          >
            <FileIcon />
            <span>{props.name}</span>
          </div>
        ) : (
          <div
            className="flex gap-2 flex-col justify-center items-center hover:bg-blue-100 p-4"
            onDoubleClick={handleDoubleClick(props.link)}
            onMouseDown={handleMouseDown}
            onContextMenu={handleResourceContextClick}
          >
            <FolderIcon />
            <span>{props.name}</span>
          </div>
        )}
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => {}}>Rename</MenuItem>
        <MenuItem
          onSelect={() => {
            deleteMutation.mutate(
              {
                name: props.name,
                path: router.asPath.split("?")[0].replace(/\/$/, ""),
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["list-resource"])
                },
              }
            )
          }}
        >
          <span className="text-red-600">Delete</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export interface ResourceListProps {
  resources: Array<ResourceProps>
}

export function ResourceList({ resources }: ResourceListProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleAddNewClick = () => {
    setDialogOpen((open) => !open)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <div className="w-full flex gap-4 flex-wrap items-center">
      {resources.map((resource) =>
        resource.type === "file" ? (
          <Resource
            key={resource.name}
            type={resource.type}
            name={resource.name}
          />
        ) : (
          <Resource
            key={resource.name}
            type={resource.type}
            name={resource.name}
            link={resource.link}
          />
        )
      )}
      <AddNewIcon onClick={handleAddNewClick} />
      <CreateNewDialog open={dialogOpen} onClose={handleDialogClose} />
    </div>
  )
}
