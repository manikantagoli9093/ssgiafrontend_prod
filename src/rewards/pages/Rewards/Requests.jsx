import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Button } from '@mui/material';
import AuthService from '../Service/AuthService';
import EmployeeRequests from './EmployeeRequests';
import TeamRequests from './TeamRequests';
import LogRestriction from '../../../main/LogRestriction';


const Requests = () => {
  const userRole=AuthService.getRole();
  const isProjectLead=userRole==='ROLE_PROJECTLEAD'
  const isManager=userRole==='ROLE_MANAGER'
  const [showTable1,setShowTable1]=useState(()=>{
    return localStorage.getItem('showTable1')==='true';
  })
  const [activeButton,setActiveButton]=useState(()=>{
    return parseInt(localStorage.getItem('activeButton'))||2;
  });
    
  const handleButtonClick=(tableNumber)=>{
    setShowTable1(tableNumber===1);
    setActiveButton(tableNumber)
  };

  useEffect(()=>{
    localStorage.setItem('activeButton',activeButton);
  },[activeButton]);
  useEffect(()=>{
    localStorage.setItem('showTable1',showTable1);
  },[showTable1]);
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
    <>
        <Sidebar/>
        <div style={{marginLeft:'20%',marginTop:'-120px'}}>
                {isProjectLead  && (
                    <>
                    <EmployeeRequests/>
                    </>
                    )}
        </div>
        <div style={{marginLeft:'20%',marginTop:'-20px'}}>
                {isManager  && (
                        <>
                    <>
                    <Button variant='contained'  style={{marginTop:'100px',backgroundColor:activeButton===2?'black':'',color:activeButton===2?'#fff':'#fff'}} onClick={()=>handleButtonClick(2)}>
                        Personal
                    </Button>
                    <Button variant='contained'  style={{marginTop:'100px',marginLeft:'20px',backgroundColor:activeButton===1?'black':'',color:activeButton===1?'#fff':'#fff'}} onClick={()=>handleButtonClick(1)}>
                        Team
                    </Button>
                    <div style={{marginTop:'-80px'}}>
                    {showTable1?<TeamRequests/>:<EmployeeRequests/>}
                    </div>
                    
                    </>
            
                    </>
                    )}
        </div>
    </>
  ):(
    <>
   <LogRestriction/>
    </>
  );
}

export default Requests
