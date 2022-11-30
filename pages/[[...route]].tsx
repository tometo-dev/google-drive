import type { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient } from "react-query"
import { useMemo } from "react"

import { prefetchResourceList, useResourceList } from "../models"
import { ResourceList, ResourceListProps } from "../components"

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
  const { query, asPath } = useRouter()

  const currentPath = useMemo(() => {
    return getCurrentPath(query.route)
  }, [query.route])

  const { data } = useResourceList(currentPath)

  const resources: ResourceListProps["resources"] = useMemo(() => {
    if (data) {
      return Object.keys(data).map((key) => ({
        name: data[key].name,
        type: data[key].type,
        link: `${asPath.replace(/\/$/, "")}/${data[key].name}`,
      }))
    } else {
      return []
    }
  }, [data, asPath])

  return <ResourceList resources={resources} />
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
