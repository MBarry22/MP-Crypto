import { useState, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile';
import Cryptos from '../components/Cryptos';
import About from '../components/About';
import Favorites from '../components/Favorites';
import CryptoNews from '../components/CryptoNews';
import CryptoDetail from '../components/CryptoDetail';
import EditProfile from '../components/EditProfile';

import MPCrypto from '../assets/images/MPCrypto.png';

import { signInWithGoogle, signOut } from '../firebase';
import '../styles/Routers.css';

export default function Routers() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const signedInUser = localStorage.getItem('email');
    setIsSignedIn(signedInUser);
  }, []);

  const handleSignIn = () => {
    try {
      const signedInUser = signInWithGoogle();
      if (signedInUser) {
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', true);
        window.location.reload(true);
      } else {
        setIsSignedIn(false);
        localStorage.setItem('isSignedIn', false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    try {
      signOut();
      setIsSignedIn(false);
      localStorage.setItem('isSignedIn', false);
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar__left">
          <NavLink to="/" className="navbar__link">
          <img src={MPCrypto} alt="logo" className="navbar__logo" />
          </NavLink>
          
        </div>
        <div className="navbar__right">
          <ul>
            <li className="navbar__item">
              <NavLink to="/about" activeClassName="active" className="navbar__link">
                About
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/cryptos" activeClassName="active" className="navbar__link">
                Cryptos
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/favorites" activeClassName="active" className="navbar__link">
                Favorites
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/news" activeClassName="active" className="navbar__link">
                News
              </NavLink>
            </li>
            {isSignedIn && (
              <>
                <li className="navbar__item">
                  <NavLink to="/profile" activeClassName="active" className="navbar__link">
                    Profile
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink to="/" activeClassName="active" onClick={handleSignOut} className="navbar__link">
                    Sign out
                  </NavLink>
                </li>
              </>
            )}
            {!isSignedIn && (
              <>
                <NavLink to="/" activeClassName="active" onClick={handleSignIn} className="navbar__link">
                  <li className="navbar__item">Sign in</li>
                </NavLink>
                <li className="navbar__item">
                </li>
              </>
            )}
          </ul>
        </div>
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

        <Route path="/edit-profile">
          <EditProfile />
        </Route>
      </Switch>
    </Router>
  );
}

