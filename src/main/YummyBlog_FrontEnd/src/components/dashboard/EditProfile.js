import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { myprofile, loading },
  auth: { user },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    location: "",
    favorites: "",
    bio: ""
  });

  useEffect(() => {
    getCurrentProfile();
    if (myprofile !== null) {
      setFormData({
        location: !loading && myprofile.location ? myprofile.location : "",
        favorites:
          !loading && myprofile.favorites ? myprofile.favorites.join(",") : "",
        bio: !loading && myprofile.bio ? myprofile.bio : ""
      });
    }
  }, [loading, getCurrentProfile]);

  const { location, favorites, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <div className="edit-profile-form">
        <form
          className="px-3 bg-light center_div"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="pt-3 font_color">Update Your Profile</h1>
          <hr />
          <div className="container">
            <p>Name: {user && user.name}</p>
            <p>Email: {user && user.email}</p>
            <div className="form-group">
              <label>Location</label>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="City, State"
                value={location}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Types of Food You Like</label>
              <input
                className="form-control"
                type="text"
                name="favorites"
                placeholder="Chinese, Japanese, ..."
                value={favorites}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Biography</label>
              <textarea
                className="form-control"
                type="message"
                name="bio"
                rows="5"
                placeholder="Tell us more about yourself"
                value={bio}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="text-center pt-4">
              <input
                type="submit"
                className="btn background_color text-light btn-lg"
                value="Update"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
