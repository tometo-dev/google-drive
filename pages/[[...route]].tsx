import type { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient } from "react-query"
import { useMemo } from "react"

import { AddNewIcon } from "../components/icons"
import { prefetchResourceList, useResourceList } from "../models"
import { Resource } from "../components"

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

  const currentPath = useMemo(() => {
    return getCurrentPath(query.route)
  }, [query.route])

  const { data } = useResourceList(currentPath)

  if (!data) {
    return null
  }

  return (
    <div className="w-full h-full flex gap-4 items-center">
      {Object.keys(data).map((key) => {
        return (
          <Resource
            key={data[key].name}
            type={data[key].type}
            name={data[key].name}
          />
        )
      })}
      <AddNewIcon />
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
