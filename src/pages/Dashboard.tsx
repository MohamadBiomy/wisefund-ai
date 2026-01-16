import { Edit, RefreshCcw, Send, TrendingDown, TrendingUp, PieChart as PieChartIcon } from "lucide-react"
import Card from "../components/Card"
import Money from "../components/Money"
import { Link } from "react-router-dom"
import ButtonSmall from "@/components/ButtonSmall"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import PageContainer from "../components/PageContainer"
import CardStats from "@/components/CardStats"
import { ExpenseCategoryChart } from "@/components/ExpenseCategoryChart"
import { DashboardExpensesTable } from "@/components/DashboardExpensesTable"
import { DashboardSourcesTable } from "@/components/DashboardSourcesTable"
import { getExpensesFrom } from "@/module/getExpensesFrom"
import { sortExpenses } from "@/module/sortExpenses"
import { sortSources } from "@/module/sortSources"

function Dashboard() {
  const balance = useSelector((state: RootState) => state.balance.amount)
  const expenses = useSelector((state: RootState) => state.expenses)
  const incomeSources = useSelector((state: RootState) => state.incomeSources)

  // Calculate total expenses (last 30 days)
  const expensesData = getExpensesFrom(30, expenses.expenses)
  const totalExpenses = expensesData.totalAmount

  // Calculate total monthly income
  function calculateTotalMonthlyIncome(): number {
    const { incomeSources: sources } = incomeSources
    
    return sources.reduce((total, source) => {
      let monthlyAmount = source.amount
      
      // Convert to monthly
      if (source.per === "day") {
        monthlyAmount = source.amount * 30.44
      } else if (source.per === "week") {
        monthlyAmount = source.amount * 4.33
      }
      // If already monthly, use as is
      
      return total + monthlyAmount
    }, 0)
  }

  const totalMonthlyIncome = calculateTotalMonthlyIncome()

  // Get sorted expenses and sources for tables
  const sortedExpenses = sortExpenses(expenses).slice(0, 5)
  const sortedSources = sortSources(incomeSources).slice(0, 5)

  return (
    <>
      <PageContainer>
        {/* Balance Card */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <CardStats 
            title="Total Expenses (Last 30 Days)" 
            icon={<TrendingDown strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />}
          >
            <Money amount={totalExpenses} />
          </CardStats>

          <CardStats 
            title="Total Monthly Income" 
            icon={<TrendingUp strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />}
          >
            <Money amount={totalMonthlyIncome} />
          </CardStats>
        </div>

        {/* Chart Section */}
        {expenses.expenses.length >= 0 && (
          <div className="mt-4">
            <CardStats 
              title="Expenses by Category" 
              icon={<PieChartIcon strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />}
            >
              <div className="mt-4">
                <ExpenseCategoryChart expenses={expensesData.calculatedExpenses} />
              </div>
            </CardStats>
          </div>
        )}

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Recent Expenses Table */}
          <CardStats 
            title="Recent Expenses" 
            icon={<TrendingDown strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />}
          >
            <div className="mt-4">
              <DashboardExpensesTable expenses={sortedExpenses} limit={5} />
            </div>
          </CardStats>

          {/* Recent Income Sources Table */}
          <CardStats 
            title="Income Sources" 
            icon={<TrendingUp strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />}
          >
            <div className="mt-4">
              <DashboardSourcesTable sources={sortedSources} limit={5} />
            </div>
          </CardStats>
        </div>

      </PageContainer>
    </>
  )
}

export default Dashboard