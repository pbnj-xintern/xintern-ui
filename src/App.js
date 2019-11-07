import React, { useContext } from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/navbar'
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import BrowseCompanies from './layouts/browse-companies/browse-companies';
import Review from './components/review-view/review'
import Login from './layouts/login/login';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './state/auth-state'

toast.configure()

function App() {

  const PrivateRoute = ({ component: Component, path, otherProps }) => (
    <Route
      {...{ path }}
      render={props =>
        (localStorage.getItem('token') !== null ? (
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
        (!localStorage.getItem('token') !== null ? (
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

  return (
    <AuthContextProvider >
      <div className="App" >
        <Navbar search={false} />
        <Switch >
          <Route exact path="/" component={Homepage} />
          <Route path="/companies" component={BrowseCompanies} />
          <Route path="/review/:reviewId" component={Review} />
          <UnAuthRoute path="/login" component={Login} />
          <PrivateRoute path="/me" component={<div><h1>HEY HEY YOU YOU</h1></div>} />
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

export default App;

// style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}