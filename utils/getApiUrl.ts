function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:3000`
}

export function getApiUrl() {
  return `${getBaseUrl()}/v1`
}