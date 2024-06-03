import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import "./style.css"
const DataTable2 = ({data,heading,loading}) => {
    const tableHeadStyle = {
        borderRadius: '10px', // You can adjust the value as needed
        backgroundColor: '#00539F',
        border: '1px solid #ccc',
      };
      const tableCellStyle = {
        color:'white',
        fontWeight:"5px"
      };
      const tableBodyStyle = {
        border: '1px solid #ccc',
      };
  return (
    <div>
      <TableContainer className="table-container">
        <Table style={{width:'80%'}}>
            <TableHead style={tableHeadStyle}>
                <TableRow  className="table-header">
                    <TableCell style={tableCellStyle}>
                        Team Name
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                        Reward
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                        Points
                    </TableCell >
                    <TableCell style={tableCellStyle} >
                        Comments
                    </TableCell>
                    <TableCell style={tableCellStyle}>
                        Status
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody style={tableBodyStyle}>
                {
                    loading?(
                        <TableRow>
                            <TableCell colSpan={5}>
                                <CircularProgress size={20}/>Loading...
                            </TableCell>
                        </TableRow>
                    ):(
                        data.map((row)=>(
                            <TableRow key={row.teamRewardId}>
                                <TableCell>{row.team.teamName}</TableCell>
                                <TableCell>{row.teamDropDown.teamRewardName}</TableCell>
                                <TableCell>{row.teamDropDown.teamRewardPoints}</TableCell>
                                <TableCell>{row.comments}</TableCell>
                                <TableCell style={{color:getStatusColor(row.status)}}>{row.status}</TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
const getStatusColor=(status)=>{
    switch(status){
        case 'Pending':
            return 'orange'
        case 'Rejected':
            return 'red'
        case 'Approved':
            return 'green'
        default:
            return 'black'
    }
};

export default DataTable2
