import type { InitialPropsType } from '@/App'
import { Button } from './ui/button'

interface ButtonPropsType extends InitialPropsType {
  border?: string
  bg?: string
  text?: string
}

function ButtonSmall({ children, className }: ButtonPropsType) {
  return (
    <>
      <Button variant="secondary" className={` text-[12px] font-outfit font-semibold hover:border-white border border-transparent text-text ${className}`} size="sm">
        {children}
      </Button>
    </>
  )
}

export default ButtonSmall