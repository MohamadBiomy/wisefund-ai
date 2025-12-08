export const loadState = <T>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState) as T
  } catch (err) {
    console.error('Error loading state:', err)
    return undefined
  }
}

export const saveState = <T>(state: T): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (err) {
    console.error('Error saving state:', err)
  }
}