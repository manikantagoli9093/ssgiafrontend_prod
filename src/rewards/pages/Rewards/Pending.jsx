import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DataTable from '../../components/DataTable'
import axios from 'axios';
import { Button } from '@mui/material';
import PendingApprovals from './PendingApprovals';
import PendingTeamApprovals from './PendingTeamApprovals';
import AuthService from '../Service/AuthService';
import LogRestriction from '../../../main/LogRestriction';


const Pending = () => {

  const userRole=AuthService.getRole();
  const isProjectLead=userRole==='ROLE_PROJECTLEAD'
  const isUser=userRole==='ROLE_EMPLOYEE'
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
                {isUser  && (
                    <>
                    <PendingApprovals/>
                    </>
                    )}
        </div>
        <div style={{marginLeft:'20%',marginTop:'-20px'}}>
                {isProjectLead  && (
                        <>
                    <>
                    <Button variant='contained'  style={{marginTop:'100px',backgroundColor:activeButton===1?'black':'',color:activeButton===1?'#fff':'#fff'}} onClick={()=>handleButtonClick(1)}>
                        Personal
                    </Button>
                    <Button variant='contained'  style={{marginTop:'100px',marginLeft:'20px',backgroundColor:activeButton===2?'black':'',color:activeButton===2?'#fff':'#fff'}} onClick={()=>handleButtonClick(2)}>
                        Team
                    </Button>
                    <div style={{marginTop:'-80px'}}>
                    {showTable1?<PendingApprovals/>:<PendingTeamApprovals/>}
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

export default Pending
