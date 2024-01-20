import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../reducer/Actions";

const Signup = ({ signup }) => {
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
  });

  const { email, first_name, last_name, password1, password2 } = formData;

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    signup(email, first_name, last_name, password1, password2);
    setStatus(true);
  };

  if (status) {
    return <Navigate to={"../"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={(e) => handlingSubmit(e)}>
          <div className="mb-4 ">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-600 ">
              First Name
            </label>
            <input
              name="first_name"
              value={first_name}
              onChange={(e) => handlingInput(e)}
              type="text"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="first_name"
              placeholder="First name ..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              name="last_name"
              value={last_name}
              onChange={(e) => handlingInput(e)}
              type="text"
              className="mt-1 p-2 w-full border  rounded-lg  focus:outline-none"
              id="last_name"
              placeholder="Last name ..."
            />
          </div>
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
            <label htmlFor="password1" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password1"
              value={password1}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="password1"
              placeholder="Password ..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password2" className="block text-sm font-medium text-gray-600">
            Re-enter Password
            </label>
            <input
              name="password2"
              value={password2}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="password2"
              placeholder="Re-enter Password..."
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary  bg-blue-600 hover-bg-blue-800 rounded-lg" type="submit">
              Signup
            </button>
          </div>
        </form>
        <p className="mt-4 text-center font-medium">
          Already have an account? <Link to={"../login/"} className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default connect(null, { signup })(Signup);
