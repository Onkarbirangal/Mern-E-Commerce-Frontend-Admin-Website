import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppCotext";
import OrderDetail from "./OrderDetail";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const { user, userOrder, allOrder } = useContext(AppContext);
  const location = useLocation();
  const [product, setproduct] = useState()

  useEffect(() => {
    // let p = ;
    // console.log(p)
    setproduct(location.pathname.includes("/admin") ? allOrder : userOrder);
    // console.log("at profile admin ",p);
  }, [location.pathname,allOrder,userOrder]);
  console.log("at profile product",product);

  return ( 
    <>
    {!location.pathname.includes('/admin') && (

      <div className="container text-center my-3">
        <h2>Welcome , {user?.name}</h2>
        <h3>{user?.email}</h3>
      </div>
      )}

      {product?.length != 0 && (
        <>
        <h1 className="text-center my-3">Total Order's = {product?.length}</h1>

          <div className="container my-5">
            <table className="table table-dark table-bordered border-primary">
              <thead>
                <tr className="text-center">
                  <th scope="col">orderItems</th>
                  <th scope="col"> OrderDetails & ShippingAddress</th>
                </tr>
              </thead>
              <tbody>
                {product?.map((product) => (
                  <tr key={product._id}>
                    <th>
                      <OrderDetail
                        orders={product.orderItems}
                        totalAmount={product.amount}
                      />
                    </th>
                    <td scope="row">
                      <ul>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            Order Id :{" "}
                          </span>
                          {product?.orderId}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            PaymentId :{" "}
                          </span>
                          {product.paymentId}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            OrderDate :{" "}
                          </span>
                          {product?.orderDate}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Name : </span>
                          {product?.userShipping?.fullName}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Phone : </span>
                          {product?.userShipping?.phoneNumber}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>State : </span>
                          {product?.userShipping?.state}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>City : </span>
                          {product?.userShipping?.city}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>PinCode : </span>
                          {product?.userShipping?.pinCode}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Near By : </span>
                          {product?.userShipping?.addressLine}
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
