import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import "./assets/main.css";
import WebSocketTest from "./WebSocketTest";
import Portfolio from "./components/Portfolio";
import IndividualStock from "./components/IndividualStock";
import Watchlist from "./components/Watchlist";
import Feed from "./components/Feed/index";
import { dashboard, getMarketClock } from "./store/stock";
import IsMarketOpen from "./components/Notifications/IsMarketOpen";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getMarketClock());
      setLoaded(true);
    })();
  }, []);

  //

  if (!loaded) {
    return null;
  }

  return (
    loaded && (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/portfolio" exact={true}>
            {/* <WebSocketTest /> */}
            <div>
              <h1 className="text-center pt-8">Portfolio</h1>
              <div className="flex flex-row-reverse">
                <div className="m-36">
                  <Feed />
                </div>
              </div>
              <Portfolio />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/watchlist/:userId" exact={true}>
            <Watchlist />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <div>
              <IsMarketOpen />
              <Dashboard />
            </div>
          </ProtectedRoute>
          <ProtectedRoute path="/stock/:ticker" exact={true}>
            <IndividualStock />
          </ProtectedRoute>
          <Route path="/dashboard" exact={true}></Route>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
