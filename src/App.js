import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/main.scss";

// COMPONENTS
import About from "./components/routes/public/About";
import Navigation from "./components/routes/public/Navigation";
import PrivateNavigation from "./components/routes/private/PrivateNavigation";
import GameHub from "./components/routes/private/GameHub";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Landing from "./components/routes/public/Landing";
import Login from "./components/routes/public/Login";
import Dashboard from "./components/routes/private/Dashboard";
import Register from "./components/routes/public/Register";

function App() {
  const [user, setUser] = useState(false);
  const [about, setAbout] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("name")) {
      setUser(true);
    }
  }, []);

  const toggleAbout = () => {
    setAbout(!about);
  };

  return (
    <div className="App">
      {about ? <About toggleAbout={toggleAbout} /> : null}
      <Router>
        {user ? <PrivateNavigation setUser={setUser} /> : <Navigation />}
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Landing toggleAbout={toggleAbout} />}
          />
          <Route
            exact
            path="/login"
            component={() => <Login setUser={setUser} />}
          />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/dashboard"
            component={() => (
              <ProtectedRoute>
                <Dashboard about={about} toggleAbout={toggleAbout} />
              </ProtectedRoute>
            )}
          />
          <Route
            exact
            path="/game"
            component={() => (
              <ProtectedRoute>
                <GameHub />
              </ProtectedRoute>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
