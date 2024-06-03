import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DataTable from '../../components/DataTable'
import axios from 'axios';
import { Button } from '@mui/material';
import PendingApprovals from '../Rewards/PendingApprovals';
import PendingTeamApprovals from '../Rewards/PendingTeamApprovals';
import AuthService from '../Service/AuthService';
import EmployeeRequests from '../Rewards/EmployeeRequests';
import TeamRequests from '../Rewards/TeamRequests';


const Requests3 = () => {
  const [showComponent1,setShowComponent1]=useState(false);
  const [showComponent2,setShowComponent2]=useState(false);
  const userRole=AuthService.getRole();
  const isManager=userRole==='ROLE_MANAGER'
  const isAdmin=userRole==='ROLE_ADMIN'
  const [activeButton,setActiveButton]=useState(null)
    const handleShowComponent1=(button)=>{
        setShowComponent1(true);
        setShowComponent2(false);
        setActiveButton(button)
    }
    const handleShowComponent2=(button)=>{
        setShowComponent1(false);
        setShowComponent2(true);
        setActiveButton(button)
    }

  return (
    <>
        <Sidebar/>
        <div style={{marginLeft:'20%',marginTop:'-120px'}}>
                {isManager  && (
                    <>
                    <EmployeeRequests/>
                    </>
                    )}
        </div>
        <div style={{marginLeft:'20%',marginTop:'-20px'}}>
                {isAdmin  && (
                        <>
                    <>
                    <Button variant='contained'  style={{marginTop:'100px',backgroundColor:activeButton==='button1'?'black':'',color:activeButton==='button1'?'#fff':'#fff'}} onClick={()=>handleShowComponent1('button1')}>
                        Personal
                    </Button>
                    <Button variant='contained'  style={{marginTop:'100px',marginLeft:'20px',backgroundColor:activeButton==='button2'?'black':'',color:activeButton==='button2'?'#fff':'#fff'}} onClick={()=>handleShowComponent2('button2')}>
                        Team
                    </Button>
                    <div style={{marginTop:'-80px'}}>
                        {showComponent1&&<EmployeeRequests/>}
                        {showComponent2&&<TeamRequests/>}
                    </div>
                    
                    </>
            
                    </>
                    )}
        </div>
    </>
  )
}

export default Requests3
