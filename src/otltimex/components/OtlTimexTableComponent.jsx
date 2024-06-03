import React, { useEffect, useState } from 'react'
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios';
import './table.css'
const OtlTimexTableComponent = ({period,year}) => {

    const [data,setData]=useState([]);
    const [filteredHourData,setFilteredHourData]=useState([]);
    const BASE_URL=localStorage.getItem('BASE_URL')
    const token=localStorage.getItem('token');
    const empId=localStorage.getItem('empId')

    useEffect(()=>{
        fetchData();
    },[period,year]);

    // console.log(period)
    // console.log(year)

    const fetchData=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}/api/recordsForManager/${empId}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token,
                }
            });
            setData(response.data);
            filterData();
            // console.log(response.data)
        }catch(error){
            console.error('Error fetching data: ',error);
        }
    }
    const filterData=()=>{
        // console.log("filtering data...")
        // console.log("selected period:",period)
        // console.log("selected year:",year);
        // console.log("original data:",data);

        const filteredData=data.filter(item=>{
            return item.yearNumber===year&&item.periodName===period;
        });
        setFilteredHourData(filteredData)
        // console.log("Filtered data:",filteredData)
    }             
    // console.log("filtered hour data:",filteredHourData)
    const week1=filteredHourData.filter((item)=>item.weekNumber==='Week_1'); 
    const week2=filteredHourData.filter((item)=>item.weekNumber==='Week_2'); 
    const week3=filteredHourData.filter((item)=>item.weekNumber==='Week_3'); 
    const week4=filteredHourData.filter((item)=>item.weekNumber==='Week_4'); 
    const week5=filteredHourData.filter((item)=>item.weekNumber==='Week_5');  

    // console.log("week 2 data: ", week2)

    

  return (
    <>
    <div style={{width:'90%'}}>
        {/* <GlobalFilter filter={filterInput} setFilter={setFilterInput}/> */}
    <div style={{display:'flex'}}>
     
            <table className='table' >
                <thead style={{position:'sticky',top:60,zIndex:1,backgroundColor:'white',background:'black',boxShadow:'0px 2px 4px rgba(0,0,0,0.2)'}}>
                    <tr>
                    <th>EmpName</th>
                    <th colSpan='3'>Week 1</th>
                    <th colSpan='3'>Week 2</th>
                    <th colSpan='3'>Week 3</th>
                    <th colSpan='3'>Week 4</th>
                    <th colSpan='3'>Week 5</th>
                    <th>Difference</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <th></th>
                    <th>OTL</th>
                    <th>TIMEX</th>
                    <th>DIFF</th>
                    <th>OTL</th>
                    <th>TIMEX</th>
                    <th>DIFF</th>
                    <th>OTL</th>
                    <th>TIMEX</th>
                    <th>DIFF</th>
                    <th>OTL</th>
                    <th>TIMEX</th>
                    <th>DIFF</th>
                    <th>OTL</th>
                    <th>TIMEX</th>
                    <th>DIFF</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                        <tbody>
            
            {week1.map((item, index) =>{
                let totalDifference
                if (item.differenceInHours===null){
                    if(week5.length>0){
                        totalDifference=((item.otlBookedHours+(week2.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0)+
                        (week3.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0)+
                        (week4.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0)+
                        (week5.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0))-

                        (item.blankHours+(week2.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)+
                        (week3.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)+
                        (week4.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)+
                        (week5.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)));
                        
                    }else{
                        totalDifference=((item.otlBookedHours+(week2.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0)+
                        (week3.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0)+
                        (week4.find(week2Item=>week2Item.empName===item.empName)?.otlBookedHours||0))-

                        (item.blankHours+(week2.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)+
                        (week3.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)+
                        (week4.find(week2Item=>week2Item.empName===item.empName)?.blankHours||0)))
                    }
                }else{
                    totalDifference=(item.differenceInHours!==null?item.differenceInHours:null)+
                                        (week2.find(week2Item=>week2Item.empName===item.empName)?.differenceInHours||0)+
                                        (week3.find(week2Item=>week2Item.empName===item.empName)?.differenceInHours||0)+
                                        (week4.find(week2Item=>week2Item.empName===item.empName)?.differenceInHours||0)+
                                        (week5.find(week2Item=>week2Item.empName===item.empName)?.differenceInHours||0);
                }
                                        
                        console.log(totalDifference)
                        
                        let status;
                        if(totalDifference===null){
                            status='No Timex';
                        }else if(totalDifference===0){
                            status='Matched';
                        }else if(totalDifference>0){
                            status='Loss';
                        }
                        else if(totalDifference<0){
                            status='Revenue';
                        }
                        const statusStyle={
                            color:status==='Matched'?'green':(status==='Revenue'?'blue':(status==='Loss'?'red':'black'))
                        }
                                        return (
                        <tr key={index}>
                            <td>{item.empName}</td>
                            <td>{item.otlBookedHours}</td>
                            <td>{item.timexBookedHours!==null?item.timexBookedHours:'No Timex'}</td>
                            <td>{item.differenceInHours!==null?item.differenceInHours:item.otlBookedHours-item.blankHours}</td>
                            {week2.length>0?(
                            week2.map((week2Item,week2index)=>(
                                <React.Fragment key={week2index}>
                                    {week2Item.empName===item.empName&&(
                                        <>
                                        <td>{week2Item.otlBookedHours}</td>
                                        <td>{week2Item.timexBookedHours!==null?week2Item.timexBookedHours:'No Timex'}</td>
                                        <td>{week2Item.differenceInHours!==null?week2Item.differenceInHours:week2Item.otlBookedHours-week2Item.blankHours}</td>
                                        </>
                                    )}
                                </React.Fragment>
                            ))):(
                                <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                </>
                            )}
                            {week3.length>0?(
                            week3.map((week2Item,week2index)=>(
                                <React.Fragment key={week2index}>
                                    {week2Item.empName===item.empName&&(
                                        <>
                                        <td>{week2Item.otlBookedHours}</td>
                                        <td>{week2Item.timexBookedHours!==null?week2Item.timexBookedHours:'No Timex'}</td>
                                        <td>{week2Item.differenceInHours!==null?week2Item.differenceInHours:week2Item.otlBookedHours-week2Item.blankHours}</td>
                                        </>
                                    )}
                                </React.Fragment>
                            ))):(
                                <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                </>
                            )}
                            {week4.length>0?(
                             week4.map((week2Item,week2index)=>(
                                <React.Fragment key={week2index}>
                                    {week2Item.empName===item.empName&&(
                                        <>
                                        <td>{week2Item.otlBookedHours}</td>
                                        <td>{week2Item.timexBookedHours!==null?week2Item.timexBookedHours:'No Timex'}</td>
                                        <td>{week2Item.differenceInHours!==null?week2Item.differenceInHours:week2Item.otlBookedHours-week2Item.blankHours}</td>
                                        </>
                                    )}
                                </React.Fragment>
                            ))
                            ):(
                                <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                </>
                            )
                        }
                            {week5.length>0?(
                             week5.map((week2Item,week2index)=>(
                                <React.Fragment key={week2index}>
                                    {week2Item.empName===item.empName&&(
                                        <>
                                        <td>{week2Item.otlBookedHours}</td>
                                        <td>{week2Item.timexBookedHours!==null?week2Item.timexBookedHours:'No Timex'}</td>
                                        <td>{week2Item.differenceInHours!==null?week2Item.differenceInHours:week2Item.otlBookedHours-40}</td>
                                        </>
                                    )}
                                </React.Fragment>
                            ))
                            ):(
                                <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                </>
                            )}
                            
                            <td>{totalDifference!==null?totalDifference:'No Timex'}</td>
                            <td style={statusStyle}>{status}</td>
                        </tr>
                                        );
                            }
                            )}
            
                        </tbody>
            </table>
            
</div>
    </div>
    </>
  )
}

export default OtlTimexTableComponent