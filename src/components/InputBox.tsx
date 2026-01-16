import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import type { InitialPropsType } from "@/App"
import { useEffect, useRef, useState } from "react"
import Alert from "./Alert"

interface InputBoxProps extends InitialPropsType {
  title: string
  type?: "number" | "text"
  buttonTitle: string
  action?: any
}

function InputBox({ title, type = "text", buttonTitle, action, className = "" }: InputBoxProps) {
  const [value, setValue] = useState<string>("")
  const trigger = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch()

  function submit() {
    if (value) {
      dispatch(action({amount: +value}))
      setValue("")
    }
  }

  useEffect(() => {
    {/* Alert */}

  }, [])

  return (
    <>
      <div className={`${className} text-sm lg:text-base mb-2 lg:mb-3` }>
        <span className="mb-1 lg:mb-2 block">{title}</span>
        <div className="flex items-center gap-1 lg:gap-2">
          <Input 
          type={type} placeholder={type === "number" ? `000,000 $` : "z"} className="w-70" 
          value={value} onInput={(e) => setValue((e.target as HTMLInputElement).value)} onKeyUp={(e) => {
            const target = e.target as HTMLInputElement
            return e.key === "Enter" && target.value && trigger.current ? trigger.current.click() : ''
          }}/>
          <Alert title="Are you sure ?" description="Be aware, You cannot undo this action." actionWhenAccept={submit} trigger={
            <Button ref={trigger} variant="outline" onClick={(e) => !value ? e.preventDefault() : ""} className="bg-primary hover:border-white hover:bg-hover text-text capitalize">{buttonTitle}</Button>
          } />
          
        </div>    
      </div>
    </>
  )
}

export default InputBox