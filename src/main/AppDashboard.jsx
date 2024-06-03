import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // If using react-router
import rewardImg from '../main/images/reward.png'
import otltimexImg from '../main/images/otltimex.png'
import AuthService from '../rewards/pages/Service/AuthService';
import axios from 'axios';
import LogRestriction from './LogRestriction';
import PasswordChangeForm from '../rewards/pages/PasswordChange/PasswordChangeForm';
import UploadPage from '../otltimex/pages/OtlUploadPage';
 
const AppDashboard = () => {
  const empId=localStorage.getItem('empId')
  const token=localStorage.getItem('token')
  const userRole = AuthService.getRole();
  const navigate=useNavigate();
  const logout=()=>{
    AuthService.logout();
    navigate('/')
  }
  const BASE_URL=localStorage.getItem('BASE_URL')
  const isEmp_PL_Man=userRole==='ROLE_EMPLOYEE'||userRole==='ROLE_MANAGER'||userRole==='ROLE_PROJECTLEAD';
  const isPL_Man = userRole === 'ROLE_MANAGER'||userRole === 'ROLE_PROJECTLEAD';
  const isUploader=userRole==='ROLE_UPLOAD'
  const openModal = () => {
    PasswordChangeForm.openModal();
  };
  const [name,setName]=useState('');
  useEffect(()=>{
    const fetchEmpName=async()=>{
      try{
        const response=await axios.get(`${BASE_URL}/api/getname/${empId}`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setName(response.data);
      }catch(error){
        console.error('Error fetching Name:',error);
      }
    };
    fetchEmpName();
  },[]);
  localStorage.setItem('empName',name)
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
<div>
<AppBar position="static">
<Toolbar>
<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello! {name}, Welcome to Sopra Steria Internal System
</Typography>
          {/* Add other navbar elements here */}
          <div>
          <Button color='inherit' onClick={openModal} >
            Change Password
          </Button>
          <PasswordChangeForm/>
          </div>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
</Toolbar>
</AppBar>
<Container sx={{ marginTop: '2rem' }}>
  <Grid container spacing={3}>
{isEmp_PL_Man && (
    <Grid item xs={0} sm={0} md={0}>
      <Box sx={{ textAlign: 'center' }}>
          <Button component={Link} to="/dashboard" variant="contained" color="primary" target='_blank'>
              <Box>                  
                <img src={rewardImg} alt="Image 1" style={{ width: '100px', height: '100px' }} />
                  <Typography variant="h6">Reward System</Typography>                
              </Box>
          </Button>
      </Box>
    </Grid>
   )} 
    {isPL_Man && (
  <Grid item xs={0} sm={0} md={0}>

      <Box sx={{ textAlign: 'center' }}>
        <Button component={Link} to="/otldashboard" variant="contained" color="primary" target='_blank'>
          <Box>                  
            <img src={otltimexImg} alt="Image 1" style={{ width: '100px', height: '100px' }} />
              <Typography variant="h6">OTL TIMEX RECONCILE</Typography>                
          </Box>
        </Button>
      </Box>
    </Grid>
    )}
          {/* Add more Grid items for additional pages */}
  </Grid>
  {isUploader&&(
    <>
    <UploadPage/>
    </>
  )}
</Container>
</div>
  ):(
    <>
   <LogRestriction/>
    </>
  );
};
 
export default AppDashboard;