import * as React from "react"

import Image from "next/image"
import addNew from "../../assets/images/add_new_button.png"

export interface AddNewProps {
  onClick?: (event: React.MouseEvent) => void
}
export function AddNew({ onClick }: AddNewProps) {
  return (
    <Image
      src={addNew}
      alt=""
      onClick={onClick}
      className="cursor-pointer"
      priority={true}
    />
  )
}
