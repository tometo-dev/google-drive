import { FileIcon, FolderIcon } from "./icons"
import Link from "next/link"
import { useRouter } from "next/router"

export interface ResourceProps {
  name: string
  type: "file" | "folder"
}

export function Resource({ name, type }: ResourceProps) {
  const router = useRouter()

  return (
    <>
      {type === "file" ? (
        <div className="flex gap-2 flex-col justify-center items-center">
          <FileIcon />
          <span>{name}</span>
        </div>
      ) : (
        <div className="flex gap-2 flex-col justify-center items-center">
          <Link href={`${router.asPath.replace(/\/$/, "")}/${name}`}>
            <FolderIcon />
            <span>{name}</span>
          </Link>
        </div>
      )}
    </>
  )
}
