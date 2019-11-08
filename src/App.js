import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContextProvider } from './state/auth-state'
import Navbar from './components/navbar/navbar'
import CreateReview from './layouts/create-review/create-review'

// CSS
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './App.css';

// LAYOUTS
import Homepage from './layouts/homepage/homepage'
import BrowseCompanies from './layouts/browse-companies/browse-companies';
import Review from './components/review-view/review'
import Login from './layouts/login/login';
import Signup from './layouts/signup/signup';
import CompanyReviews from './layouts/company-reviews/company-reviews';

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
          <Route path="/review/:reviewId" component={Review} />
          <Route path="/company/:companyId/review/create" component={CreateReview} />
          <Route path="/review/create" component={CreateReview} />
          <Route path="/company/:companyId/reviews" component={CompanyReviews} />
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

export default App;