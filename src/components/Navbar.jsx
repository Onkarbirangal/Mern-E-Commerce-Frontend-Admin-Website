import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppCotext";

const Navbar = () => {
  const {
    logout,
    isAuthenticated,
    cart,
    filteredData,
    setfilteredData,
    products,
  } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log("this is location", location);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("")
  };

  const filterByCategory = (cat) => {
    setfilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setfilteredData(products.filter((data) => data.price >= price));
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          {location.pathname.includes("/admin") ? (
            <>
              <Link
                to={"/admin"}
                className="left"
                style={{ textDecoration: "none", color: "white" }}
              >
                {"Admin Panel"}
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/"}
                className="left"
                style={{ textDecoration: "none", color: "white" }}
              >
                {"MERN - Ecommerce"}
              </Link>
            </>
          )}

          <form onSubmit={handleSubmit} className="search_bar">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search Products..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="right">
            {!location.pathname.includes("/admin") && (
              <>
                {!isAuthenticated && (
                  <>
                    <Link to={"/login"} className="btn btn-info mx-2">
                      Login
                    </Link>
                    <Link to={"/register"} className="btn btn-secondary mx-2">
                      SignUp
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <>
                    <Link
                      to={"/cart"}
                      type="button"
                      className="btn btn-primary position-relative mx-3"
                      style={{ fontWeight: "bold" }}
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                      {cart?.items?.length > 0 && (
                        <>
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cart?.items?.length}
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        </>
                      )}
                    </Link>
                    <Link
                      to={"/profile"}
                      className="btn btn-warning mx-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Profile
                    </Link>

                    <button
                      className="btn btn-danger mx-3 "
                      style={{ fontWeight: "bold" }}
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      LogOut
                    </button>
                    <Link
                      to={"/admin"}
                      className="btn btn-info mx-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Admin
                    </Link>
                  </>
                )}
              </>
            )}

            {location.pathname.includes("/admin") && (
              <>
                <Link to={"/"} className="btn btn-info mx-2">
                  Go To Home
                </Link>
                <Link to={"/admin/add"} className="btn btn-warning mx-2">
                  Add Product
                </Link>
                <Link to={"/admin/allorder"} className="btn btn-secondary mx-2">
                  All Order's
                </Link>
                <Link to={"/admin/allusers"} className="btn btn-info mx-2">
                  All Users
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setfilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCategory("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCategory("tablets")}>
              Tablets
            </div>
            <div className="items" onClick={() => filterByCategory("cameras")}>
              {"Camera's"}
            </div>
            <div
              className="items"
              onClick={() => filterByCategory("headphones")}
            >
              HeadPhones
            </div>
            <div className="items" onClick={() => filterByPrice("19999")}>
              19999
            </div>
            <div className="items" onClick={() => filterByPrice("39999")}>
              39999
            </div>
            <div className="items" onClick={() => filterByPrice("49999")}>
              49999
            </div>
            <div className="items" onClick={() => filterByPrice("65999")}>
              65999
            </div>
            <div className="items" onClick={() => filterByPrice("89999")}>
              89999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
