import React, { useEffect, useState } from 'react'
import './Leaderboard.css'
import Sidebar from '../../components/Sidebar';
import LogRestriction from '../../../main/LogRestriction';
import axios from 'axios';

const Leaderboard = () => {

    // const [deliveryRewards,setDeliveryRewards]=useState([])
    // const [nonDeliveryRewards,setNonDeliveryRewards]=useState([])
    const token=localStorage.getItem('token')
    const [loading,setLoading]=useState(false);
    const BASE_URL=localStorage.getItem('BASE_URL')
    const empId=localStorage.getItem('empId');
    const [employees,setEmployees]=useState([])

    useEffect(()=>{
        const fetchMyRewards=async ()=>{
          try{
            setLoading(true);
            const response=await axios.get(`${BASE_URL}/api/allrewards2`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
            setEmployees(response.data)
            setLoading(false);
          }catch(error){
            console.error('Error fetching options:',error);
            setLoading(false);
          }
        };
        fetchMyRewards();
      },[]);
// console.log(employees)
      const aggregateScores=(data)=>{
        const employeePoints=new Map();

        employees.forEach((item)=>{
            const empId=item.empId;
            const rewardType=item.rewards.rewardType;
            const rewardPoints=parseInt(item.rewards.rewardPoints,10);
            const status=item.status

            if(status==="Approved"){
            if(!employeePoints.has(empId)){
                employeePoints.set(empId,{
                    empName:item.empName,
                    Delivery:0,
                    Non_Delivery:0
                });
            }

            const employeeData=employeePoints.get(empId);
            if(rewardType==="Delivery"){
                employeeData.Delivery+=rewardPoints;
            }else if(rewardType==="Non_Delivery"){
                employeeData.Non_Delivery+=rewardPoints;
            }
        }});
    
        // return Array.from(employeePoints.entries()).map(([empId,data])=>({
        //     empId,
        //     ...data,
        //     // empName:data.find((item)=>item.empId===empId).empName
        // }));
        return Array.from(employeePoints.values());
      }
      const aggregatedEmployees=aggregateScores(employees);
// console.log(aggregatedEmployees)
      const sortedDeliveryEmployees=[...aggregatedEmployees].filter(employee=>employee.Delivery>0).sort((a,b)=>b.Delivery-a.Delivery)
      const sortedNonDeliveryEmployees=[...aggregatedEmployees].filter(employee=>employee.Non_Delivery>0).sort((a,b)=>b.Non_Delivery-a.Non_Delivery);
      
      // console.log(sortedDeliveryEmployees)
      // console.log(sortedNonDeliveryEmployees)


    const isLoggedIn=localStorage.getItem('isLoggedIn')
    return isLoggedIn? (
      <div>
          <Sidebar/>
          <div style={{marginLeft:'15%'}}>
          <div>
            {/* <h1><font color="#dc143c">Leaderboard</font></h1> */}
            <div className='flex-container'>
               <div className='tablecontainerD'> 
                    <h3>Delivery Leaderboard</h3>
                    <table className='ui table'>
                        <thead className='tableheadD'>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody className='tablebody'>
                            {sortedDeliveryEmployees.map((employee,index)=>(
                                <tr key={employee.empId}>
                                    <td className='th-padding'>{index+1}</td>
                                    <td className='th-padding'>{employee.empName}</td>
                                    <td className='th-padding'>{employee.Delivery}</td>
                                </tr>
                            ))}
                           
                        </tbody>
                    </table>
               </div>
               <div className='tablecontainer'> 
                    <h3>Non-Delivery Leaderboard</h3>
                    <table className='ui table'>
                        <thead className='tablehead'>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody className='tablebody'>
                            {sortedNonDeliveryEmployees.map((employee,index)=>(
                                <tr key={employee.empId}>
                                    <td className='th-padding'>{index+1}</td>
                                    <td className='th-padding'>{employee.empName}</td>
                                    <td className='th-padding'>{employee.Non_Delivery}</td>
                                </tr>
                            ))}
                           
                        </tbody>
                    </table>
               </div>
            </div>
          </div>
             
        
          </div>
      </div>
    ):(
      <>
        <LogRestriction/>
      </>
    );
}

export default Leaderboard