import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Connect from './components/pages/Connect';
import Token from './components/pages/Token';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Details from './components/pages/Details';

import SearchState from './contexts/Search/SearchState';
import AccessState from './contexts/access/AccessState';
import AlertState from './contexts/alert/AlertState';

const App = () => {
  return (
    <AccessState>
    <SearchState>
    <AlertState>
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/token' component={Token} />
            <Route exact path='/connect' component={Connect} />
            <Route exact path='/anime/:id' component={Details} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
    </AlertState>
    </SearchState>
    </AccessState>
  );
}

export default App;
