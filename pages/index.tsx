import { FileIcon, AddNewIcon, FolderIcon } from "../components/icons"
import { useResourceList } from "../models/useQueries"

export default function Home() {
  const { data } = useResourceList("")

  console.log({ data })

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FileIcon />
      <AddNewIcon />
      <FolderIcon />
    </div>
  )
}
