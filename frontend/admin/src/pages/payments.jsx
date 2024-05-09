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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function Payments() {

  useEffect(() => {fetchData()}, [])

  const [data, setData] = useState([])
  const fetchData = async () => {
      try {
          const resp = await axios.get('http://localhost:8081/paymentstable')
          setData(resp.data)
          console.log(resp);
      } catch (error) {
          console.log(error);
      }

  }

  return (
    <div>
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">Serial Number</StyledTableCell>
                  <StyledTableCell align="center">Payment Type</StyledTableCell>
                  <StyledTableCell align="center">Payment Date</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="center">{d.type}</StyledTableCell>
                    <StyledTableCell align="center">{d.orderDate}</StyledTableCell>
                    <StyledTableCell align="center">₹{d.amount}</StyledTableCell>
                    <StyledTableCell align="center">{d.status}</StyledTableCell>
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

export default Payments;
