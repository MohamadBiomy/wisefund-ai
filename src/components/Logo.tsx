import { Sparkle } from "lucide-react"

// let iconSize: number = 2.3

// window.onresize = () => {
//   const width: number = document.documentElement.clientWidth

//   if (width >= 1024) {
//     iconSize = 2.3
//   } else if (width < 1024 && width > 768) {
//     iconSize = 1.8
//   }
// }

function Logo() {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Sparkle className="text-primary w-5 h-5 lg:w-7 lg:h-7" strokeWidth={2.3} />
      <p className="font-semibold font-outfit text-primary lg:text-2xl md:text-[20px] text-base md:flex-1">WiseFund AI</p>
    </div>
  )
}

export default Logo