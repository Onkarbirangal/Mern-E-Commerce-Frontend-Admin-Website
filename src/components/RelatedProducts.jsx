import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppCotext";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {
   
  const { addToCart, products } = useContext(AppContext);
    const [product, setProducts] = useState([])
  useEffect(() => {
    
    setProducts(products.filter((data)=>data?.category.toLowerCase() ==category?.toLowerCase()))
    
  }, [category])
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-3">
        <div className="row container d-flex justify-content-center align-items-center">
          {product?.map((product) => (
            <div key={product._id} className="col-md-4">
              <div className="card p-3 bg-dark my-3" style={{ width: "18rem" }}>
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>
                <div className="card-body text-light text-center">
                  <h5 className="card-title my-3">{product.title}</h5>
                  {/* <p className="card-text">{product.description} </p> */}
                  <button className="btn btn-primary mx-2">
                    {product.price} {"₹"}
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
