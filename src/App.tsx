import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DessertCart } from "./Components/DessertCart";
import { DessertMenus } from "./Components/DessertMenus";
import DessertDetail from "./Components/DessertDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex">
                <DessertMenus />
                <DessertCart />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dessert/:id"
          element={
            <ProtectedRoute>
              <DessertDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
