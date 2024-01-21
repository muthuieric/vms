import React from "react";
import { connect } from "react-redux";
import { refresh } from "../reducer/Actions";

const Home = ({ refresh }) => {
  return (
    <div className="container mx-auto mt-12">
      <div className="p-5 bg-light rounded-lg shadow-md">
        <div className="py-5">
          <h1 className="text-4xl font-bold">Welcome to VMS</h1>
          <p className="mt-4 text-lg">
            Say goodbye to paper logs and manual check-ins. VMS simplifies
            visitor registration and check-in/check-out making your premises
            safer and more organized.
          </p>     
        </div>
      </div>
    </div>
  );
};

export default connect(null, { refresh })(Home);
