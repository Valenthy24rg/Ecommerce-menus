
import './App.css'
import { DessertCart } from './Components/DessertCart'
import { DessertMenus } from './Components/DessertMenus'

function App() {

  return (
    <div className="flex">
        <DessertMenus/>
        <DessertCart/>
      </div>
  )
}

export default App
