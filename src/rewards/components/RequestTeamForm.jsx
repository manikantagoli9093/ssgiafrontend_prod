import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const RequestTeamForm = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [options, setOptions] = useState([]);
    const [teamoptions, setTeamOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedTeamOption, setSelectedTeamOption] = useState('');
    const token=localStorage.getItem('token')
    const BASE_URL=localStorage.getItem('BASE_URL')
    // const [empId,setEmpId]=useState('');
    const [comments,setComments]=useState('');
    const [teamDropDown,setTeamDropDown]=useState({});
    const [team,setTeam]=useState({});
    const [loading, setLoading] = useState(true);
    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
      RequestTeamForm.openModal = openModal;

      // useEffect(()=>{
      //   const storedEmployeeId=localStorage.getItem('empId');
      //   if(storedEmployeeId){
      //     setEmpId(storedEmployeeId);
      //   }
      // },[]);
      const empId=localStorage.getItem('empId')
    
      useEffect(()=>{
        const fetchOptions=async()=>{
          try{
            setLoading(true);
            const response=await axios.get(`${BASE_URL}/api/getAllTeamRewards`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
          
           
            setOptions(response.data);
            
            setLoading(false);
          }catch(error){
            console.error('Error fetching options:',error);
            setLoading(false);
          }
        };
        fetchOptions();
      },[]);

    

      useEffect(()=>{
        const fetchTeamOptions=async()=>{
          try{
            setLoading(true);
            const response=await axios.get(`${BASE_URL}/api/allTeams`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              },
            });
            // console.log(response.data)
            const filteredOptions=response.data.filter((option)=>option.teamMaster===empId);
            // console.log(filteredOptions)
            setTeamOptions(filteredOptions);
            setLoading(false);
          }catch(error){
            console.error('Error fetching options:',error);
            setLoading(false);
          }
        };
        fetchTeamOptions();
      },[]);
      // const filterOptionsByEmpId=(options,empId)=>{
      //   if(empId==="102"){
      //     return options.filter(option=>option.teamId==="102"||option.teamId==="103"||option.teamId==="106");
      //   }
      //   if(empId==="105"){
      //     return options.filter(option=>option.teamId==="101"||option.teamId==="104"||option.teamId==="105");
      //   }
      //   return [];
      // }
    
      const handleOptionChange = (event) => {
        const selectedRewardName = event.target.value;
        setSelectedOption(selectedRewardName);
        const selectedRewardObject = options.find(option => option.teamRewardName === selectedRewardName);
        setTeamDropDown(selectedRewardObject);
    
      };
      const handleTeamOptionChange = (event) => {
        const selectedTeamRewardName = event.target.value;
        setSelectedTeamOption(selectedTeamRewardName);
        const selectedTeamRewardObject = teamoptions.find(option => option.teamName === selectedTeamRewardName);
        setTeam(selectedTeamRewardObject);
    
      };
      const handleCommentChange = (event) => {
        setComments(event.target.value);
      };

      const handleSubmit = async (event) => {
        setSubmitting(true);
        event.preventDefault();
        const selectedOptionObject = options.find(option => option.rewardName === selectedOption);
        const status="Pending"
        try {
          const headers={
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token,
          }
          const response = await axios.post(`${BASE_URL}/api/submitTeam/${empId}`,{
            comments:comments,
            team:team,
            teamDropDown:teamDropDown
            
          },{headers});
          // Handle the response as needed
          // console.log('Response:', response.data);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          alert('Submitted Successfully')
          setSubmitting(false);
          window.location.reload(true);
        } catch (error) {
          // Handle errors
          console.error('Error:', error);
          setSubmitting(false);
        }
      };
   
  return (
    <div>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Request Team Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
          <InputLabel id="select-label">Select Team</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedTeamOption}
            onChange={handleTeamOptionChange}
            required
          >
            {loading?(
              <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem>
            ):(
            teamoptions.map((option) => (
              <MenuItem key={option.teamId} value={option.teamName}>
                {option.teamName}
              </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-label">Select Option</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={selectedOption}
            onChange={handleOptionChange}
            required
          >
            {loading?(
              <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem>
            ):(
            options.map((option) => (
              <MenuItem key={option.trddId} value={option.teamRewardName}>
                {option.teamRewardName}
              </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          id="comments"
          label="Comments"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={comments}
          onChange={handleCommentChange}
          required
        />

        <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={submitting}
            // disableElevation={submitting}
            startIcon={submitting && <CircularProgress size={20}/>}
        >
          {submitting ? 'Submitting...Please wait' : 'Submit'}
        </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RequestTeamForm
