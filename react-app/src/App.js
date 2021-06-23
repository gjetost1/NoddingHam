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
import Feed from "./components/Feed";
import IndividualStock from "./components/IndividualStock";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
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
          <WebSocketTest />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/individualstock" exact={true}>
          <IndividualStock />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          {/* <Portfolio /> this is a comment */}
          <Feed />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
