import React from 'react';
import './recipeList.css';
import TCompleteCoach from './recipeList/TCompleteCoach';
import TNotCompleteCoach from './recipeList/TNotCompleteCoach';
import TCompleteMeet from './recipeList/TCompleteMeet';
import TNotCompleteMeet from './recipeList/TNotCompleteMeet';
import PCompleteCoach from './recipeList/PCompleteCoach';
import PNotCompleteCoach from './recipeList/PNotCompleteCoach';
import PCompleteMeet from './recipeList/PCompleteMeet';
import PNotCompleteMeet from './recipeList/PNotCompleteMeet';
import FNotCompleteCoach from './recipeList/FNotCompleteCoach';
import FNotCompleteMeet from './recipeList/FNotCompleteMeet';

function RecipeList() {
  return (
    <div>
      <h1>recipeList</h1>
      <TCompleteCoach />
      <TNotCompleteCoach />
      <TCompleteMeet />
      <TNotCompleteMeet />
      <PCompleteCoach />
      <PNotCompleteCoach />
      <PCompleteMeet />
      <PNotCompleteMeet />
      <FNotCompleteCoach />
      <FNotCompleteMeet />
    </div>
  )
}

export default RecipeList