import { Edit, RefreshCcw, Send } from "lucide-react"
import Card from "../components/Card"
import Money from "../components/Money"
import { Link } from "react-router-dom"
import ButtonSmall from "@/components/ButtonSmall"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import PageContainer from "../components/PageContainer"

function Dashboard() {
  const balance = useSelector((state: RootState) => state.balance.amount)

  return (
    <>
    
      <PageContainer>

        <Card className="bg-primary text-text flex items-center justify-between">
            <div>
              <p className="text-sm font-outfit font-medium mb-0,5 lg:text-lg">Total Balance</p>
              <Money amount={balance}/>
            </div>

            <div className="flex flex-wrap gap-1.5 max-w-[40%] justify-center">
              <Link to="/balance">
                <ButtonSmall className="bg-accent text-primary">
                  <Edit className="w-4 h-4"/>
                  Edit
                </ButtonSmall>
              </Link>             
              {document.documentElement.clientWidth > 540 ?
                <>
                  <Link to="/balance">
                    <ButtonSmall className="bg-hover">
                      <Send className="w-4 h-4" />
                      Send
                    </ButtonSmall>
                  </Link>                
                  <Link to="/balance">
                    <ButtonSmall className="bg-hover">
                      <RefreshCcw className="w-4 h-4" />
                      Refresh
                    </ButtonSmall>
                  </Link> 
                </> : 
                <Link to="/balance">
                  <ButtonSmall className="bg-hover">
                    <RefreshCcw className="w-4 h-4" />
                    Refresh
                  </ButtonSmall>
                </Link> 
              }             
            </div>
        </Card>

      </PageContainer>

    </>
  )
}

export default Dashboard