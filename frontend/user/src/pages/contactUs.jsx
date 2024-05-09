import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles.css';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { Grid, Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';


function ContactUs() {
  return (
    <>
      <Header />
      <div className="contact">

        <h1 className='h1'>Contact<span>Us</span></h1>

        <Divider variant="middle" sx={{ width: '85%', borderWidth: '1.5px', marginBottom: '15px'}} />

        <h1 className='subh'>We would be happy to assist you with any information you may need</h1>

        <Grid container spacing={4} justifyContent="space-between">

          <Grid item xs={12} sm={4}>
            <Box className="contact-box" >
              <PhoneInTalkIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#0093FD')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Our Tollfree Number</Typography>
                <Typography variant='h6'>123 456 7890</Typography>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="contact-box" >
              <WhatsAppIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'green')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Chat Now</Typography>
                <Typography variant='h6'>98745 63210</Typography>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="contact-box" >
              <EmailIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#EA4335')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Email Us</Typography>
                <Typography variant='h6'>contact@gmail.com</Typography>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="contact-box" >
              <FacebookIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#006EFD')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Reach Us On</Typography>
                <Typography variant='h6'>FACEBOOK</Typography>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="contact-box" >
              <XIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Reach Us On</Typography>
                <Typography variant='h6'>X(Prev. Twitter)</Typography>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="contact-box">
              <InstagramIcon fontSize="large" 
              style={{ width: '80px', height: '80px', marginBottom: '20px', marginTop: '20px' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#FD009F')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#000000')} 
              />
              <div>
                <Typography variant='h6' sx={{mb:2, fontFamily: 'Book Antiqua', fontWeight: 'bold'}}>Reach Us On</Typography>
                <Typography variant='h6'>INSTAGRAM</Typography>
              </div>
            </Box>
          </Grid>

        </Grid>

      </div>

      
      <Footer />
    </>
  )
}

export default ContactUs;
