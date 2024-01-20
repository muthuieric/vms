import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { emailVerification } from "../reducer/Actions";

const EmailVerification = ({ emailVerification }) => {
  const [status, setStatus] = useState(false);
  const { key } = useParams();

  const handlingSubmit = (e) => {
    e.preventDefault();
    emailVerification(key);
    setStatus(true);
  };

  if (status) {
    return <Navigate to={"../login/"}></Navigate>;
  }

  return (
    <div className="container mx-auto mt-12">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Activate Account</h2>
        <h5 className="text-center mb-4">
          Click the below link to activate your account
        </h5>
        <form onSubmit={(e) => handlingSubmit(e)}>
          <div className="d-grid gap-2">
            <button className="btn btn-primary rounded-lg bg-blue-600 hover-bg-blue-800" type="submit">
              Activate Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { emailVerification })(EmailVerification);
