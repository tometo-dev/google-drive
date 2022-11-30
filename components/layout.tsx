import type { ReactNode } from "react"
import clsx from "clsx"
import { SearchBar } from "./search-bar"
import { BreadCrumbs } from "./breadcrumbs"

export interface LayoutProps {
  children: ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between items-center h-12 border-b">
        <BreadCrumbs />
        <SearchBar />
      </div>
      <main className={clsx("flex-1 p-2", className)}>{children}</main>
    </div>
  )
}
