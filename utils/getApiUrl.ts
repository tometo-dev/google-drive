function getBaseUrl() {
  return process.env.VERCEL_URL ?? `http://localhost:3000`
}

export function getApiUrl() {
  return `${getBaseUrl()}/v1`
}