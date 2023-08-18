import React, { useState, useEffect } from 'react'
import './Statistic.css'
import { Icon } from '@iconify-icon/react';
import DailyTrainingResult from './DailyTrainingResult';
import Difficulty from './Difficulty';
import PainDegree from './PainDegree';
import PainRelief from './PainRelief';
import Satisfaction from './Satisfaction';

type afterObj = {
  date: object[];
  surveyType: string;
}

type divideObj = {
  [key:string] : object[];
}


function Tapcontent(props: any) {

  const SurveyObj: divideObj = {
    'painDegree' : [] as object[],
    'difficulty' : [] as object[],
    'satisfaction' : [] as object[],
    'painRelief' : [] as object[],
  }

  props.afterStatic.forEach((el: afterObj) => {
    SurveyObj[el.surveyType] = el.date
  })

  return [ <DailyTrainingResult beforeStatic={props.beforeStatic} emptyBeforeCheck={props.emptyBeforeCheck} />,
   <PainDegree degree={SurveyObj.painDegree} emptyAfterCheck={SurveyObj.painDegree.length !== 0? false : true} />, 
   <PainRelief relief={SurveyObj.painRelief} emptyAfterCheck={SurveyObj.painRelief.length !== 0? false : true} />,
   <Difficulty difficulty={SurveyObj.difficulty} emptyAfterCheck={SurveyObj.difficulty.length !== 0? false : true} />,
   <Satisfaction satisfaction={SurveyObj.satisfaction} emptyAfterCheck={SurveyObj.satisfaction.length !== 0? false : true} /> ][props.selectMenu]
}

function Statistic(props: any) {

  const [selectMenu, setSelectMenu] = useState(0);
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [beforeStatic, setBeforeStatic] = useState([]);
  const [afterStatic, setAfterStatic] = useState([]);
  const [emptyBeforeCheck, setEmptyBeforeCheck] = useState(false);

  useEffect(() => {
    if (dropDownVisibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }

  }, [dropDownVisibility])

  useEffect(()=> {

    if (props.beforeStatic.length === 0) {
      setEmptyBeforeCheck(true);
    } else {
      setEmptyBeforeCheck(false);
    }

    setBeforeStatic(props.beforeStatic);
    setAfterStatic(props.afterStatic);

  }, [props.beforeStatic, props.afterStatic])

  const menuList = ["운동 전 설문 통계", "통증 정도", "통증 완화도", "운동 난이도", "운동 만족도"]

  const StaticSelectDropdown = <div className={`static-components-dropdown ${dropDownVisibility? 'slide-fade-in-dropdown': 'slide-fade-out-dropdown'}`}>
    <ul>
      <div className='Staticselect-option' onClick={() => {setSelectMenu(0)}}>
        <li id='static-li-0'>운동 전 설문 통계</li>
      </div>
      <div className='Staticselect-line'/>
      <div className='Staticselect-option' onClick={() => {setSelectMenu(1)}}>
        <li id='static-li-1'>통증 정도</li>
      </div>
      <div className='Staticselect-line' />
      <div className='Staticselect-option' onClick={() => {setSelectMenu(2)}}>
        <li id='static-li-2'>통증 완화도</li>
      </div>
      <div className='Staticselect-line' />
      <div className='Staticselect-option' onClick={() => {setSelectMenu(3)}}>
        <li id='static-li-3'>운동 난이도</li>
      </div>
      <div className='Staticselect-line' />
      <div className='Staticselect-option' onClick={() => {setSelectMenu(4)}}>
        <li id='static-li-4'>운동 만족도</li>
      </div>
    </ul>
  </div>


  const innerHtmlStructure = <React.Fragment>
    <div className='row charbox-header'>
      <p className='charbox-title'>통증 통계</p>
      <div className='col wrap-selector'>
        <div className='row charbox-selector' onClick={() => {setDropDownVisibility(true)}}>
          <p className='charbox-selector-name'>{menuList[selectMenu]} {dropDownVisibility? <Icon icon="mdi-light:chevron-up"/> : <Icon icon="mdi-light:chevron-down"/>}</p>
        </div>
        { visibilityAnimation && StaticSelectDropdown}
      </div>
    </div>
    <div className='row chartbox-body'>
      <Tapcontent selectMenu={selectMenu} beforeStatic={beforeStatic} afterStatic={afterStatic} emptyBeforeCheck={emptyBeforeCheck} />
    </div>
  </React.Fragment>

  return (
    <div className='col chartBox' style={{top: props.type? '0rem' : '', marginBottom: props.type === 'y'? '0rem' : ''}} onClick={() => {if (dropDownVisibility) {setDropDownVisibility(false)}}}>
      {!props.existTodolist? innerHtmlStructure : <p style={{fontSize: '2.5rem'}}>아직 운동 활동 기록이 없어요.</p>}
    </div>
  )
}

export default Statistic