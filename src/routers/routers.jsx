import { useState, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile';
import Cryptos from '../components/Cryptos';
import About from '../components/About';
import Favorites from '../components/Favorites';
import CryptoNews from '../components/CryptoNews';
import CryptoDetail from '../components/CryptoDetail';

import { signInWithGoogle, signOut } from '../firebase';
import '../styles/Routers.css';

export default function Routers() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const signedInUser = localStorage.getItem('isSignedIn');
    setIsSignedIn(signedInUser);
  }, []);

  const handleSignIn = () => {
    signInWithGoogle();
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', true);
  };

  const handleSignOut = () => {
    signOut();
    setIsSignedIn(false);
    localStorage.setItem('isSignedIn', false);
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
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/cryptos" activeClassName="active">
              Cryptos
            </NavLink>
          </li>

          <li>
            <NavLink to="/favorites" activeClassName="active">
              Favorites
            </NavLink>
          </li>

          <li>
            <NavLink to="/news" activeClassName="active">
              News
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
                <NavLink to="/" activeClassName="active" onClick={handleSignOut}>
                  <button type="button" onClick={handleSignOut} className="login-with-google-btn">
                    Sign out
                  </button>
                </NavLink>
              </li>
            </>
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

        <Route path="/cryptos/:id">
          <CryptoDetail />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/favorites">
          <Favorites />
        </Route>

        <Route path="/news">
          <CryptoNews />
        </Route>

        <Route path="/cryptos">
          <Cryptos />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}
