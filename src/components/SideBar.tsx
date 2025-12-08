import { useDispatch, useSelector } from "react-redux"
import SideBarToggler from "./SideBarToggler"
import type { RootState } from "../store/store"
import { TOGGLE_BAR } from "../store/sidebarSlice"
import Logo from "./Logo"
import SideBarLink from "./SideBarLink"
import { CircleGauge, HandCoins, Wallet } from "lucide-react"

// interface SideBarProps {
//   className?: string
//   children?: React.ReactNode
// }

function SideBar() {
  const isOpened = useSelector((state: RootState) => state.sidebar.opened)
  const dispatch = useDispatch()

  return (
    <>


        <div className={`
          bg-surface p-4 md:py-7 lg:py-8 md:px-5 lg:px-6 max-[768px]:rounded h-full
          ${isOpened ? "left-0" : "-left-full"} max-w-[300px] w-[24%] min-w-[180px] max-[768px]:fixed transition-[left] duration-300 z-20 h-screen min-h-screen
          `}> 

          <div className="flex items-center justify-between pb-2 md:pb-3 border-[#01586366]">
            <Logo />
            <div className="md:hidden">
              <SideBarToggler />
            </div>
          </div>

          {/* Separator */}
          <div className="mt-5 md:mt-6 lg:mt-7 border-t border-[#01586333]"></div>

          <div className="mt-1 md:mt-2 lg:mt-3">

            <SideBarLink to="/">
              <CircleGauge className="w-3.5 lg:w-4.5 aspect-square" strokeWidth={2.4} />
              <span>Dashboard</span>
            </SideBarLink>
            <SideBarLink to="/balance">
              <Wallet className="w-3.5 lg:w-4.5 aspect-square" strokeWidth={2.4} />
              <span>Balance</span>
            </SideBarLink>
            <SideBarLink to="/expenses">
              <HandCoins className="w-3.5 lg:w-4.5 aspect-square" strokeWidth={2.4} />
              <span>Expenses</span>
            </SideBarLink>

          </div>

        </div>




      {/* overlay in mobile screens - prevents clicking and scrolling */}
      {isOpened ? 
      <div 
        onClick={() => dispatch(TOGGLE_BAR({opened: false}))}
        className={`hidden max-[768px]:block fixed top-0 h-screen w-screen z-10 bg-black opacity-50 transition-all duration-100 pointer-events-auto right-0`}
      ></div> : ""}
    </>
  )
}

export default SideBar