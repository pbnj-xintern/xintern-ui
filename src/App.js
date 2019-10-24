import React from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/index'
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import BrowseCompanies from './layouts/browse-companies/browse-companies';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}>
      <Navbar search={false} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/companies" component={BrowseCompanies} />
      </Switch>
    </div>
  );
}

export default App;
