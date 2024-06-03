import React from 'react';
import { Bar } from 'react-chartjs-2';
import FinancialYear from './FinancialYear';
 
const BarGraph = ({barData}) => {

    const currentFinancialyear=localStorage.getItem('currentFinancialYear')

    const periods=['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12']
    const data={labels:[],datasets:[]};

    const otlData=[];
    const timexData=[];

    periods.forEach(period=>{
      const periodData=barData.filter((item)=>item.periodName===period&&item.yearNumber===currentFinancialyear);

      const otl=periodData.reduce((accumulator,current)=>accumulator+parseInt(current.otlBookedHours),0);
      const timex = periodData.reduce((accumulator, current) => {
        const timexBookedHours = parseInt(current.timexBookedHours, 10) || 0;
        return accumulator + timexBookedHours;
      }, 0);

      otlData.push(otl);
      timexData.push(timex);

      data.labels.push(period)

    });

    data.datasets.push({
      label: 'OTL',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: otlData
    })
    data.datasets.push({
      label: 'Timex',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
        data: timexData
    })
 
  return (
<div style={{height:'230px',width:'500px',marginLeft:'100px',marginTop:'-35px'}}>
<FinancialYear/>
<Bar
        data={data}
        width={100}
        height={400}
        options={{
          maintainAspectRatio: false
        }}
      />
</div>
  );
};
 
export default BarGraph;