import React, { useContext, useState } from "react";
import AppContext from "../context/AppCotext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { addProudutct } = useContext(AppContext);
  const navigate = useNavigate()
  const [productData, setproductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imgSrc: "",
    qty: "",
  });

  const onChangeHandler =  (e) => {
    const { name, value } = e.target;
    setproductData({ ...productData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      productData.category == "--Select Category--" ||
      productData.category == ""
    ) {
      alert("Please Select Category");
    } else {
      const { title, description, price, category, imgSrc, qty } = productData;
      const result = await addProudutct(
        title,
        description,
        price,
        imgSrc,
        category,
        qty
      );
      // alert(result.message)

      setTimeout(() => {
        navigate('/admin')
      }, 2000);

      console.log("data added = ",result)
    }
  };

  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          width: "580px",
          border: "1px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Add Product</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={productData.title}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              price
            </label>
            <input
              name="price"
              value={productData.price}
              onChange={onChangeHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select bg-dark text-light"
              name="category"
              value={productData.category}
              onChange={onChangeHandler}
              required
            >
              <option>--Select Category--</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Tablets</option>
              <option>Cameras</option>
              <option>Headphones</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              imgUrl
            </label>
            <input
              name="imgSrc"
              value={productData.imgSrc}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              product quantity
            </label>
            <input
              name="qty"
              value={productData.qty}
              onChange={onChangeHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="d-grid col-6 my-5 mx-auto">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
