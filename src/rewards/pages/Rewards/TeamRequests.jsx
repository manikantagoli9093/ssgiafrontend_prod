import React, { useEffect, useState } from 'react'
import ApproveTable from '../../components/ApproveTable'
import Sidebar from '../../components/Sidebar'
import axios from 'axios';
import ApproveTable2 from '../../components/ApproveTable2';

const TeamRequests = () => {

    const [data, setData] = useState([]);
    // const [empId,setEmpId]=useState('');
    const empId=localStorage.getItem('empId')
    const BASE_URL=localStorage.getItem('BASE_URL')
    
    // useEffect(() => {
    //   // Retrieve employee ID from localStorage when the component mounts
    //   const storedEmployeeId = localStorage.getItem('empId');
    //   if (storedEmployeeId) {
    //     setEmpId(storedEmployeeId);
    //   }
    // }, []);
    const token=localStorage.getItem('token')
    const [loading, setLoading] = useState(true);
    // const [requestCount,setRequestCount]=useState(0)
    useEffect(() => {
        // Fetch data from your API using Axios
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/teamRequests/${empId}`,{
              headers:{
                      'Content-Type':'application/json',
                      'Authorization':'Bearer '+token
                    },
            }); 
          
            setData(response.data);
            
            setLoading(false);
            
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      const myRewards=data.filter((item)=>item.status==='Pending');

      const requestCount=myRewards.length
      
      // console.log(requestCount)

      
    // console.log(myRewards)

  return (
    <div>
        <Sidebar/>
        <div>

      <ApproveTable2 data={myRewards} loading={loading} heading='Employee Requests'/>
        </div>
    </div>
  )
}

export default TeamRequests
