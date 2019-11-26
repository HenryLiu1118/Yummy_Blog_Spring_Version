import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import {
  getProfileById,
  addFollows,
  removeFollows
} from "../../actions/profile";

const Profile = ({
  getProfileById,
  addFollows,
  removeFollows,
  match,
  history,
  profile: { myprofile, profile, loading }
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  if (!myprofile) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="dashboard-other">
            <div className="container center_div">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h4 className="card-title">
                      {profile.user.name}{" "}
                      {myprofile &&
                        myprofile.user._id !== profile.user._id &&
                        (myprofile.follows
                          .map(item => item.user.toString())
                          .includes(profile.user._id) ? (
                          <button
                            className="follow"
                            onClick={() => removeFollows(profile.user._id)}
                          >
                            <span className="msg-follow btn-sm">
                              <i className="fa fa-heart-o" /> UnFollow
                            </span>
                          </button>
                        ) : (
                          <button
                            className="follow"
                            onClick={() => addFollows(profile.user._id)}
                          >
                            <span className="msg-follow btn-sm">
                              <i className="fa fa-heart-o" /> Follow
                            </span>
                          </button>
                        ))}
                      <i className="fa fa-id-card-o float-right font_color" />
                    </h4>
                  </span>
                  <div>
                    <span>
                      <i className="fa fa-map-marker" />
                    </span>
                    <span className=" pl-4 pt-1 pb-2 text-secondary">
                      {profile.location}
                    </span>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col bg-light">
                        <h5 className="font_color">Biograph</h5>
                        <p>{profile.bio}</p>
                      </div>
                      <div className="col bg-light">
                        <div>
                          <h5 className="font_color">Email:</h5>
                          <p className="pl-5">{profile.user.email}</p>
                        </div>
                        <div>
                          <h5 className="font_color">Interests:</h5>
                          {profile.favorites.map((item, index) => (
                            <li key={index} className="pl-5">
                              {item}
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right py-2 pr-3">
                  <button
                    type="button"
                    className="btn background_color text-light btn-xs"
                    onClick={() => {
                      history.push(`/indiposts/${profile.user._id}`);
                    }}
                  >
                    View Posts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateTpProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateTpProps,
  { getProfileById, addFollows, removeFollows }
)(Profile);
