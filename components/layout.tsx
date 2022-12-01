import type { ReactNode } from "react"
import clsx from "clsx"

export interface LayoutProps {
  navbar: ReactNode
  content: ReactNode
  className?: string
}

export function Layout({ navbar, content, className }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between items-center h-12 border-b">
        {navbar}
      </div>
      <main className={clsx("flex-1 p-2", className)}>{content}</main>
    </div>
  )
}
