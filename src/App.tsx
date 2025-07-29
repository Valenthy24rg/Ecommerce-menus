import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DessertCart } from "./Components/DessertCart";
import { DessertMenus } from "./Components/DessertMenus";
import {DessertDetail} from "./Components/DessertDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <DessertMenus />
              <DessertCart />
            </div>
          }
        />
        <Route path="/dessert/:id" element={<DessertDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
