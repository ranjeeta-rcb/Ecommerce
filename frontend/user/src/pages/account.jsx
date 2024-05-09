import Header from '../components/header';
import Footer from '../components/footer';
import './product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


function Account() {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const resp = await axios.get('http://localhost:8081/getOrders');
      setOrder(resp.data);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmPay = async (productId, orderId) => {
  
    Swal.fire({
      title: 'Confirm Payment?',
      text: 'Are you sure to pay',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: 'red',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      customClass: {
        confirmButton: 'swal2-btn-custom',
        cancelButton: 'swal2-btn-custom',
      },
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
    
        confirmButton.addEventListener('click', () => {
          handlePayNow(productId, orderId);
          handleOrder(orderId);
        });
    
        cancelButton.addEventListener('click', () => {
          Swal.close();
        });
      }
    });
    
    

  };

  const handlePayNow = async (productId, orderId) => {

    try {
      const selectedOrder = order.find((o) => o.p_id === productId);
      const oId = orderId;
      const currentDate = new Date().toISOString();
      const productPrice = selectedOrder.price;
      const type = 'online';
      const status = 'paid';

      const paymentResponse = await axios.post('http://localhost:8081/addtopayments', {
        oId,
        currentDate,
        productPrice,
        type,
        status,
      });

      fetchOrder();

      console.log('GG');
      console.log('Payment successful', paymentResponse.data);
      await Swal.fire({
        icon: 'success',
        title: 'Payment successful',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });

    }
    catch (err) {
      console.log('Error in payment!', err);
      toast.error('Error in payment!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const handleOrder = async (orderId) => {

    const status = 'paid';

    try {
      const response = await axios.put('http://localhost:8081/updateOrders/' + orderId,{status});
      console.log(response.data.message);
      console.log('gg');
      fetchOrder();
    } catch (err) {
      console.log('Error in payment!', err);
    }
  }

  const showAlert = () => {
  
    Swal.fire({
      title: 'Under Construction',
      html: '<div style="color: green;">This feature is currently under construction</div>',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };


  return (
    <>
      <Header />
      <div style={{ marginTop: 70, display: 'flex' }}>

        <div style={{ width: '40%', padding: '20px' }}>
          <Card id='profile' sx={{ maxWidth: 400, margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardMedia
              component="img"
              alt="Profile Pic"
              image="/image/user.png"
              sx={{
                height: 150,
                width: 150,
                borderRadius: '50%',
                margin: 'auto',
                marginTop:5,
                marginBottom: 4
              }}
            />

            <Divider variant="middle" sx={{ width: '80%', margin: '12px auto' }} />

            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontFamily: 'Playfair Display', color: '#2c3e50', fontWeight: 'bold' }} >
                USER
              </Typography>
              <Typography variant="body1" component="div" sx={{ color: "#3498db", fontFamily: 'Playfair Display', fontSize: '18px'}} >
                user@gmail.com
              </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ width: '80%', margin: '12px auto' }} />

            <CardContent sx={{ display: 'flex', alignItems: 'center', 
            justifyContent: 'center', textAlign: 'center',
            cursor: 'pointer'
           }} 
            onClick={() => showAlert()} >
              <NotificationsNoneIcon sx={{ fontSize: 29, mr: 2 }} />
              <Typography variant="h6" component="div" sx={{fontFamily: 'Book Antiqua', fontWeight: 'bold' }}>
                NOTIFICATIONS
              </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ width: '80%', margin: '12px auto' }} />

            <CardContent sx={{ display: 'flex', alignItems: 'center', 
            justifyContent: 'center', textAlign: 'center',
            cursor: 'pointer'
             }}
             onClick={() => showAlert()} >
              <LocalOfferOutlinedIcon sx={{ fontSize: 29, mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ fontFamily: 'Book Antiqua', fontWeight: 'bold' }}>
                NEW SALE OFFER
              </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ width: '80%', margin: '12px auto' }} />

            <CardContent sx={{ display: 'flex', alignItems: 'center', 
            justifyContent: 'center', textAlign: 'center',
            cursor: 'pointer'
             }}
             onClick={() => showAlert()} >
              <SettingsOutlinedIcon sx={{ fontSize: 29, mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ fontFamily: 'Book Antiqua', fontWeight: 'bold' }}>
                PROFILE SETTING
              </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ width: '80%', margin: '12px auto' }} />

            <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button size="small" variant="outlined" color="primary" onClick={() => showAlert()}>
                Share Profile
              </Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => showAlert()}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>

        <div style={{ width: '60%' }}>
          <h2 className='orderText'>
            ORDER DETAILS
          </h2>

          <Divider variant="middle" sx={{ margin: '0px 0px' }} />

          <div style={{ marginTop: '0px', overflow: 'auto', height: '608px', borderLeft: '1px solid #ccc' }}>

            {order?.map((data) => (
              <Card key={nanoid()} sx={{ width: '96%', marginTop: 2, marginLeft: 2, display: 'flex', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  alt={data.title}
                  image={`http://localhost:8081/images/${data.image}`}
                  sx={{ height: 90, width: 80, marginTop: 1, marginBottom: 1, marginLeft: 5 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', width: '73%' }}>
                  <CardContent sx={{ marginLeft: 5 }}>
                    <Typography variant="h6" component="div" sx={{fontFamily: 'Playfair Display'}}>
                      {data.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{fontFamily: 'DM Sans'}}>
                      ₹{data.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{fontFamily: 'DM Sans'}}>
                      Order Date : {data.date.substring(0, 10)}
                    </Typography>
                  </CardContent>
                </div>
                <div style={{}}>
                  <CardActions>
                    {data.status === 'paid' ? (
                      <Button size="small" variant="outlined" disabled >
                        Pay Now
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined" color="primary" onClick={() => confirmPay(data.p_id, data.o_id)} >
                        Pay Now
                      </Button>
                    )}
                  </CardActions>
                </div>
              </Card>
            ))}

          </div>
          <Divider variant="middle" sx={{ margin: '0px 0px' }} />

        </div>

      </div >
      <Footer />
    </>
  )
}

export default Account;
