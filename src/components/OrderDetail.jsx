import React, { useEffect, useState } from "react";

const OrderDetail = ({ orders, totalAmount }) => {
  const [totalQty, settotalQty] = useState(0);
  useEffect(() => {
    let qty = 0;
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        qty += orders[i].qty;
      }
    }
    settotalQty(qty)
  }, [orders]);

  return (
    <>
      <div className="container">
        <table className="table table-dark table-bordered border-primary">
          <thead>
            <tr className="text-center">
              <th scope="col">Product Img</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((product) => (
              <tr key={product.productId} className="text-center">
                <th scope="row d-flex">
                  <img
                    src={product.imgSrc}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                </th>
                <th scope="row">{product.title}</th>
                <th>{product.price}</th>
                <th>{product.qty}</th>
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
                  {totalAmount} {"₹"}
                </button>
              </th>
              <th>
                <button className="btn btn-info" style={{ fontWeight: "bold" }}>
                  {totalQty}
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetail;
