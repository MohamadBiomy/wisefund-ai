import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IncomeSource } from "@/store/incomeSourcesSlice"
import type { RootState } from "@/store/store"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { sourcesActions } from "@/store/incomeSourcesSlice"
import addCommas from "@/module/addCommas"
import Alert from "./Alert"
import { sortSources } from "@/module/sortSources"

function SourcesTable() {
  const { incomeSources } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const sortedSources = sortSources(incomeSources)
  const hasSources = sortedSources.length > 0

  return (
    <>
      <div className="hidden overflow-x-auto rounded-md bg-card sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Starting Date</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasSources ?
              sortedSources.map((source: IncomeSource) => {
                const date = new Date(source.startingDate)

                return <TableRow key={source.id} className="relative">
                  <TableCell>{source.title}</TableCell>
                  <TableCell>{`$${addCommas(Number(source.amount))}`}</TableCell>
                  <TableCell className="capitalize">{source.per}</TableCell>
                  <TableCell>{date.toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize relative pr-8">
                    {source.category}

                    <Alert
                      trigger={
                        <Trash2
                          strokeWidth={2.3}
                          className="absolute w-4 aspect-square top-1/2 -translate-y-1/2 right-2 cursor-pointer text-red-500"
                        />
                      }
                      actionWhenAccept={() => dispatch(sourcesActions.REMOVE_SOURCE({ id: source.id }))}
                      title="Are you sure?"
                      description="Be aware, You cannot undo this action."
                    />
                  </TableCell>
                </TableRow>
              })
              : <TableRow>
                <TableCell colSpan={5}>There are no added income sources.</TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:hidden">
        {hasSources ?
          sortedSources.map((source: IncomeSource) => {
            const date = new Date(source.startingDate)

            return (
              <div
                key={source.id}
                className="relative flex flex-col gap-2 rounded-md border border-border bg-card p-4 text-sm shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-base">{source.title}</p>
                    <p className="text-xs text-muted-foreground">{date.toLocaleDateString()}</p>
                  </div>

                  <Alert
                    trigger={
                      <Trash2
                        strokeWidth={2.3}
                        className="h-5 w-5 text-red-500"
                      />
                    }
                    actionWhenAccept={() => dispatch(sourcesActions.REMOVE_SOURCE({ id: source.id }))}
                    title="Are you sure?"
                    description="Be aware, You cannot undo this action."
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                    {source.category}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-1 font-semibold text-muted-foreground">
                    {`$${addCommas(Number(source.amount))}`}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-1 font-semibold text-muted-foreground capitalize">
                    Per {source.per}
                  </span>
                </div>
              </div>
            )
          })
          : <div className="rounded-md border border-dashed border-border bg-card p-4 text-center text-sm text-muted-foreground">
            There are no added income sources.
          </div>
        }
      </div>

    </>
  )
}

export default SourcesTable

