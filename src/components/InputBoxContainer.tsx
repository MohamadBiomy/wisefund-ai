import type { InitialPropsType } from "@/App"

interface InputBoxContainerProps extends InitialPropsType {
  title: string
}

function InputBoxContainer({ title, className = "", children }: InputBoxContainerProps) {
  return (
    <>
      <div className={`${className} text-sm lg:text-base mb-2 lg:mb-3` }>
        <span className="mb-1 lg:mb-2 block">{title}</span>
        <div className="flex items-center gap-1 lg:gap-2">
          {children}
        </div>    
      </div>
    </>
  )
}

export default InputBoxContainer