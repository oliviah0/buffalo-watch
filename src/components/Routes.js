import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
// import HomeContainer from "../containers/HomeContainer";
import Stock from "./Stock";
import Search from "./Search";
// import Home from "./Home";
import Home from "./Home2";


class Routes extends Component {

  render() {

    return (

      <div className="container">
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/stock/:id" render={(props) => <Stock {...props} />} />
          <Route exact path="/search/:searchterm" render={(props) => <Search {...props} />} />
          <Redirect to="/" />
        </Switch>
      </div>

    );
  }

}

export default Routes;