import * as React from "react"
import clsx from "clsx"

export interface SearchBarProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar({ className, ...rest }, ref) {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className={clsx(
            "block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50",
            className
          )}
          placeholder="Search for anything"
          ref={ref}
          {...rest}
        />
      </div>
    )
  }
)
