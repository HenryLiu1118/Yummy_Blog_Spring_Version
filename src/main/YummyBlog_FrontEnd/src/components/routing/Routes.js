import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../dashboard/CreateProfile";
import EditProfile from "../dashboard/EditProfile";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import FollowsPosts from "../posts/FollowsPosts";
import PostForm from "../post/PostForm";
import IndiPosts from "../posts/IndiPosts";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <div className="container-fluid compomentmargin">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/indiposts/:id" component={IndiPosts} />
        <PrivateRoute path="/followsposts" component={FollowsPosts} />
        <PrivateRoute exact path="/postform" component={PostForm} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
