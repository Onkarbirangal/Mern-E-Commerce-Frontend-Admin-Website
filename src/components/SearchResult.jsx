import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../context/AppCotext";

const SearchResult = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { term } = useParams();
  const { products, addToCart } = useContext(AppContext);
  useEffect(() => {
    setSearchResult(
      products.filter((data) =>
        data.title.toLowerCase().includes(term.toLowerCase())
      )
    );

    console.log("Search Result = ", searchResult);
  }, [term]);

  return (
    <>
      {searchResult.length == 0 && (
        <>
          <div className="container text-center my-5">
            <h1>No Product Available</h1>
            <div className="text-center my-3">
              <Link
                to="/"
                className="btn btn-warning btn-lg"
                style={{ fontWeight: "bold" }}
              >
                Continue Shopping...
              </Link>
            </div>
          </div>
        </>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center">
          {searchResult?.map((product) => (
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
                      height: "220px",
                      width: "220px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>
                <div className="card-body text-light text-center">
                  <h5 className="card-title">{product.title}</h5>
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

export default SearchResult;
