import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    location,
    bio
  },
  myprofile
}) => {
  if (!myprofile) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="card postdetailcard mb-2 px-2 py-2">
        <div className="card-title">Name: {" "}<Link to={`/profile/${_id}`} >{name}</Link></div>
        <div className="card-text">Location: {location}</div>
        <div className="card-text">
          {name}'s Bio: {bio}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  myprofile: state.profile.myprofile
});

export default connect(mapStateToProps)(ProfileItem);
