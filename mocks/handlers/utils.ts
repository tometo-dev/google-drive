export function urlPathToObjectPath(path: string) {
  const pathArray = path.split("/").filter(x => !!x)
  if (pathArray.length !== 0) {
    return `${pathArray.join(".children.")}.children`
  } else return ""
}