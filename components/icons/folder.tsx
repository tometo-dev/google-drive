import Image from "next/image"
import folderIcon from "../../assets/images/folder.png"

export function Folder() {
  return <Image src={folderIcon} alt="" priority={true} />
}
