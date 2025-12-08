import { Menu, PanelLeftClose } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { TOGGLE_BAR } from "../store/sidebarSlice"

const sizeVal = 18

function SideBarToggler() {

  const dispatch = useDispatch()
  const isOpened: boolean = useSelector((state: RootState) => state.sidebar.opened)

  function toggleSideBar(): void {
    if (isOpened) {
      dispatch(TOGGLE_BAR({opened: false}))
    } else {
      dispatch(TOGGLE_BAR({opened: true}))
    }
  }


  return (
    <>
    
    {/* Close SideBar Icon */}
    <div onClick={toggleSideBar} className="cursor-pointer text-primary md:text-base text-sm">
      {
        isOpened ?
        <PanelLeftClose size={sizeVal} /> : 
        <Menu size={sizeVal} />
      }
    </div>
    
    </>
  )
}

export default SideBarToggler