import React from 'react';
import ReviewListCard from './components/review-list-card/index'
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'white' }}>xintern-ui</h1>
        <ReviewListCard />
      </header>
    </div>
  );
}

export default App;
