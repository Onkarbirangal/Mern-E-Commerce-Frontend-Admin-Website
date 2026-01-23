import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppCotext";
import OrderDetail from "./OrderDetail";
import { Link } from "react-router-dom";

const Order_Confirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [razorPayOrder, setraz] = useState();
  useEffect(() => {
    if (userOrder) {
      setraz(userOrder[0]);
    }
  }, [userOrder]);

  // console.log(razorPayOrder)
  return (
    <>
      <div className="container text-center my-3">
        <h1>Your order has been confirm,</h1>
        <h2>It will delivered soon</h2>
      </div>
      <div className="container my-5">
        <table className="table table-dark table-bordered border-primary">
          <thead>
            <tr className="text-center">
              <th scope="col">orderItems</th>
              <th scope="col"> OrderDetails & ShippingAddress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <OrderDetail
                  orders={razorPayOrder?.orderItems}
                  totalAmount={razorPayOrder?.amount}
                />
              </th>
              <td scope="row">
                <ul>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Order Id : </span>
                    {razorPayOrder?.orderId}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>PaymentId : </span>
                    {razorPayOrder?.paymentId}
                  </li>
                  {razorPayOrder?.payStatus && (
                    <li>
                      <span style={{ fontWeight: "bold" }}>
                        Payment Status :{" "}
                      </span>
                      {razorPayOrder?.payStatus}
                    </li>
                  )}
                  {/* payStatus */}
                  <li>
                    <span style={{ fontWeight: "bold" }}>OrderDate : </span>
                    {razorPayOrder?.orderDate}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Name : </span>
                    {razorPayOrder?.userShipping?.fullName}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Phone : </span>
                    {razorPayOrder?.userShipping?.phoneNumber}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>State : </span>
                    {razorPayOrder?.userShipping?.state}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>City : </span>
                    {razorPayOrder?.userShipping?.city}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>PinCode : </span>
                    {razorPayOrder?.userShipping?.pinCode}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Near By : </span>
                    {razorPayOrder?.userShipping?.addressLine}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center">
        <Link
          to={"/"}
          className="btn btn-warning mx-3 "
          style={{ fontWeight: "bold" }}
        >
          Continue Shopping
        </Link>
        <Link
          to={"/profile"}
          className="btn btn-primary mx-3 "
          style={{ fontWeight: "bold" }}
        >
          All Order's
        </Link>
      </div>
    </>
  );
};

export default Order_Confirmation;
