import React from 'react';
import Homepage from './layouts/homepage/homepage'
import Navbar from './components/navbar/index'
import 'antd/dist/antd.css';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url('/images/bg.png')`, backgroundRepeat: 'repeat' }}>
      <Navbar search={false} />
      <Homepage />
    </div>
  );
}

export default App;
