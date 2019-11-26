import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { myprofile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && myprofile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="dashboard">
        <div className="container center_div">
          <div className="card">
            <div className="card-body">
              <span>
                <h4 className="card-title">
                  Welcome, {user && user.name}
                  <i className="fa fa-id-card-o float-right font_color" />
                </h4>
              </span>
              {myprofile === null ? (
                <Fragment>
                  <p>You have not yet setup a profile, please add some info</p>
                  <Link
                    to="/create-profile"
                    className="btn background_color button_hover text-light btn-lg btn-block"
                  >
                    Create Profile
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <div>
                    <span>
                      <i className="fa fa-map-marker" />
                    </span>
                    <span className=" pl-4 pt-1 pb-2 text-secondary">
                      {myprofile.location}
                    </span>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col bg-light">
                        <h5 className="font_color">Biograph</h5>
                        <p>{myprofile.bio}</p>
                      </div>
                      <div className="col bg-light">
                        <div>
                          <h5 className="font_color">Email:</h5>
                          <p className="pl-5">{user && user.email}</p>
                        </div>
                        <div>
                          <h5 className="font_color">Interests:</h5>
                          {myprofile.favorites.map((item, index) => (
                            <li key={index} className="pl-5">
                              {item}
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <div className="text-right py-2 pr-3">
              <button
                type="delete"
                className="btn-danger text-light btn-xs"
                onClick={() => deleteAccount()}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
