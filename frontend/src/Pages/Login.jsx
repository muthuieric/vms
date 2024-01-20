import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../reducer/Actions";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

//   const reachGoogle = () => {
//     const clientID = "Client Id Oauth google";
//     const callBackURI = "http://localhost:3000/";
//     window.location.replace(
//       `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`
//     );
//   };

  if (isAuthenticated) {
    return <Navigate to={"../visits/"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={(e) => handlingSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              name="email"
              value={email}
              onChange={(e) => handlingInput(e)}
              type="email"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="password"
              placeholder="Password ..."
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary rounded-lg bg-blue-600 hover-bg-blue-800" type="submit">
              Login
            </button>
          </div>
          {/* <div className="d-grid gap-2 mt-2">
            <button
              className="btn btn-primary rounded-lg bg-blue-600 hover-bg-blue-800"
              type="button"
              onClick={reachGoogle}
            >
              Login With Google
            </button>
          </div> */}
        </form>
        <p className="mt-4 text-center font-medium">
          Forgot your password? <Link to={"../reset/password/"} className="text-blue-500">Reset Password</Link>
        </p>
        <p className="text-center mt-2 font-medium">
          Don't have an account? <Link to={"../signup/"} className="text-blue-500">Signup</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
