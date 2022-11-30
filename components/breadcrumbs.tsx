import { useRouter } from "next/router"
import Link from "next/link"
import { UpArrowIcon } from "./icons"

export function BreadCrumbs() {
  const router = useRouter()

  const asPathWithoutQuery = router.asPath.split("?")[0]
  const asPathRoutes = asPathWithoutQuery
    .split("/")
    .filter((path) => path.length > 0)
  const crumbList = asPathRoutes.map((subPath, index) => {
    const href = "/" + asPathRoutes.slice(0, index + 1).join("/")
    const title = subPath

    return { href, title: decodeURI(title) }
  })

  const handleUp = () => {
    let route
    try {
      route = crumbList[crumbList.length - 2].href
    } catch (error) {
      route = "/"
    }
    router.push(route)
  }

  return (
    <div className="flex gap-x-2">
      <UpArrowIcon onClick={handleUp} disabled={crumbList.length === 0} />
      <Link href="/">
        <div>root</div>
      </Link>
      {crumbList.map((crumb) => (
        <>
          <div>/</div>
          <Link href={crumb.href} key={crumb.href}>
            <div>{crumb.title}</div>
          </Link>
        </>
      ))}
    </div>
  )
}
