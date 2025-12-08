import { useEffect, useRef, useState } from "react"

import { type InitialPropsType } from "@/App"
import addCommas from "@/module/addCommas"
import { DollarSign, EuroIcon } from "lucide-react"

interface MoneyPropsType extends InitialPropsType {
  amount: number
  currency?: "US" | "EUR"
}
function Money({ className = "", amount, currency = "US" }: MoneyPropsType) {
  const [displayAmount, setDisplayAmount] = useState(amount)
  const animatedValueRef = useRef(amount) // tracks the value currently shown so next animation starts smoothly

  // Animating numbers
  useEffect(() => {
    const startValue = animatedValueRef.current
    const diff = amount - startValue

    if (diff === 0) {
      animatedValueRef.current = amount
      return
    }

    const duration = 600 // ms
    const startTime = performance.now()
    let animationFrame: number

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1) // clamp 0..1 for time
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic curve
      const nextValue = startValue + diff * eased // interpolate towards target

      animatedValueRef.current = nextValue
      setDisplayAmount(nextValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick)
      } else {
        animatedValueRef.current = amount
        setDisplayAmount(amount)
      }
    }

    animationFrame = requestAnimationFrame(tick) // kick off animation loop

    return () => cancelAnimationFrame(animationFrame)
  }, [amount])

  return (
    <>
    <div className={`${className} text-[22px] lg:text-[26px] font-outfit flex items-center`}>
      <div>
        {currency === "US" ? <DollarSign className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.4} /> : ""}
        {currency === "EUR" ? <EuroIcon className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.4} /> : ""}
      </div>
      {addCommas(displayAmount)}
    </div>
    </>
  )
}

export default Money