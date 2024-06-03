import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import AuthService from '../Service/AuthService';
import Sidebar from '../../components/Sidebar';
import BoxComponent from '../../components/BoxComponent';
import MBoxComponent from '../../components/MBoxComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogRestriction from '../../../main/LogRestriction';

const userRole = AuthService.getRole();

const Dashboard = () => {

  

  const [data, setData] = useState([]);
    const [totalDeliveryPoints, setTotalDeliverypoints]=useState(0);
    const [totalNonDeliveryPoints, setTotalNonDeliverypoints]=useState(0);
    const [loading,setLoading]=useState(true);
    const empId=localStorage.getItem('empId')
    const token=localStorage.getItem('token')
    const [rdata,setRData]=useState([]);
    const [rteamdata,setRteamData]=useState([]);
    const [rteamdataPending,setRteamDataPending]=useState([]);
    const BASE_URL=localStorage.getItem('BASE_URL')

    useEffect(() => {
      const fetchMyRewards = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/myrequests/${empId}`,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token
            },
          });
         
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching options:', error);
          setLoading(false);
        }
      };
  
      fetchMyRewards();
    }, []);

      useEffect(() => {
        const calculateTotalPoints = () => {
          const approvedRecords=data.filter((item)=>item.status==='Approved'&&item.rewards.rewardType==='Non_Delivery');
          const total = approvedRecords.reduce((accumulator, current) => accumulator + parseInt(current.rewards.rewardPoints), 0);
          setTotalNonDeliverypoints(total);
          localStorage.setItem('totalNonDeliveryPoints',total)
        };
        
        calculateTotalPoints();
      }, [data]);
      useEffect(() => {
        const calculateTotalPoints = () => {
          const approvedRecords=data.filter((item)=>item.status==='Approved'&&item.rewards.rewardType==='Delivery');
          const total = approvedRecords.reduce((accumulator, current) => accumulator + parseInt(current.rewards.rewardPoints), 0);
          setTotalDeliverypoints(total);
          localStorage.setItem('totalDeliveryPoints',total)
        };
        
        calculateTotalPoints();
      }, [data]);

      const myRewards=data.filter((item)=>item.status==='Pending');
      const pendingApprovalCount=myRewards.length;
      // console.log(myRewards)
      useEffect(() => {
        
        // Fetch options from API when the component mounts
        const fetchReqCount = async () => {
          if(userRole==='ROLE_PROJECTLEAD'||'ROLE_MANAGER'){
          try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/requests/${empId}`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
            // console.log(response.data)
            setRData(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching options:', error);
            setLoading(false);
          }
        };
      }
        fetchReqCount();
      }, [userRole]);
      const reqCount=rdata.filter((item)=>item.status==='Pending');
      const requestCount=reqCount.length;

      useEffect(() => {
        // Fetch options from API when the component mounts
        const fetchReqCount = async () => {
          if(userRole==='ROLE_MANAGER'){
          try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/teamRequests/${empId}`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
            // console.log(response.data)
            setRteamData(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching options:', error);
            setLoading(false);
          }
        };
      }
        fetchReqCount();
      }, [userRole]);
      const reqTeamCount=rteamdata.filter((item)=>item.status==='Pending');
      const requestTeamCount=reqTeamCount.length;
      // console.log(rdata)

      useEffect(() => {
        // Fetch options from API when the component mounts
        const fetchReqCount = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/getTeamRewards`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
           
            setRteamDataPending(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching options:', error);
            setLoading(false);
          }
        };
    
        fetchReqCount();
      }, []);
      const reqTeamCountPending=rteamdataPending.filter((item)=>item.status==='Pending'&&item.empId===parseInt(empId)
      );
      const requestTeamCountPending=reqTeamCountPending.length;

  let componentsToRender;

  switch(userRole){
    case 'ROLE_EMPLOYEE':
      componentsToRender=(
    <div style={{display:'flex'}}>
        <div>
          {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
            <BoxComponent heading="My Rewards (Non Delivery)" loading={loading} number={totalNonDeliveryPoints} />
          {/* </Link> */}
        </div>
        <div>
          {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
            <BoxComponent heading="My Rewards (Delivery)" loading={loading} number={totalDeliveryPoints} />
          {/* </Link> */}
        </div>
        <div>
          {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
            <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
          {/* </Link> */}
        </div>
      </div>
      );
      break;
      case 'ROLE_PROJECTLEAD':
        componentsToRender=(
          <>
          <div style={{display:'flex'}}>
          <div>
          {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
            <BoxComponent heading="My Rewards (Non Delivery)" loading={loading} number={totalNonDeliveryPoints} />
          {/* </Link> */}
        </div>
        <div>
          {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
            <BoxComponent heading="My Rewards (Delivery)" loading={loading} number={totalDeliveryPoints} />
          {/* </Link> */}
        </div>
          <div>
            {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
              <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
            {/* </Link> */}
          </div>
          <div >
            {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
              <MBoxComponent heading="Employee Requests" loading={loading} number={requestCount} />
            {/* </Link> */}
         </div>
        </div>
         <div style={{display:'flex'}} >
            {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
              <MBoxComponent heading="Team Pending Approvals" loading={loading} number={requestTeamCountPending} />
            {/* </Link> */}
         </div>
          </>
        
        );
        break;
        case 'ROLE_MANAGER':
        componentsToRender=(
        <div style={{display:'flex'}}>
          {/* <div>
            <Link to='/myrewards' style={{textDecoration: 'none', color: 'black' }}>
              <BoxComponent heading="My Rewards" loading={loading} number={totalPoints} />
            </Link>
          </div>
          <div>
            <Link to='/pendingapprovals' style={{textDecoration: 'none', color: 'black' }}>
              <BoxComponent heading="Pending Approvals" loading={loading} number={pendingApprovalCount} />
            </Link>
          </div> */}
          <div >
            {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
              <MBoxComponent heading="Employee Requests" loading={loading} number={requestCount} />
            {/* </Link> */}
         </div>
         <div >
            {/* <Link to='' style={{textDecoration: 'none', color: 'black' }}> */}
              <MBoxComponent heading="Team Requests" loading={loading} number={requestTeamCount} />
            {/* </Link> */}
         </div>
        </div>
        );
        break;
  }
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
    <Box>
      <Sidebar/>
      <div style={{marginLeft:'20%'}}>
      {componentsToRender}
      </div>
    </Box>
  ):(
    <>
    <LogRestriction/>
    </>
  );
}

export default Dashboard
