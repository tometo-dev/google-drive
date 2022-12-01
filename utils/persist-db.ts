import { Resource } from "../models";

const LOCAL_STORAGE_KEY = "gd-resource-data"

export function updateLocalDB(db: Record<string, Resource>) {
  if (typeof window !== "undefined") {
    /** Persisting data to the localStorage
     * In an actual application, this will not be needed as there would be
     * an actual backend instead of these api mocks
     */
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db))
  }
}

export function readFromLocalDB(): Record<string, Resource> | undefined {
  if (typeof window !== "undefined") {
    const persistedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (persistedData) {
      return JSON.parse(persistedData)
    }
  }
  return undefined
}