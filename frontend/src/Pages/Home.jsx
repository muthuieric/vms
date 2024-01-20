import React from "react";
import { connect } from "react-redux";
import { refresh } from "../reducer/Actions";

const Home = ({ refresh }) => {
  return (
    <div className="container mx-auto mt-12">
      <div className="p-5 bg-light rounded-lg shadow-md">
        <div className="py-5">
          <h1 className="text-4xl font-bold">Welcome to mywebsite.co.id</h1>
          <p className="mt-4 text-lg">
            Using a series of utilities, you can create this jumbotron, just like
            the one in previous versions of Bootstrap. Check out the examples
            below for how you can remix and restyle it to your liking.
          </p>
          <button
            className="mt-6 btn btn-primary btn-lg bg-blue-600 hover-bg-blue-800 "
            type="button"
            onClick={refresh}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { refresh })(Home);
