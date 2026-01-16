import { type IncomeSource } from "@/store/incomeSourcesSlice"
import { type AppDispatch } from "@/store/store"
import { sourcesActions } from "@/store/incomeSourcesSlice"
import { actions as balanceActions } from "@/store/balanceSlice"

/**
 * Calculates how many payment periods have elapsed since last payment
 */
function calculateElapsedPeriods(
  lastPaymentDate: string,
  frequency: "day" | "week" | "month"
): number {
  const lastDate = new Date(lastPaymentDate)
  const now = new Date()
  const diffMs = now.getTime() - lastDate.getTime()
  
  switch (frequency) {
    case "day":
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    case "week":
      return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
    case "month":
      // Approximate: 30.44 days per month average
      return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44))
    default:
      return 0
  }
}

/**
 * Processes all income sources and applies payments for elapsed periods
 * Returns the total amount added to balance
 */
export function processIncomeSources(
  incomeSources: IncomeSource[],
  dispatch: AppDispatch
): number {
  let totalAdded = 0
  const now = new Date().toISOString()
  
  incomeSources.forEach(source => {
    const elapsedPeriods = calculateElapsedPeriods(source.lastPaymentDate, source.per)
    
    if (elapsedPeriods > 0) {
      const paymentAmount = source.amount * elapsedPeriods
      
      // Increase balance
      dispatch(balanceActions.INCREASE_BALANCE({ amount: paymentAmount }))
      
      // Update last payment date
      dispatch(sourcesActions.UPDATE_LAST_PAYMENT_DATE({
        id: source.id,
        date: now
      }))
      
      totalAdded += paymentAmount
    }
  })
  
  return totalAdded
}