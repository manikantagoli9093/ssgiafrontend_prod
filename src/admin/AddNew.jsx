import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
 
const AddNew = () => {
  const [project, setProject] = useState('');
  const [team, setTeam] = useState('');
  const [application, setApplication] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [defaultPassword] = useState('soprasteria'); // Fixed default password value
  const [parentEmpId, setParentEmpId] = useState('');
  const [lineManager, setLineManager] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
 
  return (
    <div >
        <form onSubmit={handleSubmit}>
            <div>
        <FormControl style={{ margin: '8px', minWidth: '120px',width:'20%' }}>
        <InputLabel id="project-label">Project</InputLabel>
        <Select
                labelId="project-label"
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
        >
        <MenuItem value="Project A">Project A</MenuItem>
        <MenuItem value="Project B">Project B</MenuItem>
        <MenuItem value="Project C">Project C</MenuItem>
        </Select>
        </FormControl>
        </div>
        <div>
            <FormControl style={{ margin: '8px', minWidth: '120px',width:'20%' }}>
        <InputLabel id="team-label">Team</InputLabel>
        <Select
                labelId="team-label"
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
        >
        <MenuItem value="Team X">Team X</MenuItem>
        <MenuItem value="Team Y">Team Y</MenuItem>
        <MenuItem value="Team Z">Team Z</MenuItem>
        </Select>
        </FormControl>
        </div>
        <div>
            <FormControl style={{ margin: '8px', minWidth: '120px',width:'20%' }}>
        <InputLabel id="application-label">Application</InputLabel>
        <Select
                labelId="application-label"
                id="application"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
        >
        <MenuItem value="App 1">App 1</MenuItem>
        <MenuItem value="App 2">App 2</MenuItem>
        <MenuItem value="App 3">App 3</MenuItem>
        </Select>
        </FormControl>
        </div>
        <div>
            <TextField 
                id="fullName"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ margin: '8px',width:'20%' }}
            />
        </div>
        <div>
            <TextField
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '8px' ,width:'20%'}}
            />
         </div>
         <div>
            <TextField
                id="defaultPassword"
                label="Default Password"
                value={defaultPassword}
                disabled
                style={{ margin: '8px' ,width:'20%'}}
            />
         </div>
         <div>
            <TextField
                id="parentEmpId"
                label="Line Manager Employee ID"
                value={parentEmpId}
                onChange={(e) => setParentEmpId(e.target.value)}
                style={{ margin: '8px' ,width:'20%'}}
            />
         </div>
         <div>
            {/* <FormControl style={{ margin: '8px', minWidth: '120px' ,width:'20%'}}>
        <InputLabel id="lineManager-label">Line Manager</InputLabel>
        <Select
                labelId="lineManager-label"
                id="lineManager"
                value={lineManager}
                onChange={(e) => setLineManager(e.target.value)}
        >
        <MenuItem value="Manager A">Manager A</MenuItem>
        <MenuItem value="Manager B">Manager B</MenuItem>
        <MenuItem value="Manager C">Manager C</MenuItem>
        </Select>
        </FormControl> */}
        </div>
        <div>
            <Button type="submit" variant="contained" color="primary" style={{ margin: '8px' }}>
                Submit
        </Button>
        </div>
        </form>
</div>
  );
};
 
export default AddNew;