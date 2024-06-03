import { ThemeProvider } from '@emotion/react';
import './App.css';
import LandingPage from './rewards/pages/Landing/Landing'
import theme from './rewards/theme/theme';
import Dashboard from './rewards/pages/Dashboard/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import MyRewards from './rewards/pages/Rewards/MyRewards';
import MyTeamRewards from './rewards/pages/Rewards/MyTeamRewards';
import Pending from './rewards/pages/Rewards/Pending';
import Requests from './rewards/pages/Rewards/Requests';
import OtlDashboard from './otltimex/pages/OtlDashboard';
import OtlDataTable from './otltimex/pages/OtlDataTable';
import AppDashboard from './main/AppDashboard';
import UploadPage from './otltimex/pages/OtlUploadPage';
import AddNew from './admin/AddNew';
import Leaderboard from './rewards/pages/Rewards/Leaderboard';





function App() {
  
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path='*' element={<>Path not found</>}></Route> */}
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/myrewards' element={<MyRewards/>}/>
        <Route path='/myteamrewards' element={<MyTeamRewards/>}/>
        <Route path='/Leaderboard' element={<Leaderboard/>}/>
        {/* <Route path='/passwordchange' element={<PasswordChangeForm/>}/> */}
        {/* <Route path='/pendingapprovals' element={<PendingApprovals/>}/> */}
        <Route path='/pending' element={<Pending/>}/>
        {/* <Route path='/pendingteamapprovals' element={<PendingTeamApprovals/>}/> */}
        {/* <Route path='/employeerequests' element={<ManagerElement><EmployeeRequests/></ManagerElement>}/> */}
        {/* <Route path='/teamrequests' element={<ManagerElement><TeamRequests/></ManagerElement>}/> */}
        <Route path='/requests' element={<ManagerElement><Requests/></ManagerElement>}/>
      </Routes>
    </ThemeProvider>
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path='/otlsidenav' element={<OtlSideNav/>}/> */}
        <Route path='/otldashboard' element={<OtlDashboard/>}/>
        <Route path='/otldatatable' element={<OtlDataTable/>}/>
        <Route path='/uploadpage' element={<UploadPage/>}/>
      </Routes>
    </ThemeProvider>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/appdashboard' element={<AppDashboard/>}/>
        <Route path='/addnew' element={<AddNew/>}/>
      </Routes>
    </ThemeProvider>
    
    </>
  );
}

function ManagerElement({children}){
  const role=localStorage.getItem('role')
  if(role=='ROLE_MANAGER'||'ROLE_ADMIN'){
    return<>{children}</>;
}else{
  alert('You are not manager! Logging you out...Please login again')
  return <Navigate to={'/'}/>;
}
}

export default App;
