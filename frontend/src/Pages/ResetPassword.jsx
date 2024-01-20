import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../reducer/Actions";

const ResetPassword = ({ resetPassword }) => {
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setStatus(true);
  };

  if (status) {
    return <Navigate to={"../"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <h5 className="text-center mb-4">
          Please input your registered email. The link to set your new password
          will be sent to your email.
        </h5>
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
          <div className="d-grid gap-2">
            <button className="btn btn-primary rounded-lg bg-blue-600 hover-bg-blue-800" type="submit">
              Send Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { resetPassword })(ResetPassword);
