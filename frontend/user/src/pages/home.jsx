import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles.css';

function Home (){

  return (
    <>
      <Header/>
      <div style={{marginBottom: 100}}>
        <section>
        <div className="main" id="Home">
            <div className="main_content">
                <div className="main_text">
                    <h1>Footwear<br/><span>Collection</span></h1>
                    <p>
                        Welcome to FOOTWEAR, where fashion meets comfort in every step. Explore our extensive collection of premium 
                        footwear designed to elevate your style and enhance your stride. Whether you're seeking casual sneakers, elegant 
                        heels, or rugged boots, our curated selection offers a perfect blend of trendsetting designs and unparalleled 
                        comfort.
                    </p>
                </div>
                <div className="main_image">
                    <img src="/image/shoes.png"/>
                </div>
            </div>
            <div className="social_icon">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin-in"></i>
            </div>
            <div className="button" >
                <a href='/products'>SHOP NOW</a>
                <i className="fa-solid fa-chevron-right"></i>
            </div>
        </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default Home
