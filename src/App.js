import React from 'react';
import ReviewListCard from './components/review-list-card/index'
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>xintern-ui</h1>
        <ReviewListCard reviewId=""  />
      </header>
    </div>
  );
}

export default App;
