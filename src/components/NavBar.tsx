import Logo from "./Logo"
import SideBarToggler from "./SideBarToggler"


interface NavBarType {
  className?: string
}

function NavBar({ className = "" }: NavBarType) {



  return (
    <>
        <div className={`${className} p-4 md:p-5 lg:px-6 relative`}>


          <div className="md:hidden flex items-center gap-3.5">
            <SideBarToggler />
            <Logo />
          </div>

          
        

        </div>
    </>
  )
}

export default NavBar