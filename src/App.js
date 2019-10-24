import React from 'react';
import ReviewListCard from './components/review-list-card/index'
// import logo from './logo.svg';
import './App.css';

function App() {
  let reviewCardProps = {
    company: {
      name: "test-company",
      logo: "https://lh4.ggpht.com/vdK_CsMSsJoYvJpYgaj91fiJ1T8rnSHHbXL0Em378kQaaf_BGyvUek2aU9z2qbxJCAFV=w300"
    },
    content: "test-content loruem upsum",
    user: {
      username: "test-username"
    },
    createdAt:"10/23/2019",
    rating: {
      culture: 1,
      mentorship: 2,
      impact: 3,
      interview: 4
    },
    upvotes: [],
    downvotes: [],
    comments: []
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>xintern-ui</h1>
        <ReviewListCard {...reviewCardProps} />
      </header>
    </div>
  );
}

export default App;
