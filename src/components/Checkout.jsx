import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppCotext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const {
    cart,
    user,
    removeFromCart,
    decreaseQtyFromCart,
    addToCart,
    reload,
    clearCart,
    userAddress,
    razorPayOrder,
    setRazorPayOrder,
    userOrder, 
    url
  } = useContext(AppContext);
  const navigate = useNavigate();
  //   console.log("User at cart ",user)
  // console.log("cart at cart",cart)
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const [orderedProduct, setOrderedProduct] = useState([]);

  useEffect(() => {
    let totalqty = 0;
    let totalprice = 0;
    let orderItems = [];
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        totalqty += cart.items[i].qty;
        totalprice += cart.items[i].price;

        const obj = {
          title: cart.items[i].title,
          price: cart.items[i].price,
          qty: cart.items[i].qty,
          productId: cart.items[i]?.productId?._id,
          productImage: cart.items[i].imgSrc,
        };

        orderItems.push(obj);
      }
    }
    // console.log("total price ",totalprice)
    // console.log("totalqty = ",totalqty)
    setQty(totalqty);
    setPrice(totalprice);
    setOrderedProduct(orderItems);
  }, [cart, reload]);

  const cartLength = cart?.items?.length;

  // "rzp_test_gHH711O4gcSjCq",

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: cart.items,
        userShipping: userAddress,
        userId: user._id,
      });
      const { orderId, amount: orderAmount } = orderResponse.data;

      console.log("razor data", orderResponse);

      const options = {
        key: "rzp_test_S69O5grKveQzOf", // Enter your Razorpay Key ID here
        amount: orderAmount * 100,
        currency: "INR",
        name: "my mern project",
        description: "my mern project",
        order_id: orderId,
        handler: async function (response) {
          console.log("razor pay wala response = ", response);
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: orderedProduct,
            userId: user._id,
            userShipping: userAddress,
            // orderDate:Date.now()
          };
          const data = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData,
          );
          console.log("backed res", data);
          // setRazorPayOrder(data.data.payment);
          // setRazorPayOrder(userOrder[0]);
          // console.log("at checkout rezorpay data = ",razorPayOrder)
          navigate("/orderconfirmation");
          // alert("Payment successful");
          clearCart();
        },
        //  console.log(handler),
        prefill: {
          name: userAddress.fullName,
          email: "onkarbirangal@gmail.com",
          contact: "9999529823",
        },
        notes: {
          address: userAddress.address,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  // console.log("user Address ",userAddress)

  return (
    <>
      <div className="text-center">
        <h1 className="my-2">Order Summary</h1>
      </div>
      <div className="container my-3">
        <table className="table table-dark table-bordered border-primary">
          <thead>
            <tr className="text-center">
              <th scope="col">Product's Detail</th>
              <th scope="col">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {/* <div className="container"> */}
            <tr>
              <th>
                <table className="table table-dark table-bordered border-primary">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Product Img</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Qty--</th>
                      <th scope="col">Qty++</th>
                      <th scope="col">remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.items?.map((product) => (
                      <tr key={product._id}>
                        <th scope="row" className="text-center">
                          <img
                            src={product.imgSrc}
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                        </th>
                        <th className="text-center" scope="row">
                          {product.title}
                        </th>
                        <th className="text-center">{product.price}</th>
                        <th className="text-center">{product.qty}</th>

                        <th className="text-center">
                          <span
                            onClick={() =>
                              decreaseQtyFromCart(product.productId._id, 1)
                            }
                            className="material-symbols-outlined"
                          >
                            do_not_disturb_on
                          </span>
                        </th>

                        <th className="text-center">
                          <span
                            onClick={() =>
                              addToCart(
                                product.productId._id,
                                product.title,
                                product.price / product.qty,
                                1,
                                product.imgSrc
                              )
                            }
                            className="material-symbols-outlined"
                          >
                            add_circle
                          </span>
                        </th>

                        <td
                          className="text-center"
                          onClick={async () => {
                            if (confirm("Are you sure, want to remove")) {
                              console.log("product id ", product.productId);
                              await removeFromCart(product.productId);
                            }
                          }}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="text-center">
                      <th></th>
                      <th>
                        <button
                          className="btn btn-primary"
                          style={{ fontWeight: "bold" }}
                        >
                          Total
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-warning"
                          style={{ fontWeight: "bold" }}
                        >
                          {price} {"₹"}
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          style={{ fontWeight: "bold" }}
                        >
                          {qty}
                        </button>
                      </th>
                      <td></td>

                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </th>
              {/* </div> */}
              <th>
                <td scope="row">
                  <ul>
                    <li>
                      <span style={{ fontWeight: "bold" }}>Name : </span>
                      {userAddress?.fullName}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>Phone : </span>
                      {userAddress?.phoneNumber}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>Country : </span>
                      {userAddress?.country}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>State : </span>
                      {userAddress?.state}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>City : </span>
                      {userAddress?.city}
                    </li>
                    <li>
                      <span style={{ fontWeight: "bold" }}>PinCode : </span>
                      {userAddress?.pincode}
                    </li>
                    <li style={{ maxWidth: "300px" }}>
                      <span style={{ fontWeight: "bold" }}>Near By : </span>
                      {userAddress?.address}
                    </li>
                  </ul>
                </td>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      {cartLength > 0 && (
        <>
          <div className="container my-4 text-center">
            <button
              className="btn btn-secondary btn-lg mx-3"
              style={{ fontWeight: "bold" }}
              onClick={handlePayment}
            >
              Proceed To Pay
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
