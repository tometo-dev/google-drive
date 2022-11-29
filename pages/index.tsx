import { FileIcon, AddNewIcon, FolderIcon } from "../components/icons"

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FileIcon />
      <AddNewIcon />
      <FolderIcon />
    </div>
  )
}
