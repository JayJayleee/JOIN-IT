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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type reliefObject = {
  day: string;
  value: number;
}

function PainRelief(props: any) {
  const [label, setLabel] = useState<String[]>([]);
  const [relief, setRelief] = useState<number[]>([]);

  useEffect(() => {
    if (props.emptyAfterCheck === false) {
      const l: string[] = [];
      const a: number[] = [];
      props.relief.forEach((el: reliefObject) => {
        l.push(el.day.substring(5,10).replaceAll('-','.'))
        a.push(el.value)
      })
      
      setLabel(l);
      setRelief(a);
    } 
  },[props.relief, props.emptyAfterCheck])

  const data = {
    labels: label,
    datasets: [
      {
        label: '통증 완화도',
        data: relief,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        ticks : {
          stepSize: 1
        }
      },
    },
  }

  const LineStructure = <Line options={options} data={data}/>

  return (<React.Fragment>
    {props.emptyAfterCheck === false? LineStructure : <p style={{fontSize: '2rem'}}>통계 데이터가 없습니다.</p>}
  </React.Fragment>
  )
}

export default PainRelief