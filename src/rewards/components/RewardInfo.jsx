import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import AuthService from '../pages/Service/AuthService';

const RewardInfo = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showTable1,setShowTable1]=useState(false)
    const [activeButton,setActiveButton]=useState(2);
    const userRole = AuthService.getRole();
    const isPL_Man= userRole === 'ROLE_MANAGER'||userRole === 'ROLE_PROJECTLEAD';
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
      RewardInfo.openModal = openModal;

      

      const handleButtonClick=(tableNumber)=>{
        setActiveButton(tableNumber)
        setShowTable1(tableNumber===1);

      };
    

  return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>
            <Typography>Reward Information</Typography>
        </DialogTitle>
        <DialogContent>
          <Button style={{color:activeButton===1?'black':'red'}} onClick={()=>handleButtonClick(1)}>Individual</Button>
          <Button style={{color:activeButton===2?'black':'red'}} onClick={()=>handleButtonClick(2)}>Team</Button>
          {isPL_Man && (
          <Button style={{color:activeButton===3?'black':'red'}} onClick={()=>handleButtonClick(3)}>Delivery</Button>
          )}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reward Name</TableCell>
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {showTable1?<Table1/>:<Table2/>} */}
                    {activeButton===1&&<Table1/>}
                    {activeButton===2&&<Table2/>}
                    {activeButton===3&&<Table3/>}
                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
function Table1(){
  const [Rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL=localStorage.getItem('BASE_URL');
    const token=localStorage.getItem('token')
    
  useEffect(()=>{
    const fetchRewardInfo=async()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/all`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setRewards(response.data);
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchRewardInfo();
  },[]);

  const NonDeliveryRewards=Rewards.filter((item)=>item.rewardType==="Non_Delivery")
  return(
    <>
    {
      loading?(
          <TableRow>
              <TableCell colSpan={5}>
                  <CircularProgress size={20}/>Loading...
              </TableCell>
          </TableRow>
      ):(
        NonDeliveryRewards.map((row)=>(
              <TableRow key={row.id}>
                  <TableCell>{row.rewardName}</TableCell>
                  <TableCell>{row.rewardPoints}</TableCell>                               
              </TableRow>
          ))
      )
  }
    </>
    
  )
}
function Table2(){
  const [Rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL=localStorage.getItem('BASE_URL');
    const token=localStorage.getItem('token')
    
  useEffect(()=>{
    const fetchRewardInfo=async()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/getAllTeamRewards`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setRewards(response.data);
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchRewardInfo();
  },[]);
  return(
    <>
    {
      loading?(
          <TableRow>
              <TableCell colSpan={5}>
                  <CircularProgress size={20}/>Loading...
              </TableCell>
          </TableRow>
      ):(
          Rewards.map((row)=>(
              <TableRow key={row.trddId}>
                  <TableCell>{row.teamRewardName}</TableCell>
                  <TableCell>{row.teamRewardPoints}</TableCell>                               
              </TableRow>
          ))
      )
  }
    </>
    
  )
}

function Table3(){
  const [Rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL=localStorage.getItem('BASE_URL');
    const token=localStorage.getItem('token')
    
  useEffect(()=>{
    const fetchRewardInfo=async()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/all`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setRewards(response.data);
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchRewardInfo();
  },[]);

  const DeliveryRewards=Rewards.filter((item)=>item.rewardType==="Delivery")
  return(
    <>
    {
      loading?(
          <TableRow>
              <TableCell colSpan={5}>
                  <CircularProgress size={20}/>Loading...
              </TableCell>
          </TableRow>
      ):(
        DeliveryRewards.map((row)=>(
              <TableRow key={row.id}>
                  <TableCell>{row.rewardName}</TableCell>
                  <TableCell>{row.rewardPoints}</TableCell>                               
              </TableRow>
          ))
      )
  }
    </>
    
  )
}
export default RewardInfo
