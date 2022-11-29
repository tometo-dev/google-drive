import type { GetServerSidePropsContext } from "next"
import { dehydrate, QueryClient } from "react-query"

import { FileIcon, AddNewIcon, FolderIcon } from "../components/icons"
import { prefetchResourceList, useResourceList } from "../models"

export default function Home() {
  const { data } = useResourceList("")

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FileIcon />
      <AddNewIcon />
      <FolderIcon />
    </div>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  await prefetchResourceList(queryClient, "")
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
