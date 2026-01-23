import React from "react";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import AdminProduct from "./components/AdminProduct";
import EditProduct from "./components/EditProduct";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import SearchResult from "./components/SearchResult";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import Order_Confirmation from "./components/Order_Confirmation";
import AllUsers from "./components/AllUsers";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search/:term" element={<SearchResult />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<Order_Confirmation />} />
          
          <Route path="/admin" element={<AdminProduct />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} />
          <Route path="/admin/allorder" element={<Profile />} />
          <Route path="/admin/allusers" element={<AllUsers />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
