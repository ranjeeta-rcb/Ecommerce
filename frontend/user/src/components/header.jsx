import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';


function WishlistPopover({ open, anchorEl, handleClose }) {

    useEffect(() => {
        fetchWish();
    }, []);

    const [wish, setWish] = useState([]);

    const fetchWish = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/wishlist');
            setWish(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete('http://localhost:8081/wishlistdelete/' + id)
            console.log('Product removed successful');
            toast.success('Product removed successful', {
                position:"top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            fetchWish();
        }
        catch (err) {
            console.log('Error deleting product !', err);
        }

    };

    const handleRefreshWish = async () => {
        console.log('refresh');
        fetchWish();
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box sx={{ p: 2, width: 400 }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(to right, #c72092, #6c14d0)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 'bold',
                        marginBottom: 2,
                        fontFamily: 'Book Antiqua',
                        fontSize: 22
                    }}
                >
                    <span>WISHLIST PRODUCTS</span>
                    <IconButton onClick={() => handleRefreshWish()}>
                        <RefreshIcon />
                    </IconButton>
                </Typography>

                <div style={{ marginTop: '0px', overflow: 'auto', maxHeight: '400px' }}>
                <Grid container spacing={2}>
                    {wish?.map((data) => (
                        <Grid item xs={12} key={nanoid()}>
                            <Card sx={{ display: 'flex', flexDirection: 'row', width: '96%', alignItems: 'center' }}>
                                <CardMedia
                                    sx={{ width: 60, height: 60, marginRight: 2, marginTop: 2, marginLeft: 2, display: 'flex', alignItems: 'center' }}
                                    image={`http://localhost:8081/images/${data.image}`}
                                    title={data.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{fontFamily: 'Playfair Display'}}>
                                        {data.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{fontFamily: 'DM Sans'}}>
                                        ₹{data.price}
                                    </Typography>
                                </CardContent>
                                <IconButton
                                    edge="end"
                                    aria-label="Remove"
                                    sx={{
                                        marginLeft: 'auto',
                                        marginRight: 2,
                                        height: 'auto',
                                        '&:hover': {
                                            '& .MuiSvgIcon-root': {
                                                fill: 'red',
                                            },
                                        },
                                    }}
                                    onClick={() => handleRemoveItem(data.p_id)}
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </div>
            </Box>
        </Popover>
    );
}


function CartPopover({ open, anchorEl, handleClose }) {
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/cart');
            setCart(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete('http://localhost:8081/cartdelete/' + id)
            console.log('Product deleted successful');
            toast.success('Product deleted successful', {
                position:"top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            fetchCart();
        }
        catch (err) {
            console.log('Error deleting product !', err);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleOrder = async (e) => {
        e.preventDefault();

        try {
            const orderDate = new Date().toISOString();

            const productDetailPromises = cart.map(async (product) => {

                return {
                    product_id: product.p_id,
                    orderDate: orderDate,
                    price: product.price,
                };
            });

            const orderItems = await Promise.all(productDetailPromises);

            await axios.post('http://localhost:8081/orders', { orderItems });

            console.log('Order placed successfully');

            successfulOrder();
            handleClose();
            handleCloseModal();
            clearCart();
        }
        catch (error) {
            console.log('Error placing order:', error);
            toast.error('Error placing order', {
                position:"top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

    };

    const successfulOrder = () => {
        Swal.fire({
            icon: 'success',
            title: 'Order placed successfully',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        });
        
    };

    const clearCart = async () => {
        try {
            await axios.delete('http://localhost:8081/clearCart');
            console.log('Cart cleared');
            setCart([]);

        } catch (error) {
            console.log('Error clearing cart:', error);
        }
    };

    const handleRefreshCart = async () => {
        console.log('refresh');
        fetchCart();
    };

    return (

        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 2, width: 400 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'linear-gradient(to right, #c72092, #6c14d0)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 'bold',
                            marginBottom: 2,
                            fontFamily: 'Book Antiqua',
                            fontSize: 22
                        }}
                    >
                        <span>YOUR CART PRODUCTS</span>
                        <IconButton onClick={() => handleRefreshCart()}>
                            <RefreshIcon />
                        </IconButton>
                    </Typography>

                    <div style={{ marginTop: '0px', overflow: 'auto', maxHeight: '420px' }}>
                    <Grid container spacing={2}>
                        {cart?.map((data) => (
                            <Grid item xs={12} key={nanoid()}>
                                <Card sx={{ display: 'flex', flexDirection: 'row', width: '96%', alignItems: 'center' }}>
                                    <CardMedia
                                        sx={{ width: 60, height: 60, margin: 2, display: 'flex', alignItems: 'center' }}
                                        image={`http://localhost:8081/images/${data.image}`}
                                        title={data.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{fontFamily: 'Playfair Display'}}>
                                            {data.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{fontFamily: 'DM Sans'}}>
                                            ₹{data.price}
                                        </Typography>
                                    </CardContent>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        sx={{
                                            marginLeft: 'auto',
                                            marginRight: 2,
                                            height: 'auto',
                                            '&:hover': {
                                                '& .MuiSvgIcon-root': {
                                                    fill: 'red',
                                                },
                                            },
                                        }}
                                        onClick={() => handleDeleteItem(data.p_id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        sx={{
                            marginTop: 2,
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'linear-gradient(to right, #c72092, #6c14d0)',
                            color: '#ffff',
                            width: '100%'
                        }}
                    >
                        PROCEED TO BUY
                    </Button>

                    <Modal open={isModalOpen} onClose={handleCloseModal}>
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            padding: '20px', minWidth: '400px', backgroundColor: 'white', border: '2px solid #000', textAlign: 'center'
                        }}>
                            <Typography variant="h6" component="div"
                                sx={{
                                    background: 'linear-gradient(to right, #c72092, #6c14d0)',
                                    WebkitBackgroundClip: 'text', color: 'transparent',
                                    fontWeight: 'bold', marginBottom: 2
                                }}>
                                CART PRODUCTS
                            </Typography>

                            <Grid container spacing={2}>
                                {cart?.map((product) => (
                                    <Grid item key={product.p_id} xs={12} sm={3}>
                                        {product.image && <img src={`http://localhost:8081/images/${product.image}`}
                                            alt="Product Image" style={{ width: '50px', height: '50px' }} />}
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button onClick={handleCloseModal} variant="contained"
                                        sx={{
                                            mt: 2, width: '100%',
                                            backgroundColor: theme => theme.palette.error.main,
                                            '&:hover': { backgroundColor: '#ff0000' }
                                        }}>
                                        Close
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button type="submit" variant="contained"
                                        onClick={handleOrder}
                                        sx={{
                                            mt: 2, width: '100%',
                                            backgroundColor: theme => theme.palette.success.main,
                                            '&:hover': { backgroundColor: '#00cc00' }
                                        }}>
                                        Place Order
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Modal>
                </Box>
            </Popover>
        </>
    );
}


function Header() {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [wishlistPopoverOpen, setWishlistPopoverOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cartPopoverOpen, setCartPopoverOpen] = React.useState(false);
    const [cartAnchorEl, setCartAnchorEl] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenWishlistPopover = (event) => {
        setAnchorEl(event.currentTarget);
        setWishlistPopoverOpen(true);
    };

    const handleCloseWishlistPopover = () => {
        setAnchorEl(null);
        setWishlistPopoverOpen(false);
    };

    const handleOpenCartPopover = (event) => {
        setCartAnchorEl(event.currentTarget);
        setCartPopoverOpen(true);
    };

    const handleCloseCartPopover = () => {
        setCartAnchorEl(null);
        setCartPopoverOpen(false);
    };

    useEffect(() => { fetchData() }, [])

    const [items, setItems] = useState([])
    const fetchData = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/cartCount')
            setItems(resp.data)
            console.log(resp);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <AppBar position="fixed" sx={{ left: 0, right: 0, background: 'white', color: 'black' }}>
                <Toolbar disableGutters sx={{ maxWidth: 'xl' }}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            marginLeft: 8,
                            display: { xs: 'none', md: 'flex' },
                            fontfamily: 'Protest Riot, sans-serif',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}
                        onClick={() => { navigate("/") }}
                    >
                        <span className='logo'>Footwea<span>r</span></span>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={() => { navigate("/") }}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate("/products") }}>
                                <Typography textAlign="center">Products</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate("/aboutUs") }}>
                                <Typography textAlign="center">About Us</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate("/contactUs") }}>
                                <Typography textAlign="center">Contact Us</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontfamily: 'Protest Riot, sans-serif',
                            fontWeight: 700,
                            textDecoration: 'none',
                        }}
                    >
                        <span className='logo'>Footwea<span>r</span></span>
                    </Typography>
                    <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={() => { navigate("/") }}
                            sx={{
                                my: 2, color: 'black', display: 'block', '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiTypography-root': {
                                        color: '#c72092 ',
                                    },
                                },
                                marginRight: '20px'
                            }} >
                            <Typography variant="body1" >
                                Home
                            </Typography>
                        </Button>
                        <Button onClick={() => { navigate("/products") }}
                            sx={{
                                my: 2, color: 'black', display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiTypography-root': {
                                        color: '#c72092 ',
                                    },
                                },
                                marginRight: '20px'
                            }}>
                            <Typography variant="body1" >
                                Products
                            </Typography>
                        </Button>
                        <Button onClick={() => { navigate("/aboutUs") }}
                            sx={{
                                my: 2, color: 'black', display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiTypography-root': {
                                        color: '#c72092 ',
                                    },
                                },
                                marginRight: '20px'
                            }}>
                            <Typography variant="body1" >
                                About Us
                            </Typography>
                        </Button>
                        <Button onClick={() => { navigate("/contactUs") }}
                            sx={{
                                my: 2, color: 'black', display: 'block',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiTypography-root': {
                                        color: '#c72092 ',
                                    },
                                },
                            }}>
                            <Typography variant="body1" >
                                Contact Us
                            </Typography>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open Whishlist">
                            <IconButton sx={{
                                p: 20 + 'px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    '& svg': {
                                        color: '#c72092',
                                    },
                                },
                            }} onClick={handleOpenWishlistPopover}>
                                <FavoriteIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Tooltip>

                        <WishlistPopover open={wishlistPopoverOpen} anchorEl={anchorEl} handleClose={handleCloseWishlistPopover} />

                        <Tooltip title={`Open Cart (${items.totalitems} items)`} arrow>
                            <IconButton
                                sx={{
                                    p: 20 + 'px',
                                    position: 'relative',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        '& svg': {
                                            color: '#c72092',
                                        },
                                    },
                                }}
                                onClick={handleOpenCartPopover}
                            >
                                <div style={{ position: 'relative' }}>
                                    <ShoppingCartIcon sx={{ color: 'black' }} />
                                    {items.totalitems > 0 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '-25%',
                                                right: '0%',
                                                backgroundColor: '#EE5632',
                                                borderRadius: '50%',
                                                padding: '2px 6px',
                                                color: 'white',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {items.totalitems}
                                        </div>
                                    )}
                                </div>
                            </IconButton>
                        </Tooltip>
                        <CartPopover open={cartPopoverOpen} anchorEl={cartAnchorEl} handleClose={handleCloseCartPopover} />

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 10 + 'px' }}>
                                <Avatar alt="S" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={() => { navigate("/account") }}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate("/signin") }}>
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate("/signup") }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
