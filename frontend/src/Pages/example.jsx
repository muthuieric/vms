import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const example = ({ isAuthenticated }) => {
  // Check if the user is not authenticated, then redirect to the login page
  if (!isAuthenticated && !localStorage.getItem("access")) {
    return <Navigate to={"../login"} />;
  }
  return (
    <div className="container mx-auto mt-12">
      <div className="p-5 bg-light rounded-lg shadow-md">
        <div className="py-5">
          <h1 className="text-4xl font-bold">Example</h1>
          <p className="mt-4 text-lg">
            Using a series of utilities, you can create this jumbotron, just like
            the one in previous versions of Bootstrap. Check out the examples
            below for how you can remix and restyle it to your liking.
          </p>
        
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(example);


