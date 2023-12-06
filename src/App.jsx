import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Categories from "./pages/Categories";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import Products from "./pages/Products";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admins" element={<Admins />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
