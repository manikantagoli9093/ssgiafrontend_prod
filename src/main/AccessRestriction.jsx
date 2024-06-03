import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../rewards/pages/Service/AuthService'

const AccessRestriction = () => {
    const navigate=useNavigate();
    const logout=()=>{
        AuthService.logout();
        navigate('/')
    }
  return (
    <div>
            {/* Render a login component or redirect to login page */}
                  <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: '2rem' }}>
                            You do not have access to view this page.
                  </Typography> 
                                  {/* You can add login form or redirect logic here */} 
                <Box sx={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
                <Button onClick={logout} component={Link} to="/" variant="contained" color="primary" >
                       Login Again         
                </Button>
                </Box>
      </div>
  )
}

export default AccessRestriction