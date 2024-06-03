import { Box } from '@mui/material'
import React, { useState } from 'react'
import OtlSideNav from '../components/OtlSideNav'
import LogRestriction from '../../main/LogRestriction'
import AccessRestriction from '../../main/AccessRestriction'
import AuthService from '../../rewards/pages/Service/AuthService'
import OtlTimexTableComponent from '../components/OtlTimexTableComponent'
import PeriodSelector from '../components/PeriodSelector'


const OtlDataTable = () => {

 const [selectedPeriod,setSelectedPeriod]=useState('');
 const [selectedYear,setSelectedYear]=useState('');
 
  const handleFormSubmit=(period,year)=>{
    setSelectedPeriod(period);
    setSelectedYear(year);
  }

  const userRole = AuthService.getRole();
  const isPL_Man = userRole === 'ROLE_MANAGER'||userRole === 'ROLE_PROJECTLEAD';
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
    isPL_Man?(
      <Box>
      <OtlSideNav/>
      <div style={{marginLeft:'20%',marginTop:'-30px',marginBottom:'40px'}}>
        <PeriodSelector onFormSubmit={handleFormSubmit} />
        <OtlTimexTableComponent period={selectedPeriod} year={selectedYear}/>
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

export default OtlDataTable
