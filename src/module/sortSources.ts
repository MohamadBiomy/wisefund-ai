import type { IncomeSources } from "@/store/incomeSourcesSlice"

export function sortSources(sourcesState: IncomeSources) {
  const sortBy = sourcesState.sortBy
  const sourcesCopy = [...sourcesState.incomeSources]

  switch (sortBy) {
    case "title":
      return sourcesCopy.sort((a, b) => a.title.localeCompare(b.title))

    case "amount":
      return sourcesCopy.sort((a, b) => a.amount - b.amount)

    case "category":
      return sourcesCopy.sort((a, b) => a.category.localeCompare(b.category))

    case "recent":
      return sourcesCopy.sort((a, b) => 
        new Date(b.startingDate).getTime() - new Date(a.startingDate).getTime()
      )

    default:
      return sourcesCopy
  }
}

