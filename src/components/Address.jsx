import React, { useContext, useState } from "react";
import AppContext from "../context/AppCotext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { addAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    fullName: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phoneNumber: "",
    addressLine: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const {
      fullName,
      city,
      state,
      pinCode,
      country,
      phoneNumber,
      addressLine,
    } = registerUser;
    const result = await addAddress(
      fullName,
      city,
      state,
      pinCode,
      country,
      phoneNumber,
      addressLine
    );
    // alert(result.message);

    navigate("/checkout");

    console.log("user login = ", result);
  };

  return (
    <>
      <div
        className="container p-4  my-3"
        style={{
          // width: "580px",
          border: "1px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Full Name
              </label>
              <input
                name="fullName"
                value={registerUser.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={registerUser.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={registerUser.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={registerUser.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pincode
              </label>
              <input
                name="pinCode"
                value={registerUser.pinCode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={registerUser.phoneNumber}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
          </div>
          <div className="row"></div>
          <div className="row">
            <div className="mb-3 col-md-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                AddressLine/Nearby
              </label>
              <textarea
                name="addressLine"
                value={registerUser.addressLine}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            
            <div className="d-grid col-6 mx-auto my-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {userAddress && (
          <div className="d-grid col-6 mx-auto mt-3">
            <button
              style={{ fontWeight: "bold" }}
              type="submit"
              className="btn btn-warning"
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default Address;
