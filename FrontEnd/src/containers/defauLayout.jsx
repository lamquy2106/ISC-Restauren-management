import React, { Component, Fragment } from "react";
import Header from "./header";
import routes from "./../routes";
import { Switch, Route, Redirect } from "react-router-dom";
import LeftSite from "./leftSite";
import { connect } from "react-redux";
import ActionTypes from "../store/action"


const DefaultLayout = (props) => {
  const {isLogged} = props;
    return (
      <Fragment>
        {/* <Header></Header>
        <LeftSite />
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            ) : null;
          })}
        </Switch>
        <Footer /> */}

        <div>
          <div id="wrapper">
            <LeftSite />
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                <Header />

                <Switch>
                {!isLogged ? <Redirect to="/login" /> :(
                  routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                      />
                    ) : null;
                    })
                )}
                </Switch>
              </div>
              
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(DefaultLayout);
