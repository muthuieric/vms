// Signup.js

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../reducer/Actions";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = ({ signup }) => {
  const [status, setStatus] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    first_name: Yup.string().required("Required"),
    password1: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        "Password must contain a number and a symbol"
      )
      .required("Required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      password1: "",
      password2: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signup(
        values.email,
        values.first_name,
        values.password1,
        values.password2
      );
      setStatus(true);
    },
  });

  if (status) {
    return <Navigate to={"../"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-600"
            >
              Company Name
            </label>
            <input
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="first_name"
              placeholder="Company name ..."
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="text-red-500">{formik.errors.first_name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email address
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="email"
              placeholder="name@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password1"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              name="password1"
              value={formik.values.password1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="password1"
              placeholder="Password ..."
            />
            {formik.touched.password1 && formik.errors.password1 ? (
              <div className="text-red-500">{formik.errors.password1}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-600"
            >
              Re-enter Password
            </label>
            <input
              name="password2"
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
              id="password2"
              placeholder="Re-enter Password..."
            />
            {formik.touched.password2 && formik.errors.password2 ? (
              <div className="text-red-500">{formik.errors.password2}</div>
            ) : null}
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary  bg-blue-600 hover-bg-blue-800 rounded-lg"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Signup
            </button>
          </div>
        </form>
        <p className="mt-4 text-center font-medium">
          Already have an account?{" "}
          <Link to={"../login/"} className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(null, { signup })(Signup);
