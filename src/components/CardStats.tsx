import type { InitialPropsType } from "@/App"

interface CardStatsProps extends InitialPropsType {
  title: string
  icon: React.ReactNode
  ele1?: React.ReactNode
}


function CardStats({children, title, icon, ele1 = ""}: CardStatsProps) {
  return (
    <>

      <div className="border-border border rounded-[16px] p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 lg:gap-2 mb-3 lg:mb-4">
            <div className="text-accent">{icon}</div>
            <p className="text-[12px] lg:text-sm capitalize">{title}</p>
          </div>
          {ele1}
        </div>

        {children}
      </div>
    
    </>
  )
}

export default CardStats