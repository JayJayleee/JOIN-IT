import React from 'react';
import './myCareList.css';
import CompleteCare from './myCareList/completeCare';
import NotCompleteCare from './myCareList/notCompleteCare';


function MyCareList() {
  return (
    <div>
      <h1>MyCareList</h1>
      <CompleteCare />
      <NotCompleteCare />
    </div>
  )
}

export default MyCareList