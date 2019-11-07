import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContextProvider } from './state/auth-state'
import Navbar from './components/navbar/navbar'

// CSS
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './App.css';

// LAYOUTS
import Homepage from './layouts/homepage/homepage'
import BrowseCompanies from './layouts/browse-companies/browse-companies';
import Login from './layouts/login/login';
import Signup from './layouts/signup/signup';

toast.configure({
  position: toast.POSITION.TOP_CENTER,
})

function App() {

  return (
    <AuthContextProvider >
      <div className="App" >
        <Navbar search={false} />
        <Switch >
          <Route exact path="/" component={Homepage} />
          <Route path="/companies" component={BrowseCompanies} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={Homepage} />
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

export default App;

// style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}