import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppCotext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    user,
    removeFromCart,
    decreaseQtyFromCart,
    addToCart,
    reload,
    clearCart,                
  } = useContext(AppContext);
  const navigate = useNavigate();
  //   console.log("User at cart ",user)
  // console.log("cart at cart",cart)
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let totalqty = 0;
    let totalprice = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        totalqty += cart.items[i].qty;
        totalprice += cart.items[i].price;
      }
    }
    // console.log("total price ",totalprice)
    // console.log("totalqty = ",totalqty)
    setQty(totalqty);
    setPrice(totalprice);
  }, [cart, reload]);

  const cartLength = cart?.items?.length;

  return (
    <>
      <div className="text-center my-3">
        {/* <h3>Welcome, {user?.name}</h3>
        <h3>{user?.email}</h3> */}
        {cartLength > 0 && (
          <>
            <div className="mt-3">
              <h1
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold",fontSize:'1.3rem' }}
              >
                
                  Total Qty :-
                  {qty}
                
              </h1>
              <h1
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold",fontSize:'1.3rem' }}
              >
               Total Price :- {price}
              </h1>
            </div>
          </>
        )}
      </div>
      <div className="container">
        {cart?.items?.map((product) => (
          <div key={product._id}>
            <div
              className="container bg-dark my-4 p-3 admin text-center"
              style={{ borderRadius: "10px" }}
            >
              <Link
                to={`/product/${product.productId._id}`}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={product.imgSrc}
                  alt="..."
                  style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div style={{ width: "500px" }}>
                <h4>{product.title}</h4>
                <h5>
                  {product.price} {"₹"}
                </h5>
                <h5>Qty :- {product.qty}</h5>
                <span>{product.createdAt}</span>

                {/* <h1>{product?.productId?._id}</h1> */}
              </div>
              <div>
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => decreaseQtyFromCart(product.productId._id, 1)}
                  style={{ fontWeight: "bold" }}
                >
                  Decrease Qty (-)
                </button>
                <button
                  className="btn btn-info mx-3"
                  onClick={() =>
                    addToCart(
                      product.productId._id,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }
                  style={{ fontWeight: "bold" }}
                >
                  Increase Qty (+)
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (confirm("Are you sure, want to remove")) {
                      console.log("product id ", product.productId);
                      await removeFromCart(product.productId);
                    }
                  }}
                  style={{ fontWeight: "bold" }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartLength > 0 && (
        <>
          <div className="container my-5 text-center">
            <button
              className="btn btn-warning btn-lg mx-3"
              style={{ fontWeight: "bold" }}
              onClick={
                ()=>navigate('/address')}
            >
              Check Out
            </button>
            <button
              className="btn btn-danger btn-lg mx-3"
              onClick={async () => {
                if (confirm("Are you sure, want to clear cart")) {
                  await clearCart();
                }
              }}
              style={{ fontWeight: "bold" }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}

      {(cartLength == 0 || !cart )&& (
        <>
          <div className="text-center my-5">
            <Link to="/" className="btn btn-warning btn-lg" style={{fontWeight:'bold'}}>
              Continue Shopping...
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
