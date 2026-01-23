import React, { useContext, useState } from "react";
import AppContext from "../context/AppCotext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const {email, password } = registerUser;
    const result = await login(email, password);
    // alert(result.message);

    if (result.success){
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    console.log("user login = ", result);
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
        <h1 className="text-center">User Login</h1>
        <form onSubmit={onSubmitHandler}>
         
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={registerUser.email}
              onChange={onChangeHandler}
              type="email"
              className="form-control bg-dark text-light"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={registerUser.password}
              onChange={onChangeHandler}
              type="password"
              className="form-control bg-dark text-light"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="d-grid col-6 my-5 mx-auto">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
