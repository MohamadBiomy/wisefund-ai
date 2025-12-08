import type { InitialPropsType } from "@/App"
import { NavLink } from "react-router-dom"

interface SideBarLinkProps extends InitialPropsType {
  to: string
}

function SideBarLink({ to, className = "", children }: SideBarLinkProps) {
  return (
    <>

      <NavLink to={to} className={({ isActive }) => `${className} 
      transition-all border border-transparent flex items-center rounded-md lg:rounded-lg gap-1 lg:gap-1.5 max-[768px]:mb-1 mb-1.5  font-medium px-1.5 lg:px-2.5 py-0.5 lg:py-1.5 text-[11px] lg:text-sm font-outfit
      ${isActive ? 'text-primary bg-text' : 'bg-transparent text-text-2 hover:bg-gray-200'}`}>
        {children}
      </NavLink>
    
    </>
  )
}

export default SideBarLink