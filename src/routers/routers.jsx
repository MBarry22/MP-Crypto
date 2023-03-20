import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import '../styles/Routers.css';

export default function Routers() {
  return (
    <Router>
      <ul className="navlinks">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {/* Add more NavLink items here */}
      </ul>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        {/* Add more Route items here */}
      </Switch>
    </Router>
  );
}
