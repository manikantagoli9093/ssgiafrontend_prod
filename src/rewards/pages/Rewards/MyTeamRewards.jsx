import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import comingsoon from '../../images/comingsoon.png'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import BoxComponent from '../../components/BoxComponent'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LogRestriction from '../../../main/LogRestriction'
import './teamrewards.css'
import TBoxComponent from '../../components/TBoxComponent'
const MyTeamRewards = () => {
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  const [totalPoints1,setTotalpoints1]=useState(0)
  const [totalPoints2,setTotalpoints2]=useState(0)
  const [totalPoints3,setTotalpoints3]=useState(0)
  const [totalPoints4,setTotalpoints4]=useState(0)
  const [totalPoints5,setTotalpoints5]=useState(0)
  const [totalPoints6,setTotalpoints6]=useState(0)
  const empId=localStorage.getItem('empId')
  const token=localStorage.getItem('token')
  const BASE_URL=localStorage.getItem('BASE_URL')

  useEffect(()=>{
    const fetchMyRewards=async ()=>{
      try{
        setLoading(true);
        const response=await axios.get(`${BASE_URL}/api/getTeamRewards`,{
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
          },
        });
        setData(response.data)
        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchMyRewards();
  },[]);

  useEffect(() => {
    const calculateTotalPoints = () => {
      const approvedRecords=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='Team 1 ( Location ODS, Abinitio, BizTalk )');
      const total = approvedRecords.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      setTotalpoints1(total);
      const approvedRecords2=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='Team 2 ( OFI, DMS )');
      const total2 = approvedRecords2.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      setTotalpoints2(total2);
      const approvedRecords3=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='Team 3 ( Legacy BAU, Dev, CR )');
      const total3 = approvedRecords3.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      setTotalpoints3(total3);
      const approvedRecords4=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='Team 4 ( ReSA, kofax, STS )');
      const total4 = approvedRecords4.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      setTotalpoints4(total4);
      // const approvedRecords5=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='Dev+CR');
      // const total5 = approvedRecords5.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      // setTotalpoints5(total5);
      // const approvedRecords6=data.filter((item)=>item.status==='Approved'&&item.team.teamName==='BizTalk');
      // const total6 = approvedRecords6.reduce((accumulator, current) => accumulator + parseInt(current.teamDropDown.teamRewardPoints), 0);
      // setTotalpoints6(total6);
    };    
    calculateTotalPoints();
  }, [data]);
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  return isLoggedIn? (
    <Box>
      <Sidebar/>
      <div style={{marginLeft:'20%'}} >
        <div style={{display:'flex'}}>
            <Link to='' style={{textDecoration: 'none', color: 'black' ,padding:"10px"}}>
                  <TBoxComponent heading="Team 1" number={totalPoints1} />
              </Link>
              <Link to='' style={{textDecoration: 'none', color: 'black' ,padding:"10px" }}>
                  <TBoxComponent heading="Team 2" number={totalPoints2} />
              </Link>
              <Link to='' style={{textDecoration: 'none', color: 'black' ,padding:"10px" }}>
                  <TBoxComponent heading="Team 3" number={totalPoints3} />
              </Link>
              <Link to='' style={{textDecoration: 'none', color: 'black' ,padding:"10px" }}>
                  <TBoxComponent heading="Team 4" number={totalPoints4} />
              </Link>
              
        </div>
        
        <div style={{width:'80%',marginTop:'50px'}}>
          <div className="row">
          <div className="column">
          <div className="card">
          <h3>Team 1</h3>
          <p>Location ODS</p>
          <p>Abinitio</p>
          <p>BizTalk</p>
          </div>
          </div>
          <div className="column">
          <div className="card">
          <h3>Team 2</h3>
          <p>OFI</p>
          <p>Langdon DMS</p>
          <p>Britannia DMS</p>
          </div>
          </div>
          <div className="column">
          <div className="card">
          <h3>Team 3</h3>
          <p>Legacy BAU</p>
          <p>Legacy Dev</p>
          <p>CR</p>
          </div>
          </div>
          <div className="column">
          <div className="card">
          <h3>Team 4</h3>
          <p>ReSA</p>
          <p>Kofax</p>
          <p>STS</p>
          </div>
          </div>
          </div>
          </div>   
      </div>
    </Box>
  ):(
    <>
   <LogRestriction/>
    </>
  );
}

export default MyTeamRewards
