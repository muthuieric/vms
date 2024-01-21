import React, { useState } from "react";
import { connect } from "react-redux";
import { closeAlert } from "../reducer/Actions";

const Alert = (props) => {
  const [classAlert, setClassAlert] = useState("alert");

  const handleClose = () => {
    setClassAlert("alert hidden");
    props.closeAlert();
  };

  return (
    <div
      className={`w-full max-w-sm ${classAlert}`}
    >
      <div
        className="absolute px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md"
        role="alert"
      >
        <div className="flex ">
          <div className="ml-3">
            <p className="text-sm font-medium ">{props.message}</p>
          </div>
          <div className="px-6">
            <svg
              onClick={handleClose}
              className="w-5 h-5 text-white cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.348 5.636l-1.414-1.414L10 8.586 6.066 4.65 4.65 6.065 8.585 10l-3.95 3.95 1.415 1.415L10 11.414l3.934 3.934 1.414-1.415L11.415 10l3.933-3.934z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { closeAlert })(Alert);
