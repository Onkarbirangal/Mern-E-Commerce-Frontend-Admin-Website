import React, { useEffect, useState } from "react";
import AppContext from "./AppCotext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [token, setToken] = useState(" ");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [filteredData, setfilteredData] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [userOrder, setUserOrder] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setloading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const [razorPayOrder, setRazorPayOrder] = useState(); // current order , razorpay response

  // const url = process.env.REACT_APP_API_URL;
  // const url = "http://localhost:1000/api";
  // const url = "http://localhost:5000/api";
const url = "https://mern-e-commerce-website-w3as.onrender.com/api";
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setfilteredData(api.data.products);
      setloading(false);

      //   console.log(products)
    };

    fetchProducts();
    fetchCart();
    profile();
    getUserAddress();
    getUserOrders();
    AllOrders();
    AllUsers();
    // if(products?.length != 0){

    // }
  }, [reload]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      setIsAuthenticated(true);
      setReload(!reload);
    } else {
      setIsAuthenticated(false);
    }
    // console.log('token',localStorageToken)
  }, [token, isAuthenticated]);

  // register
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // login
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("login data = ",api.data)
    if (api.data.success) {
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
    }
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // logout
  const logout = () => {
    toast.success("LogOut Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setReload(!reload);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
  };

  // user profile
  const profile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("User profile ",api.data.user)
    setUser(api.data.user);
    // console.log("User profile ",user)
  };

  // add Product
  const addProudutct = async (
    title,
    description,
    price,
    imgSrc,
    category,
    qty,
  ) => {
    const api = await axios.post(
      `${url}/product/add`,
      { title, description, price, imgSrc, category, qty },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // edit Product
  const editProuduct = async (
    id,
    title,
    description,
    price,
    imgSrc,
    category,
    qty,
  ) => {
    const api = await axios.put(
      `${url}/product/${id}`,
      { title, description, price, imgSrc, category, qty },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // delete Product
  const deleteProduct = async (id) => {
    const api = await axios.delete(`${url}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // add To Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    // console.log(api.data)
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log(api.data.cart)
    // return api.data;
  };

  // fetch Cart
  const fetchCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setReload(!reload);
    // console.log("user Cart ", api.data.cart);
    setCart(api.data.cart);
  };

  // remove from Cart
  const removeFromCart = async (productId) => {
    console.log("productId", productId._id);
    const api = await axios.delete(`${url}/cart/remove/${productId._id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("remove Cart ", api.data);
    // setCart(api.data);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // remove from Cart
  const decreaseQtyFromCart = async (productId, qty) => {
    // console.log("productId",productId._id)
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("decrease qty from Cart ", api.data);
    // setCart(api.data);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    // console.log("Clear Cart ", api.data);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // add address
  const addAddress = async (
    fullName,
    city,
    state,
    pincode,
    country,
    phoneNumber,
    address,
  ) => {
    // console.log(
    //   fullName,
    //   city,
    //   state,
    //   pinCode,
    //   country,
    //   phoneNumber,
    //   addressLine
    // );
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, city, state, pincode, country, phoneNumber, address },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("Address Added ", api.data);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  // get user address
  const getUserAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // setReload(!reload);
    // console.log("Address ", api.data.recentaddress);
    setUserAddress(api.data.address);
    // console.log("user",userAddress)
  };

  // get User Orders
  const getUserOrders = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserOrder(api.data.orders);
    // console.log("orders",api.data)
  };
  // console.log(userOrder)

  // get User Orders
  const AllOrders = async () => {
    const api = await axios.get(`${url}/payment/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // setUserOrder(api.data.orders);
    setAllOrder(api.data.orders);
    // console.log("orders",api.data)
  };
  // console.log(allOrder);

  // get User Orders
  const AllUsers = async () => {
    const api = await axios.get(`${url}/user/all`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // setUserOrder(api.data.orders);
    // setAllOrder(api.data.orders);
    // console.log("users",api.data.users)
    setAllUsers(api.data);
    //  setAllUsers(api.data.users);
    // console.log("all user", api.data);
  };
  // console.log(allOrder);

  return (
    <AppContext.Provider
      value={{
        token,
        url,
        reload,
        setReload,
        register,
        login,
        logout,
        isAuthenticated,
        products,
        addProudutct,
        editProuduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        decreaseQtyFromCart,
        clearCart,
        cart,
        user,
        userOrder,
        addAddress,
        userAddress,
        filteredData,
        setfilteredData,
        allOrder,
        razorPayOrder,
        setRazorPayOrder,
        loading,
        allUsers,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
