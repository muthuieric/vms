import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { changePassword } from "../reducer/Actions";

const ChangePassword = ({ isAuthenticated, changePassword }) => {
  const [formData, setFormData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });

  const { new_password1, new_password2, old_password } = formData;

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    changePassword(new_password1, new_password2, old_password);
  };

  if (!isAuthenticated && !localStorage.getItem("access")) {
    return <Navigate to={"../login"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>
        <form onSubmit={(e) => handlingSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="new_password1" className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              name="new_password1"
              value={new_password1}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="new_password1"
              placeholder="New password ..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new_password2" className="block text-sm font-medium text-gray-600">
              Re-enter New Password
            </label>
            <input
              name="new_password2"
              value={new_password2}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="new_password2"
              placeholder="Re-enter new password ..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="old_password" className="block text-sm font-medium text-gray-600">
              Old Password
            </label>
            <input
              name="old_password"
              value={old_password}
              onChange={(e) => handlingInput(e)}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="old_password"
              placeholder="Old password ..."
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary rounded-lg bg-blue-600 hover-bg-blue-800" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { changePassword })(ChangePassword);
