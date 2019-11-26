import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Yummy Blog</h1>
          <p className="lead">
            Create a profile and share delicious with others.
          </p>
          <div>
            <Link
              to="/register"
              className="btn background_color button_hover text-light btn-lg btn-block"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn background_color button_hover text-light btn-lg btn-block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
