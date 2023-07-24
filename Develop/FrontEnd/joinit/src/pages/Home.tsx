import React from 'react';
import logo from '../logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <h1>Home</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <Link to="/about">About 페이지로 이동하기</Link>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;