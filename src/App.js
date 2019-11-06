import React from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/navbar'
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import BrowseCompanies from './layouts/browse-companies/browse-companies';
import Login from './layouts/login/login';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const SET_AGE = "SET_AGE";

const PrivateRoute = ({ component: Component, path, otherProps }) => (
  <Route
    {...{ path }}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} {...otherProps} />
      ) : (
          <Redirect
            push to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      )
    }
  />
);
const UnAuthRoute = ({ component: Component, path, otherProps }) => (
  <Route
    {...{ path }}
    render={props =>
      (!isAuthenticated() ? (
        <Component {...props} {...otherProps} />
      ) : (
          <Redirect
            push to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      )
    }
  />
);

function App() {

  const initialState = {
    token: localStorage.getItem('token')
  }

  const LOGIN = 'LOGIN'
  const LOGOUT = 'LOGOUT'

  function authReducer(state, action) {
    switch (action.type) {
      case LOGIN:
        return {
          token: action.token,
        };
      case LOGOUT:
        return {
          token: null
        };
      default:
        return initialState;
    }
  }

  let auth = isAuthenticated()
  
  const [user, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <div className="App" >
      <Navbar isAuth={auth} search={false} />
      <Switch >
        <Route exact path="/" component={Homepage} />
        <Route path="/companies" component={BrowseCompanies} />
        <UnAuthRoute path="/login" component={Login} />
        <PrivateRoute path="/me" component={<div>oioi</div>} />
      </Switch>
    </div>
  );
}

export default App;

// style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}