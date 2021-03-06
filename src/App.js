import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContextProvider } from './state/auth-state'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import CreateReview from './layouts/create-review/create-review'

import Userprofile from './layouts/user-profile/user-profile'

import CreateReviewButton from './components/create-review-button/create-review-button'


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
import SearchRes from './layouts/search-res/SearchRes';
import BrowsePositions from './layouts/browse-positions/browse-positions';
import ReviewsOfPosition from './layouts/position-reviews/reviews-of-position'

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

          <Route path="/profile/:username" component={Userprofile} />
          <Route path="/review/:reviewId/details" component={Review} />
          <Route path="/company/:companyId/review/create" component={CreateReview} />
          <Route path="/review/create" component={CreateReview} />
          <Route path="/company/:companyId/reviews" component={CompanyReviews} />
          <Route path="/search/:term" component={SearchRes} />
          <Route path="/all-positions/" component={BrowsePositions} />
          <Route path="/positions/:position_name" component={ReviewsOfPosition} />

        </Switch>
        <CreateReviewButton />
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;