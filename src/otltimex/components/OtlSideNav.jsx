import React from 'react'
import AuthService from '../../rewards/pages/Service/AuthService'
import logo from '../../rewards/images/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import Clock from '../../main/Clock';
import '../pages/style.css'

const drawerWidth = 230;

const OtlSideNav = () => {
  const empName=localStorage.getItem('empName')
  const navigate=useNavigate();
const userRole = AuthService.getRole();
const logout=()=>{
    AuthService.logout();
    navigate('/')
}

const isPL_Man = userRole === 'ROLE_MANAGER'||userRole === 'ROLE_PROJECTLEAD';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{display:'flex',background:'white',boxShadow:'none',border:'solid',borderWidth:'0 0 1px 0',borderColor:'#E0E0E0'}}
      >
       
        <Toolbar>
        {isPL_Man && (
                <>
          <div >
            <Button variant='outlined' style={{marginLeft:'250px'}}>OTL AND TIMEX RECONCILATION MODULE</Button>
          </div>
          </>
            )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        style={{fontSize:'20px'}}
      >
        <Toolbar>
            <img src={logo} width={150}/>
        </Toolbar>
        <Divider />
        <List>
        <ListItem disablePadding>
                <ListItemButton >
                    <ListItemText>
                      <Link to='/otldashboard' style={{textDecoration:'none',color:'black'}}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Welcome, {empName} !</Typography>
                        <Typography variant="body1" sx={{ fontSize: '12px', }} color='black'><Clock/></Typography>
                      </Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem >
            <Link to='/otldashboard' style={{textDecoration:'none',color:'black'}}>
            <ListItem disablePadding style={{marginTop:'-15px'}}>
                <ListItemButton>
                    <ListItemIcon sx={{color:"#DD212A"}}>
                       <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText>
                      
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Dashboard</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem >
            </Link>
            {isPL_Man  && (
                <>
                      <Link to='/otldatatable' style={{textDecoration:'none',color:'black'}}>
                            <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{color:"#DD212A"}}>
                                  <TableChartSharpIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Data Table</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                       </Link>
                
                </>
            )}          
            
        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
                <ListItemButton disabled>
                    <ListItemIcon  sx={{color:"#F78121"}}>
                       <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>My Profile</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
                      <Link to='/passwordchange' style={{textDecoration:'none',color:'black'}}>
            <ListItem disablePadding>
                <ListItemButton disabled>
                    <ListItemIcon sx={{color:"#F78121"}}>
                       <LockResetIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black'>Change Password</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
                        </Link>
            <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                    <ListItemIcon sx={{color:"#F78121"}}>
                       <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText >
                        <Typography variant="body1" sx={{ fontSize: '14px' }} color='black' >Logout</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
      
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  
  )
}

export default OtlSideNav
