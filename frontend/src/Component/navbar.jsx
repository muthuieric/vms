import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "../reducer/Actions";

const Navbar = ({ logout, isAuthenticated, user, getUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user details if authenticated
      getUser();
    }
  }, [isAuthenticated, getUser]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary p-2 ">
      <div className="mx-auto flex justify-between  ">
        <div className="text-white text-xl font-bold " to="/visits">
          VMS
        </div>
        <div className="flex items-center">
          <div
            className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center`}
          >
            <ul className="flex flex-col items-center  lg:flex-row absolute lg:relative right-0 bg-primary top-10 lg:top-0 w-full z-40">
              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <>
                      <li className="mb-2">
                        <Link
                          className="text-white no-underline  block md:inline-block md:mr-4 text-lg font-medium bold hover:underline "
                          to="/dashboard/"
                          activeClassName="font-bold"
                          onClick={toggleNavbar}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                          to="/employees/"
                          activeClassName="font-bold"
                          onClick={toggleNavbar}
                        >
                          Employees
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="mb-2">
                    <Link
                      className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/visitors/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Visitors
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/visits/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Visits
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/change/password/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Change Password
                    </Link>
                  </li>
                  <li className="mb-2">
                    <span
                      className="text-white block md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      onClick={() => {
                        logout();
                        toggleNavbar();
                      }}
                      id="logout"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-2">
                    <Link
                      className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-white block  no-underline  md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/login/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      className="text-white block   no-underline md:inline-block md:mr-4 text-lg font-medium bold hover:underline"
                      to="/signup/"
                      activeClassName="font-bold"
                      onClick={toggleNavbar}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            className="lg:hidden text-white"
            type="button"
            onClick={toggleNavbar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    user: state.AuthReducer.user,
  };
};

export default connect(mapStateToProps, { logout, getUser })(Navbar);
