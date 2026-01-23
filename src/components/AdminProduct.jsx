import React, { useContext } from "react";
import AppContext from "../context/AppCotext";
import { Link, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const { products, deleteProduct } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {products?.map((product) => (
          <div key={product._id}>
            <div
              className="container bg-dark my-5 p-3 admin text-center"
              style={{ borderRadius: "10px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={product.imgSrc}
                  alt="..."
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </div>
              <div style={{width:'500px'}}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span>{product.createdAt}</span>
              </div>
              <div>
                <button
                  className="btn btn-warning mx-3"
                  onClick={()=>navigate(`/admin/edit/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (confirm("Are you sure, want to delete")) {
                      const result = await deleteProduct(product._id);
                      console.log("deleted Result ", result);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminProduct;
