import type { InitialPropsType } from "@/App"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectBoxProps extends InitialPropsType {
  value: string
  setValue: (value: string) => void
  items: string[]
  values?: string[]
  placeholder?: string
}

function SelectBox({ value, setValue, placeholder = "", items, values = items }: SelectBoxProps) {
  return (
    <>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent className="bg-text">
          {
            items.map((item, index) => {
              return <SelectItem key={index} value={values[index]} >{item}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectBox