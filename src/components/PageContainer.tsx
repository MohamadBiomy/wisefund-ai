import type { InitialPropsType } from "@/App"

function PageContainer({children, className = ""}: InitialPropsType) {
  return (
    <div className={`${className} p-4 md:p-5 lg:p-6`}>

        {children}

    </div>
  )
}

export default PageContainer