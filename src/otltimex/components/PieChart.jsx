import React, { useEffect, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

const PieCharty = ({data,title,width,height}) => {

    const Period=localStorage.getItem('currentPeriod')
    const FY=localStorage.getItem('currentFinancialYear')

  return (
    <>
    <div style={{width,height,marginTop:'-40px'}}>
        <h4>{title} ({Period})  </h4>
        <Pie data={data}/>
    </div>
    </>
  )
}

export default PieCharty