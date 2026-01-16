import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Dashboard from './pages/Dashboard'
import Balance from './pages/Balance'
import Expenses from './pages/Expenses'
import NotFound from './pages/NotFound'
import Sources from './pages/Sources'

export interface InitialPropsType {
  className?: string
  children?: React.ReactNode
}

function App() {


  return (
    <>
      <div className='flex min-h-screen'>
        <SideBar/>
        <div className='flex-1'>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/balance' element={<Balance />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/incomeSources' element={<Sources />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
