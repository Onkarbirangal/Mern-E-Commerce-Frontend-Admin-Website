import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppCotext";
import axios from "axios";
import Products from "./Products";
import RelatedProducts from "./RelatedProducts";

const ProductDetail = () => {
  const [Product, setProduct] = useState();
  const { url, addToCart, setfilteredData, products,clearCart } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      //   console.log(api.data.product);
      setProduct(api.data.product);
     

      // console.log("product at deatils",product)

      //   console.log(products)
    };
    fetchProducts();
    // setRelatedProducts(product?.category.toLowerCase());
  }, [id, url]);

  return (
    <>
      <div className="container my-3 p-3 product_detail">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={Product?.imgSrc}
            alt=""
            style={{ width: "280px", borderRadius: "10px" }}
          />
        </div>
        <div className="detail text-center" style={{ maxWidth: "550px" }}>
          <h1>{Product?.title}</h1>
          <p>{Product?.description}</p>
          <h2>
            {Product?.price} {"₹"}
          </h2>
          <div className="my-3">
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                clearCart()
                addToCart(
                  Product._id,
                  Product.title,
                  Product.price,
                  1,
                  Product.imgSrc
                );
                navigate("/address");
              }}
            >
              Buy Now
            </button>
            <button
              className="btn btn-warning"
              style={{ fontWeight: "bold" }}
              onClick={() =>
                addToCart(
                  Product._id,
                  Product.title,
                  Product.price,
                  1,
                  Product.imgSrc
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>{" "}
      <div className="container my-5 text-center">
        <h1>Related Products</h1>
        <RelatedProducts category={Product?.category} />
      </div>
    </>
  );
};

export default ProductDetail;
