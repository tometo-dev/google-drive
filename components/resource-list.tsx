import Link from "next/link"
import { useState } from "react"
import { CreateNewDialog } from "./create-new-dialog"

import { AddNewIcon, FileIcon, FolderIcon } from "./icons"

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
  if (props.type === "file") {
    return (
      <div className="flex gap-2 flex-col justify-center items-center">
        <FileIcon />
        <span>{props.name}</span>
      </div>
    )
  } else {
    return (
      <div className="flex gap-2 flex-col justify-center items-center">
        <Link href={props.link}>
          <FolderIcon />
          <span>{props.name}</span>
        </Link>
      </div>
    )
  }
}

export interface ResourceListProps {
  resources: Array<ResourceProps>
}

export function ResourceList({ resources }: ResourceListProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

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
