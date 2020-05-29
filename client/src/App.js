import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Signin";
import Add from "./components/Signup";
import Home from "./components/home";
import NavbarM from "./components/Navmenu";
import Post from "./components/post";
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Admin from "./components/Admin/Admin"
import SharedPost from "./components/posts/sharedpost"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <NavbarM />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Add />
          </Route>
          <Route exact path="/dashboard">
            <Home/>
            <Post />
          </Route>
          <Route path="/home" exact component={Join} />
          <Route path="/chat" component={Chat} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/listusers" component={SharedPost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
