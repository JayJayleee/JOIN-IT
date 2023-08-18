import React, {useState, useEffect} from 'react'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type difficultyObject = {
  day: string;
  value: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Difficulty(props: any) {

  const [label, setLabel] = useState<String[]>([]);
  const [diff, setDiff] = useState<number[]>([]);

  useEffect(() => {
    if (props.emptyAfterCheck === false) {
      const l: string[] = [];
      const a: number[] = [];
      props.difficulty.forEach((el: difficultyObject) => {
        l.push(el.day.substring(5,10).replaceAll('-','.'))
        a.push(el.value)
      })
      
      setLabel(l);
      setDiff(a);
    } 
  },[props.difficulty, props.emptyAfterCheck])

  const data = {
    labels: label,
    datasets: [
      {
        label: '운동 난이도',
        data: diff,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 10,
        },
      },
    }

  const LineStructure = <Line options={options} data={data}/>

  return (<React.Fragment>
    {props.emptyAfterCheck === false? LineStructure : <p style={{fontSize: '2rem'}}>통계 데이터가 없습니다.</p>}
  </React.Fragment>
  )
}

export default Difficulty