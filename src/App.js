import React from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/index'
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import BrowseCompanies from './layouts/browse-companies/browse-companies';
import Review from './components/review-view/review'

function App() {
  return (
    <div className="App" >
      <Navbar search={false} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/companies" component={BrowseCompanies} />
        <Route path="/review/1" component={Review} />
      </Switch>
    </div>
  );
}

export default App;

// style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}