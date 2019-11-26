import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const guestLinks = (
    <Fragment>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown font-weight-bold">
            <a
              href="/"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              ACCOUNT
            </a>
            <div className="dropdown-menu navbar_dropitem font-weight-normal">
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
              <div className="dropdown-divider" />
              <Link to="/register" className="dropdown-item">
                Register
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item font-weight-bold">
            <Link to="/" className="nav-link mx-3">
              HOME
            </Link>
          </li>
          <li className="nav-item font-weight-bold">
            <Link to="/posts" className="nav-link mx-3">
              POSTS
            </Link>
          </li>
          <li className="nav-item font-weight-bold">
            <Link to="/postform" className="nav-link mx-3">
              NEW POST
            </Link>
          </li>
          <li className="nav-item font-weight-bold">
            <Link to="/profiles" className="nav-link mx-3">
              MY FOLLOWS
            </Link>
          </li>
          <li className="nav-item dropdown font-weight-bold">
            <a
              href="/"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              ACCOUNT
            </a>
            <div className="dropdown-menu navbar_dropitem font-weight-normal">
              <Link to="/edit-profile" className="dropdown-item">
                Edit Profile
              </Link>
              <Link to="/" onClick={logout} className="dropdown-item">
                Logout
              </Link>
              <div className="dropdown-divider" />
              {user && (
                <Fragment>
                  <Link to={`/indiposts/${user._id}`} className="dropdown-item">
                    View My Posts
                  </Link>
                  <Link to="/followsposts" className="dropdown-item">
                    View Follows' Posts
                  </Link>
                </Fragment>
              )}
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-sm fixed-top navbar-dark background_color">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">
          YUMMY BLOG
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
