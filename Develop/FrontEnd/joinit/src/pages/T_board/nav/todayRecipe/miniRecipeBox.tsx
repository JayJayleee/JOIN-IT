import React from 'react';
import './miniRecipeBox.css';

type RecipeProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function RecipeBoxDetail(props: any) {

  return (
    <div className='row recipe-box-detail'>
      <div>
        <img src="patient_image.png" alt="patient" />
      </div>
      <div className='col'>
        <p>{props.title}</p>
        <p>{props.userId}</p>
        <p>{props.id}</p>
      </div>
    </div>
  )
}


function MiniRecipeBox(props: any) {
  return <div className='col mini-recipe-box'>
    {props.posts.forEach((data: RecipeProps) => {
      <RecipeBoxDetail userId={data.userId} id={data.id} title={data.title} body={data.body} />
    })}
  </div>
}

export default MiniRecipeBox