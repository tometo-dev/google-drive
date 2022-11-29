import type { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient } from "react-query"
import { useMemo } from "react"

import { FileIcon, AddNewIcon, FolderIcon } from "../components/icons"
import { prefetchResourceList, useResourceList } from "../models"

const getCurrentPath = (route: string | string[] | undefined) => {
  let path = ""
  if (route) {
    if (Array.isArray(route)) {
      path = route.join(".children.")
    } else {
      path = route
    }
  }
  return path
}

export default function Home() {
  const { query } = useRouter()

  const currentPath = useMemo(() => {
    return getCurrentPath(query.route)
  }, [query.route])

  const { data } = useResourceList(currentPath)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

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
