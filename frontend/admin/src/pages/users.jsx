import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Sidebar from '../components/sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },

  [`& .delete-icon:hover`]: {
    color: '#ff0000',
  },
  
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Users() {

  useEffect(() => {fetchData()}, [])

  const [data, setData] = useState([])
  const fetchData = async () => {
      try {
          const resp = await axios.get('http://localhost:8081/userslist')
          setData(resp.data)
          console.log(resp);
      } catch (error) {
          console.log(error);
      }

  }
  
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/deleteuser/'+id)
      toast.success('User deleted successful');
      fetchData();
    }
    catch (err) {
      console.log(err);
    }

  };

  return (
    <div>
      <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">Serial Number</StyledTableCell>
                  <StyledTableCell align="center">First Name</StyledTableCell>
                  <StyledTableCell align="center">Last Name</StyledTableCell>
                  <StyledTableCell align="center">Gmail</StyledTableCell>
                  <StyledTableCell align="center">Password</StyledTableCell>
                  <StyledTableCell align="center">Remove</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="center">{d.fname}</StyledTableCell>
                    <StyledTableCell align="center">{d.lname}</StyledTableCell>
                    <StyledTableCell align="center">{d.mail}</StyledTableCell>
                    <StyledTableCell align="center">{d.pass}</StyledTableCell>
                    <StyledTableCell align="center"><IconButton aria-label="delete" onClick={ e => handleDelete(d.u_id)}>
                      <DeleteIcon className="delete-icon" />
                    </IconButton></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  )
}

export default Users;
