import CardStats from "@/components/CardStats"
import InputBox from "@/components/InputBox"
import Money from "@/components/Money"
import { actions } from "@/store/balanceSlice"
import type { RootState } from "@/store/store"
import { ChartLine } from "lucide-react"
import { useSelector } from "react-redux"
import PageContainer from "./PageContainer"

function Balance() {
  const { amount: balance } = useSelector((state: RootState) => state.balance)


  return (
    <>
    
      <PageContainer>
        
        <CardStats title="Current Balance" icon={<ChartLine strokeWidth={2.4} className="aspect-square w-4 lg:w-5"/>}>
          <Money amount={balance} />
        </CardStats>
        
        <p className="text-gray-400 lg:text-[18px] mt-12 lg:mt-18 md:mb-4 mb-6">Actions:</p>

        <InputBox title="Increase By:" buttonTitle="increase" type="number" action={actions.INCREASE_BALANCE}/>

        <InputBox title="Decrease By:" buttonTitle="decrease" type="number" action={actions.DECREASE_BALANCE}/> 

        <InputBox title="Set Balance To:" buttonTitle="set" type="number" action={actions.UPDATE_BALANCE}/> 

      </PageContainer>

    </>
  )
}

export default Balance