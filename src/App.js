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
import Footer from "./components/footer";

// Options for the alerts
const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Provider template={AlertTemplate} {...alertOptions}>
        <div id={"mainContainer"}>
          <div id={"main"}>
            <NavBar />
            <Switch>
              <Route exact path={"/"}>
                <Home />
              </Route>
              <Route path={"/tracker"}>
                <Tracker />
              </Route>
              <Route path={"/forum"}>
                <Forum />
              </Route>
              <Route path={"/about"}>
                <About />
              </Route>
              <Route path={"/support"}>
                <Support />
              </Route>
              <Route path={"/login"}>
                <Login />
              </Route>
              <Route path={"/register"}>
                <Register />
              </Route>
              <Route path={"/profile"}>
                <Profile />
              </Route>
              <Route component={FourOFour} />
            </Switch>
          </div>
        </div>
        <Footer />
      </Provider>
    </Router>
  );
}

export default App;
