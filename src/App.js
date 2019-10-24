import React from 'react';
import ReviewListCard from './components/review-list-card/index'
import Navbar from './components/navbar/index'
import 'antd/dist/antd.css';
// import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">

      <header className="App-header">
        <Navbar search={true} />
        <h1>xintern-ui</h1>
      </header>
    </div>
  );
}

export default App;
