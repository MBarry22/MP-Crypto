import { useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile';
import Cryptos from '../components/Cryptos';

import { signInWithGoogle, signOut } from '../firebase';
import '../styles/Routers.css';

export default function Routers() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    signInWithGoogle();
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    signOut();
    setIsSignedIn(false);
  };

  return (
    <Router>
      <nav>
        <ul className="navlinks">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/cryptos" activeClassName="active">
              Cryptos
            </NavLink>
          </li>
          
          {isSignedIn ? (
            <>
            <li>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </li>
            <li>
              <button type="button" onClick={handleSignOut} className="login-with-google-btn">
                Sign out
              </button>
            </li></>
          ) : (
            <li>
              <button type="button" onClick={handleSignIn} className="login-with-google-btn">
                Sign in with Google
              </button>
            </li>
          )}
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/cryptos">
          <Cryptos />
        </Route>
      </Switch>
    </Router>
  );
}
