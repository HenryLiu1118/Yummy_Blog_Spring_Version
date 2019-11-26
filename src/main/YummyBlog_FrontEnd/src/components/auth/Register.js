import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="register-form">
        <form
          className="px-3 py-4 form_border center_div"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="text-center pt-3 font_color">Sign Up</h1>
          <p className="text-center text-secondary">Create Your Account.</p>
          <div className="container">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user mr-1" />
                  </span>
                </div>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  required
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-envelope-o" />
                  </span>
                </div>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  value={email}
                  required
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock mr-1" />
                  </span>
                </div>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  minLength="6"
                  required
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            {}
            <div className="form-group">
              <label>Re-enter Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-check-circle" />
                  </span>
                </div>
                <input
                  className="form-control"
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Re-enter password"
                  value={password2}
                  required
                  minLength="6"
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="text-center pt-5">
              <input
                type="submit"
                className="btn background_color text-light btn-lg"
                value="Sign Up"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
