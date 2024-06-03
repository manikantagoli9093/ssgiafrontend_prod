import React, { useState } from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import AccessRestriction from '../../main/AccessRestriction';
import LogRestriction from '../../main/LogRestriction';
import AuthService from '../../rewards/pages/Service/AuthService';
import FinancialYear from '../components/FinancialYear';
 
const UploadPage = () => {
  const [otlFile, setotlFile] = useState(null);
  const [timexFile, settimexFile] = useState(null);
  const [periodName, setperiodName] = useState('');
  const [weekNumber, setweekNumber] = useState('');
  const userRole = AuthService.getRole();
  const isUploader = userRole === 'ROLE_UPLOAD';
  const isLoggedIn=localStorage.getItem('isLoggedIn')
  const BASE_URL=localStorage.getItem('BASE_URL')
  const yearNumber=localStorage.getItem('year')
  const token=localStorage.getItem('token')

  const periods=["P1","P2","P3","P4","P5","P6","P7","P8","P9","P10","P11","P12"];
  const weeks=[
    "Week_1","Week_2","Week_3","Week_4","Week_5"
  ]
 
  const handleotlFileChange = (e) => {
    setotlFile(e.target.files[0]);
  };
 
  const handletimexFileChange = (e) => {
    settimexFile(e.target.files[0]);
  };
  const handleOptionChange= (e) => {    
    setperiodName(e.target.value);
  };
  const handleOption2Change = (e) => {
    setweekNumber(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('otlFile', otlFile);
      formData.append('timexFile', timexFile);
      // Your API endpoint to handle file upload
      const headers={
        'Content-Type':'multipart/form-data',
        'Authorization':'Bearer '+token,
      }
      const params={
        periodName,
        weekNumber,
        yearNumber

      }
      const response = await axios.post(`${BASE_URL}/api/upload`,formData,{headers,params});
 
      console.log(response.data); // Handle response as needed
      alert("Submitted Successfully")
      window.location.reload();
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  };
 
  return isLoggedIn? (
     isUploader?(
    <>
    
    {/* <OtlSideNav/> */}
    <div style={{marginLeft:'20%',marginTop:'30px',width:'40%'}}>
      <FinancialYear/>
    <Container>
   <form onSubmit={handleSubmit}>
    
    <Grid item xs={12} style={{marginBottom:'15px'}}>
        <FormControl fullWidth>
        <InputLabel id="dropdown-label" required>Select Period</InputLabel>
        <Select
                    labelId="dropdown-label"
                    value={periodName}
                    onChange={handleOptionChange}
                    required
        >
       {periods.map((option,index)=>(
        <MenuItem key={index} value={option}>{option}</MenuItem>
       ))}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} style={{marginBottom:'20px'}}>
        <FormControl fullWidth>
        <InputLabel id="dropdown-label2" required>Select Week</InputLabel>
        <Select
                    labelId="dropdown-label2"
                    value={weekNumber}
                    onChange={handleOption2Change}
                    required
        >
       {weeks.map((option,index)=>(
        <MenuItem key={index} value={option}>{option}</MenuItem>
       ))}
        </Select>
        </FormControl>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
                    fullWidth
                    type="file"
                    onChange={handleotlFileChange}
                    label="Upload OTL File"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
        </Grid>
        <Grid item xs={12}>
        <TextField
                    fullWidth
                    type="file"
                    onChange={handletimexFileChange}
                    label="Upload TIMEX File"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
        </Grid>
        <Grid item xs={12}>
        <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    // onClick={handleSubmit}
                    disabled={!otlFile || !timexFile}
        >
                    Submit
        </Button>
        </Grid>
        </Grid>
</form>
        </Container>
</div>
</>

):(
    <>
    <AccessRestriction/>
    </>
  )
  
):(
    <>
   <LogRestriction/>
    </>
  );
};
 
export default UploadPage;