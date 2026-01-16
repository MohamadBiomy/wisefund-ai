import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IncomeSource } from "@/store/incomeSourcesSlice"
import addCommas from "@/module/addCommas"
import { Link } from "react-router-dom"

interface DashboardSourcesTableProps {
  sources: IncomeSource[]
  limit?: number
}

export function DashboardSourcesTable({ sources, limit = 5 }: DashboardSourcesTableProps) {
  const displaySources = sources.slice(0, limit)
  const hasSources = displaySources.length > 0

  return (
    <>
      <div className="overflow-x-auto rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasSources ?
              displaySources.map((source: IncomeSource) => (
                <TableRow key={source.id}>
                  <TableCell className="text-sm">{source.title}</TableCell>
                  <TableCell className="text-sm">{`$${addCommas(Number(source.amount))}`}</TableCell>
                  <TableCell className="capitalize text-sm">{source.per}</TableCell>
                  <TableCell className="capitalize text-sm">{source.category}</TableCell>
                </TableRow>
              ))
              : <TableRow>
                <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                  No income sources yet
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>
      {sources.length > limit && (
        <div className="mt-2 text-right">
          <Link to="/incomeSources" className="text-sm text-primary hover:underline">
            View all sources →
          </Link>
        </div>
      )}
    </>
  )
}

