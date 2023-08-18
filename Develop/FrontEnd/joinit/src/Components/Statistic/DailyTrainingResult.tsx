import React, { useState, useEffect } from 'react'
import {Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController,} from 'chart.js';
import { Chart } from 'react-chartjs-2';

type dailyObject = {
  angle: number;
  date: string; 
  rom: number;
  targetAngle: number; 
}


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

function DailyTrainingResult(props: any) {
  const [label, setLabel] = useState<String[]>([]);
  const [angle, setAngle] = useState<number[]>([]);
  const [targetAngle, setTargetAngle] = useState<number[]>([]);

  useEffect(() => {
    if (props.beforeStatic.length !== 0) {
      const l: string[] = [];
      const a: number[] = [];
      const ta: number[] = [];
      props.beforeStatic.forEach((el: dailyObject) => {
        l.push(el.date.substring(5,10).replaceAll('-','.'))
        a.push(el.angle)
        ta.push(el.targetAngle)
      })
      setLabel(l);
      setAngle(a);
      setTargetAngle(ta);
    } 
  },[props.beforeStatic])

  const data = {
    labels: label,
    datasets: [
      {
        type: 'line' as const,
        label: '실행 각도',
        data: angle,
        borderColor: 'rgb(253, 214, 22)',
        borderWidth: 3,
        fill: false,
      },
      {
        type: 'bar' as const,
        label: '목표 각도',
        data: targetAngle,
        backgroundColor: 'rgb(88, 134, 122)',
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLable: {
            display: true,
            labelString: 'Date'
          },
          grid: {
            display: false,
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: 100,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          }
        }],
      }
    }
  };

  const ChartStructure = <Chart type='bar' data={data}/>

  return (<React.Fragment>
    {props.emptyBeforeCheck === false? ChartStructure : <p style={{fontSize: '2rem'}}>통계 데이터가 없습니다.</p>}
  </React.Fragment>
  )
}

export default DailyTrainingResult