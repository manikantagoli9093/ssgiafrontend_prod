import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DataTable from '../../components/DataTable'
import axios from 'axios';
import DataTable2 from '../../components/DataTable2';

const PendingTeamApprovals = () => {
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState([]);
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
        const myPending=response.data.filter(item=>{
            // console.log(item.empId)
            return item.status==='Pending'&&item.empId===parseInt(empId);
        })
        setData(myPending)

        setLoading(false);
      }catch(error){
        console.error('Error fetching options:',error);
        setLoading(false);
      }
    };
    fetchMyRewards();
  },[]);
  
//   const myRewards=data.filter((item)=>item.status==='Pending'&&item.empId===empId);
  return (
    <div>
        <Sidebar/>
        <div >
        
            {/* MyRewards */}
        <DataTable2 data={data} loading={loading} heading='My Rewards'/>
        </div>
    </div>
  )
}

export default PendingTeamApprovals
