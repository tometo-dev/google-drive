import * as React from "react"
import clsx from "clsx"

import Image from "next/image"
import upArrow from "../../assets/images/up_arrow.svg"

export interface UpArrowProps {
  onClick?: (event: React.MouseEvent) => void
  disabled?: boolean
}
export function UpArrow({ onClick, disabled }: UpArrowProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <Image
        src={upArrow}
        alt=""
        className={clsx({ "cursor-pointer": !disabled })}
        height={24}
        width={24}
        priority={true}
      />
    </button>
  )
}
