import React from "react";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./pages/home";
import Tracker from "./pages/tracker";
import Forum from "./pages/forum";
import About from "./pages/about";
import Support from "./pages/support";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import FourOFour from "./pages/FourOFour";

// Options for the alerts
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

function App() {
  return (
    <Router>
      <Provider template={AlertTemplate} {...alertOptions}>
        <NavBar />
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <Home />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/tracker"}>
            <Tracker />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/forum"}>
            <Forum />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/about"}>
            <About />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/support"}>
            <Support />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/login"}>
            <Login />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/register"}>
            <Register />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/profile"}>
            <Profile />
          </Route>
          <Route component={FourOFour} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
