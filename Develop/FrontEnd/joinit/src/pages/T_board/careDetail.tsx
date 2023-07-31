import React from 'react';
import './careDetail.css';
import Calendar from './careDetail/calendar';
import CareStat from './careDetail/careStat';
import RecipeList from './careDetail/recipeList';


function CareDetail() {
  return (
    <div>
      <h1>CareDetail</h1>
      <div>
        <Calendar />
      </div>
      <div>
        <div>
          <h2>환자 정보 출력 칸</h2>
        </div>
        <RecipeList />
        <CareStat />
      </div>
    </div>
  )
}

export default CareDetail