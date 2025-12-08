import { Button } from "./ui/button"
import { actions } from "@/store/categoriesSlice"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Input } from "./ui/input"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RootState } from "@/store/store"
import { Trash2 } from "lucide-react"
import Alert from "./Alert"
// import { Trash2 } from "lucide-react"

export function AddCategory() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch()

  return (

    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
              variant="outline"
              className="w-fit justify-between font-normal"
              >
              Add Category
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:w-60 md:w-80 overflow-hidden p-3 bg-text gap-2" align="start">
          <Tabs defaultValue="add" className="w-auto">
            <TabsList className="mb-1 border border-black">
              <TabsTrigger value="add" className="data-[state=active]:bg-accent">Add</TabsTrigger>
              {
                categories.length > 0 ? 
                <TabsTrigger value="remove" className="data-[state=active]:bg-accent">Remove</TabsTrigger> : ""
              }
            </TabsList>
            <TabsContent value="add">
              <div>
                <p className="leading-none mb-3 font-medium">Add new category</p>

                <div className="grid gap-2">

                  <div className="grid grid-cols-3 items-center gap-4">
                    <p>Name:</p>
                    <Input
                      className="col-span-2 h-8"
                      value={value}
                      onInput={(e) => setValue(e.target.value)}
                    />

                  </div>

                    <Button variant="outline" size="sm" onClick={() => {
                      const isExisted = categories.map(e => e.name.toLowerCase() !== value.toLowerCase() ? true : false)
                      if (value && !isExisted.includes(false)) {
                        setOpen(false)
                        dispatch(actions.ADD_CATEGORY({name: value}))
                        setValue("")
                      }
                    }}>
                      Add
                    </Button>
                </div>
              </div>
            </TabsContent>
            {
              categories.length > 0 ? 
              <TabsContent value="remove">
              <div>
                <p className="leading-none mb-3 font-medium">Remove category</p>
                
                {categories.map((category, index) => {
                  return <div className="flex items-center justify-between border-b capitalize text-sm py-1" key={`${index}${category}`}>
                    {category.name}
                    <Alert trigger={
                      <Trash2 className="w-4 aspect-square text-red-500 cursor-pointer" strokeWidth={2.3} />
                    } actionWhenAccept={() => {
                      dispatch(actions.REMOVE_CATEGORY({id: category.id}))
                      setOpen(false)
                    }} title="Are you sure?" description="Be aware, You cannot undo this action." />
                  </div>
                  
                })}
                
              </div>
            </TabsContent> : ""
            }
          </Tabs>
          
        </PopoverContent>
      </Popover>
    </div>
    
  )
}
