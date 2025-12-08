import { type InitialPropsType } from "@/App"




function Card({ className = "", children }: InitialPropsType) {
  return (
    <>

      <div className={`${className} border rounded-[20px] p-4 md:p-5 lg:p-6`}>

        {children}

      </div>

    </>
  )
}

export default Card