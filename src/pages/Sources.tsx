import CardStats from "@/components/CardStats"
import PageContainer from "../components/PageContainer"
import { TrendingUp } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import Money from "@/components/Money"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { sourcesActions } from "@/store/incomeSourcesSlice"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SourcesTable from "@/components/SourcesTable"
import SelectBox from "@/components/SelectBox"
import type { IncomeSources } from "@/store/incomeSourcesSlice"
import InputBoxContainer from "@/components/InputBoxContainer"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Alert from "@/components/Alert"
import { Button } from "@/components/ui/button"
import { AddCategory } from "@/components/AddCategory"
import { DatePicker } from "@/components/DatePicker"
import { ChevronDownIcon } from "lucide-react"
import { actions as balanceActions } from "@/store/balanceSlice"

function Sources() {
  const incomeSources = useSelector((state: RootState) => state.incomeSources)
  const categories = useSelector((state: RootState) => state.categories)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("general")
  const [amount, setAmount] = useState<null | number>(null)
  const [frequency, setFrequency] = useState<"day" | "week" | "month">("month")  // Add frequency state
  const [startingDate, setStartingDate] = useState<Date | undefined>(new Date())  // Add date state
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [sortBy, setSortBy] = useState<IncomeSources["sortBy"]>(incomeSources.sortBy)

  // Calculate total recurring revenue based on calcTotalPer
  function calculateTotalRevenue(): number {
    const { incomeSources: sources, calcTotalPer } = incomeSources
    
    return sources.reduce((total, source) => {
      let convertedAmount = source.amount
      
      // Convert source amount to match calcTotalPer period
      if (source.per === calcTotalPer) {
        // Same period, no conversion needed
        convertedAmount = source.amount
      } else {
        // Convert to target period
        switch (calcTotalPer) {
          case "day":
            if (source.per === "week") {
              convertedAmount = source.amount / 7
            } else if (source.per === "month") {
              convertedAmount = source.amount / 30.44 // Average days per month
            }
            break
          case "week":
            if (source.per === "day") {
              convertedAmount = source.amount * 7
            } else if (source.per === "month") {
              convertedAmount = source.amount / 4.33 // Average weeks per month
            }
            break
          case "month":
            if (source.per === "day") {
              convertedAmount = source.amount * 30.44
            } else if (source.per === "week") {
              convertedAmount = source.amount * 4.33
            }
            break
        }
      }
      
      return total + convertedAmount
    }, 0)
  }

  function checkFields(): boolean {
    if (title && amount && startingDate) {  // Include date check
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

  function addSource() {
    if (!startingDate) return

    const dateString = startingDate.toISOString()

    // Add the source
    dispatch(sourcesActions.ADD_SOURCE({
      title,
      amount: amount as number,
      category,
      per: frequency,  // Include frequency
      startingDate: dateString
    }))

    // Increase balance immediately by the amount
    dispatch(balanceActions.INCREASE_BALANCE({ amount: amount as number }))

    // Reset form
    setCategory("general")
    setTitle("")

    setAmount(null)
    setFrequency("month")
    setStartingDate(new Date())
  }

  return (
    <>

      <PageContainer>

        <CardStats title={`Total Income Per ${incomeSources.calcTotalPer}`} icon={<TrendingUp strokeWidth={2.4} className="aspect-square w-4 lg:w-5" />} ele1={            
            <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-sm">
              <p>Calculate Per:</p>
              <Select value={incomeSources.calcTotalPer} onValueChange={(value) => dispatch(sourcesActions.UPDATE_CALC_PER({per: value}))}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent className="bg-text">
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>}>
          <Money amount={calculateTotalRevenue()} />
        </CardStats>

        <Tabs defaultValue="add">
          <TabsList className="border border-black w-fit mt-4">
            <TabsTrigger value="add" className="data-[state=active]:bg-accent">Add Source</TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-accent">Sources List</TabsTrigger>
          </TabsList>

          <TabsContent value="add">

            <div className="flex items-center justify-between mt-12 lg:mt-18 md:mb-4 mb-6">

              <p className="text-gray-400 lg:text-[18px]">Add new income source:</p>

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

            {/* Add Frequency Select */}
            <InputBoxContainer title="Frequency:">
              <Select value={frequency} onValueChange={(value) => setFrequency(value as "day" | "week" | "month")}>
                <SelectTrigger className="w-48 capitalize hover:bg-accent transition">
                  <SelectValue placeholder="Select frequency"/>
                </SelectTrigger>
                <SelectContent className="bg-text">
                  <SelectItem value="day">Daily</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </InputBoxContainer>

            <InputBoxContainer title="Starting Date:">
              <DatePicker 
                trigger={
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {startingDate ? startingDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                } 
                setDate={setStartingDate} 
                date={startingDate}
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

            <div className="flex justify-end mb-1.5">
              <Alert trigger={
                <Button variant="secondary" size="lg" className="text-text bg-primary hover:opacity-90 transition" onClick={(e) => checkFields() ? "" : e.preventDefault()}>Add Source</Button>
              } actionWhenAccept={addSource} title="Do you want to add this source ?"/>
            </div>
            {
              error ? 
              <p className="text-red-500 text-sm text-end">Fill all fields to add a new source.</p> : ""
            }


          </TabsContent>

          <TabsContent value="list">
            <div className="flex items-center justify-between mt-12 lg:mt-18 md:mb-4 mb-6">

              <p className="text-gray-400 lg:text-[18px]">Sources List:</p>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-sm">
                  <p>Sort by: </p>
                  <SelectBox
                    value={sortBy}
                    setValue={(value) => {
                      const nextSort = value as IncomeSources["sortBy"]
                      setSortBy(nextSort)
                      dispatch(sourcesActions.UPDATE_SORT({ sortBy: nextSort }))
                    }}
                    items={["recently added", "title", "amount", "category"]}
                    values={["recent", "title", "amount", "category"]}
                  />
                </div>
              </div>

            </div>

            <SourcesTable />

            <div className="flex justify-end mt-4 md:mt-5">
              <Alert
                trigger={
                  <Button variant="secondary" size="lg" className="text-text bg-primary hover:opacity-90 transition" onClick={(e) => incomeSources.incomeSources.length > 0 ? "" : e.preventDefault()}>Remove All</Button>
                }
                title="Are you sure ?" description="This will delete all of your income sources, and this action cannot be undo." 
                actionWhenAccept={() => {dispatch(sourcesActions.REMOVE_ALL())}}
              />
            </div>

          </TabsContent>
        </Tabs>

      </PageContainer>
    
    </>
  )
}

export default Sources