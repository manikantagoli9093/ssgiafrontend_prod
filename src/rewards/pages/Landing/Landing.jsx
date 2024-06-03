import React, { useEffect, useRef, useState } from 'react';
import iconimage from '../../images/soprasteria.jpg'
import Login from '../Login/login';
import axios from 'axios';



const LandingPage = () => {
  // const[reloadTriggered,setreloadTriggered]=useState(false);
  // const hasReloaded=useRef(false);
  // useEffect(()=>{

  //   if(!hasReloaded.current){
  //     hasReloaded.current=true;
      
  //     console.log('running')
  //     const reloadTimeout=setTimeout(()=>{
  //       window.location.reload();
  //     },1000);
      
  //     return ()=> clearTimeout(reloadTimeout);
  //   }
  //   },[1]);
    
    
  
  const containerStyle = {
    display: 'flex',
    
    // justifyContent: 'space-between', // Align divisions to the left and right
  };

  const leftDivisionStyle = {
    width: '48%', // Adjust the width as needed
  };

  const rightDivisionStyle = {
    width: '48%',
    // background:'#F2F6FA' // Adjust the width as needed
  };

  return (
    <div style={containerStyle}>
      <div style={leftDivisionStyle}>
        <img src={iconimage} alt="Left Image" style={{ width: '70%', height: 'auto', margin:'8%',marginLeft:'20%' }} />
      </div>
      <div style={rightDivisionStyle}>
        <Login/>
      </div>
    </div>
  );
};

export default LandingPage;
