import type { InitialPropsType } from "@/App"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends InitialPropsType {
  trigger: React.ReactNode
  setDate: (date: Date) => void
  date: Date | undefined
}

export function DatePicker({ trigger, setDate, date }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {trigger}
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-text gap-2" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date as Date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
