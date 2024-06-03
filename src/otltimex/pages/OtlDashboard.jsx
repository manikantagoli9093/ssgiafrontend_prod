import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OtlSideNav from '../components/OtlSideNav'
import LogRestriction from '../../main/LogRestriction'
import AccessRestriction from '../../main/AccessRestriction'
import AuthService from '../../rewards/pages/Service/AuthService'
import PieCharty from '../components/PieChart'
import BarGraph from '../components/BarGraph'
import axios from 'axios'
import PeriodSelector from '../components/PeriodSelector'
import './style.css'

const OtlDashboard = () => {

  const [sumData,setSumData]=useState([]);
  const BASE_URL=localStorage.getItem('BASE_URL')
  const token=localStorage.getItem('token')
  const empId=localStorage.getItem('empId')
  const currentPeriod=localStorage.getItem('currentPeriod')
  const currentFinancialyear=localStorage.getItem('currentFinancialYear')

  useEffect(()=>{
    const fetchSumData=async()=>{
      
      try{
        const headers={
          'Content-Type':'application/json',
          'Authorization':'Bearer '+token,
        }
        const response=await axios.get(`${BASE_URL}/api/recordsForManager/${empId}`,{headers});
        setSumData(response.data);
      }catch(error){
        console.error('Error fetching data: ',error);
      }
    };
    fetchSumData();
  },[])
  console.log(sumData)
  const pieData=sumData.filter((item)=>item.periodName===currentPeriod&&item.yearNumber===currentFinancialyear);
  console.log(pieData)
  
  const otlBookedHoursPie=pieData.reduce((accumulator, current) => accumulator + parseInt(current.otlBookedHours), 0);
  const timexBookedHoursPie = pieData.reduce((accumulator, current) => {
    // Parse the value to an integer, fallback to 0 if not a valid number
    const timexBookedHours = parseInt(current.timexBookedHours, 10) || 0;
    return accumulator + timexBookedHours;
  }, 0);


  // let Status
  // if(otlBookedHoursPie===timexBookedHoursPie){
  //   Status='Matched';
  // }
  // else{
  //   Status='Mis-Matched';
  // }

  console.log(timexBookedHoursPie)
  const data = {
    labels: ['Timex', 'OTL'],
    datasets: [
      {
        data: [timexBookedHoursPie,otlBookedHoursPie],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const userRole = AuthService.getRole();
  const isPL_Man = userRole === 'ROLE_MANAGER'||userRole === 'ROLE_PROJECTLEAD';
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
    isPL_Man?(
      <Box>
      <OtlSideNav/>
      <div style={{marginLeft:'20%'}}>
        {/* <div style={{width:'40%',marginBottom:'40px',marginTop:'-20px'}}>
          <FinancialYearDropdown years={financialYears} onSelectYear={handleSelectYear}/>
        </div> */}
        <div style={{display:'flex'}}>
          <div style={{display:'none'}}>
          <PeriodSelector/>
          </div>
        
        <PieCharty data={data} title="Reconcilation Data (FINANCE)" width="200px" height="200px" />
        <BarGraph barData={sumData} width="200px" height="200px"/>
        
        </div>
        <div style={{marginTop:'100px',width:'160px',textAlign:'center',marginLeft:'20px'}}>
          <table className='table'>
            <thead>
              <tr>
                {/* <th></th> */}
                <th style={{backgroundColor:'#36A2EB'}}>OTL</th>
                <th style={{backgroundColor:'#FF6384'}}>Timex</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{currentPeriod}</td> */}
                <td>{otlBookedHoursPie}</td>
                <td>{timexBookedHoursPie}</td>
              </tr>
            </tbody>
          </table>
        {/* <div className='blinking-text' style={{marginTop:'20px'}}>
          <h5>{Status}</h5>
        </div> */}
        </div>
        
      </div>
    </Box>
    ):(
      <>
      <AccessRestriction/>
      </>
    )
    
  ):(
      <>
     <LogRestriction/>
      </>
    );
}

export default OtlDashboard