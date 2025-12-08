import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { InitialPropsType } from "@/App"

interface AcceptCheckProps extends InitialPropsType {
  description: string
  setValue?: () => void
  value?: boolean
}

export default function AcceptCheck({ description, value, setValue }: AcceptCheckProps) {
  return (
      <div className="flex items-center gap-2">
        <Checkbox 
        id="accept"
        checked={value}
        onCheckedChange={setValue}
        className="data-[state=checked]:bg-transparent"
        />
        <Label htmlFor="accept" className="text-[10px] md:text-sm font-normal">{description}</Label>
      </div>
  )
}
