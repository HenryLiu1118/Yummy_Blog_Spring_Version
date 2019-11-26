import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    location: "",
    favorites: "",
    bio: ""
  });

  const { location, favorites, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <div className="create-profile-form">
        <form
          className="px-3 py-4 bg-light center_div"
          onSubmit={e => onSubmit(e)}
        >
          <h1 className="pt-3 font_color">Last Step, Create Your Profile</h1>
          <p className=" pl-4 pt-1 pb-2 text-secondary">
            Add more information to you profile.
          </p>
          <hr />
          <div className="container">
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
                placeholder="Tell us a little more about yourself"
                value={bio}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="text-center pt-4">
              <input
                type="submit"
                className="btn background_color text-light btn-lg"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
