import React from 'react'
import "./App.css"

import Nav from './Components/Nav/Nav'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <div className='navdiv'>
        <Nav />
      </div>
      <Home />
    </div>
  )
}

export default App
