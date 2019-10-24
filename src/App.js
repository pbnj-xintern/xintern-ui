import React from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/index'
import 'antd/dist/antd.css';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

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
    <div className="App" style={{backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat'}}>
      <Navbar search={false} />
      <Homepage />
    </div>
  );
}

export default App;
