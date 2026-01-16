// import Alert from "@/components/Alert"
import PageContainer from "../components/PageContainer"
import InputBoxContainer from "@/components/InputBoxContainer"
import { Input } from "@/components/ui/input"
import { Banknote, ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/DatePicker"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddCategory } from "@/components/AddCategory"
import AcceptCheck from "@/components/AcceptCheck"
import { actions as balanceActions } from "@/store/balanceSlice"
import CardStats from "@/components/CardStats"
import Money from "@/components/Money"
import Alert from "@/components/Alert"
import { actions as expensesActions } from "@/store/expensesSlice"
import type { ExpensesReducer } from "@/store/expensesSlice"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExpensesTable from "@/components/ExpensesTable"
import SelectBox from "@/components/SelectBox"
import { getExpensesFrom } from "@/module/getExpensesFrom"




function Expenses() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const { categories, balance, expenses } = useSelector((state: RootState) => state)
  const [category, setCategory] = useState("general")
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState<null | number>(null)
  const [sortBy, setSortBy] = useState<ExpensesReducer["sortBy"]>(expenses.sortBy)


  function checkFields(): boolean {
    if (title && amount && date && category) {
      setError(false)
      return true
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);
    }

    return false
  }

  function addExpense() {
    if (!date) return

    dispatch(expensesActions.ADD_EXPENSE({
      date: date.toISOString(),
      title,
      amount: amount as number,
      category
    }))

    // Decrease the balance
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    balance.affectedByExpenses ? dispatch(balanceActions.DECREASE_BALANCE({amount: amount as number})) : ""

    setDate(undefined)
    setCategory("general")
    setTitle("")
    setAmount(null)
  }

  return (
    <>
    
      <PageContainer>

        <CardStats title="Total Expenses Amount" icon={<Banknote strokeWidth={2.4} className="aspect-square w-4 lg:w-5"/>} ele1={
          <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-sm">
            <p>Calculate From:</p>
            <Select value={expenses?.calcExpensesFrom?.toString() || "30"} onValueChange={(value) => dispatch(expensesActions.UPDATE_CALC_FROM({days: +value}))}>
              <SelectTrigger>
                <SelectValue/>
              </SelectTrigger>
              <SelectContent className="bg-text">
                <SelectItem value="1">1 Day</SelectItem>
                <SelectItem value="2">2 Days</SelectItem>
                <SelectItem value="3">3 Days</SelectItem>
                <SelectItem value="5">5 Days</SelectItem>
                <SelectItem value="7">1 Week</SelectItem>
                <SelectItem value="14">2 Weeks</SelectItem>
                <SelectItem value="30">1 Month</SelectItem>
                <SelectItem value="60">2 Months</SelectItem>
                <SelectItem value="120">4 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }>
          <Money amount={getExpensesFrom(expenses.calcExpensesFrom, expenses.expenses).totalAmount} />
        </CardStats>

        <Tabs defaultValue="add">
          <TabsList className="border border-black w-fit mt-4">
            <TabsTrigger value="add" className="data-[state=active]:bg-accent">Add Expense</TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-accent">Expenses List</TabsTrigger>
          </TabsList>

          <TabsContent value="add" >
            <div className="flex items-center justify-between mt-12 lg:mt-18 md:mb-4 mb-6">

              <p className="text-gray-400 lg:text-[18px]">Add new expense:</p>

            </div>

            <InputBoxContainer title="Title:">
              <Input className="w-70" placeholder="Enter title:" value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)} />
            </InputBoxContainer>

            <InputBoxContainer title="Amount:">
              <Input
                className="w-70"
                placeholder="000,000 $"
                type="number"
                value={amount ?? ""}
                onInput={(e) => setAmount(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
              />
            </InputBoxContainer>

            <InputBoxContainer title="Date:">

                <DatePicker trigger={
                  <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                  >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
                } 
                
                setDate={setDate} date={date}
                />
            </InputBoxContainer>

            <InputBoxContainer title="Category:">
              <div className="flex items-center gap-3 flex-wrap">

                {
                  categories.categories.length > 0 ? 
                  <>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-48 capitalize hover:bg-accent transition">
                        <SelectValue placeholder="Select category"/>
                      </SelectTrigger>
                      <SelectContent className="bg-text">
                        {
                          categories.categories.map((category) => {
                            return <SelectItem key={category.id} value={category.name} className="capitalize">{category.name}</SelectItem>
                          })
                        }
                      </SelectContent>
                    </Select>

                    <p>or</p>
                  </>
                  : ""
                }

                <AddCategory />

              </div>
            </InputBoxContainer>

            <div className="mb-4 lg:mb-6">
              <AcceptCheck
                description="Make expenses affect balance"
                value={balance.affectedByExpenses}
                setValue={() => dispatch(balanceActions.TOGGLE_EFFECT())}
              />
            </div>

            <div className="flex justify-end mb-1.5">
              <Alert trigger={
                <Button variant="secondary" size="lg" className="text-text bg-primary hover:opacity-90 transition" onClick={(e) => checkFields() ? "" : e.preventDefault()}>Add Expense</Button>
              } actionWhenAccept={addExpense} title="Do you want to add this expense ?"/>
            </div>
            {
              error ? 
              <p className="text-red-500 text-sm text-end">Fill all fields to add a new expense.</p> : ""
            }

        
          </TabsContent>

          <TabsContent value="list" >
            <div className="flex items-center justify-between mt-12 lg:mt-18 md:mb-4 mb-6">

              <p className="text-gray-400 lg:text-[18px]">Expenses List:</p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-sm">
                  <p>Sort by: </p>
                  <SelectBox
                    value={sortBy}
                    setValue={(value) => {
                      const nextSort = value as ExpensesReducer["sortBy"]
                      setSortBy(nextSort)
                      dispatch(expensesActions.UPDATE_SORT({ sortBy: nextSort }))
                    }}
                    items={["recently added", "title", "amount", "date", "category"]}
                  />
                </div>
              </div>

            </div>

            <ExpensesTable />

            <div className="flex justify-end mt-4 md:mt-5">
            <Alert
            trigger={
                <Button variant="secondary" size="lg" className="text-text bg-primary hover:opacity-90 transition" onClick={(e) => expenses.expenses.length > 0 ? "" : e.preventDefault()}>Remove All</Button>
            }
            title="Are you sure ?" description="This will delete all of your expenses, and this action cannot be undo." 
            actionWhenAccept={() => {dispatch(expensesActions.REMOVE_ALL())}}/>
            </div>

          </TabsContent>
        </Tabs>



      </PageContainer>
    
    </>
  )
}

export default Expenses