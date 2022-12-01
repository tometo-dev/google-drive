import type { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient } from "react-query"
import * as React from "react"

import { prefetchResourceList, useResourceList } from "../models"
import { Layout, ResourceList, ResourceListProps } from "../components"
import { BreadCrumbs } from "../components/breadcrumbs"
import { SearchBar } from "../components/search-bar"
import { useDebounce } from "../utils"
import { useSearchContext } from "../context/search-context"

const getCurrentPath = (route: string | string[] | undefined) => {
  let path = ""
  if (route) {
    if (Array.isArray(route)) {
      path = `${route.join(".children.")}.children`
    } else {
      path = route
    }
  }
  return path
}

export default function Home() {
  const { query } = useRouter()

  const currentPath = React.useMemo(() => {
    return getCurrentPath(query.route)
  }, [query.route])

  const { searchText, setSearchText } = useSearchContext()

  const debouncedSearchText = useDebounce(searchText)

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setSearchText(value)
  }

  const { data } = useResourceList(currentPath, debouncedSearchText)

  const resources: ResourceListProps["resources"] = React.useMemo(() => {
    if (data && Array.isArray(data)) {
      return data
        .map((resource) => ({
          name: resource.name,
          type: resource.type,
          link: `${resource.path.replace(/^root[\/]?/, "")}/${resource.name}`,
        }))
        .sort((a, b) => b.type.localeCompare(a.type))
    } else {
      return []
    }
  }, [data])

  return (
    <Layout
      navbar={
        <>
          {searchText === "" ? (
            <BreadCrumbs />
          ) : (
            <div className="flex gap-2">
              <button onClick={() => void setSearchText("")}>X</button>
              <div>Found results: {resources.length} items</div>
            </div>
          )}
          <SearchBar value={searchText} onChange={handleSearchTextChange} />
        </>
      }
      content={<ResourceList resources={resources} />}
    />
  )
}

/** Disabling prefetching as it is leading to inconsistent data
 * due to localStorage persistence, which is not available at the server
 *
 * An app with an actual backend will not face this problem
 */
/*
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const currentRoute: string | Array<string> | undefined = query.route
  const currentPath = getCurrentPath(currentRoute)

 
  const queryClient = new QueryClient()
  await prefetchResourceList(queryClient, currentPath)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
*/
