import "../styles/globals.css"
import type { AppProps } from "next/app"

import { useState } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

// Enable msw for mocking api requests
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks")
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
