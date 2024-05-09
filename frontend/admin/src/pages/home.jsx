import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../dashboard.css';
import BarChart from '../components/barChat';
import PieChart from '../components/pieChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Sidebar from '../components/sidebar';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';


function Home() {

    useEffect(() => { fetchData() }, [])

    const [amount, setAmount] = useState([])
    const fetchData = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/totalamount')
            setAmount(resp.data)
            console.log(resp);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => { fetchOrders() }, [])

    const [orders, setOrders] = useState([])
    const fetchOrders = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/totalorders')
            setOrders(resp.data)
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/totalProducts')
            setProducts(resp.data)
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchUsers() }, [])

    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/totalUsers')
            setUsers(resp.data)
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bgcolor'>
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack direction="row" spacing={2}>
                                <Card id='gradient' sx={{ height: 152, minWidth: 49 + "%" }} >
                                    <CardContent>
                                        <div id='iconstyle2'>
                                            <CreditCardIcon />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff", marginLeft: 20 + 'px' }}>
                                            ₹<CountUp end={amount.totalEarnings || 0}/>
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1", marginLeft: 20 + 'px' }}>
                                            Total Earning
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card id='gradient1' sx={{ height: 152, minWidth: 49 + "%" }}>
                                    <CardContent>
                                        <div id='iconstyle3'>
                                            <LocalShippingIcon />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff", marginLeft: 20 + 'px' }}>
                                            <CountUp end={orders.totalOrders}/>
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1", marginLeft: 20 + 'px' }}>
                                            Total Orders
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card id='gradient2' sx={{ minWidth: 345 }}>
                                    <Stack direction="row" spacing={2}>
                                        <div id='iconstyle'>
                                            <StorefrontIcon />
                                        </div>
                                        <div id='paddingAll' >
                                            <span id='cardtitle' ><CountUp end={products.totalProducts}/></span>
                                            <br />
                                            <span id='cardsubtitle' >Total Products</span>
                                        </div>
                                    </Stack>
                                </Card>
                                <Card sx={{ minWidth: 345 }}>
                                    <Stack direction="row" spacing={2}>
                                        <div id='iconstyle1'>
                                            <PersonIcon />
                                        </div>
                                        <div id='paddingAll1' >
                                            <span id='cardtitle1' ><CountUp end={users.totalUsers}/></span>
                                            <br />
                                            <span id='cardsubtitle1' >Total Users</span>
                                        </div>
                                    </Stack>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                    <BarChart />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                    <PieChart />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default Home;
