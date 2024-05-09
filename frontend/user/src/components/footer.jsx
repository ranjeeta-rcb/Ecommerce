import React from 'react';
import './style.css';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer() {

    const [values, setValues] = useState({
        email:''
    })

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: [event.target.value] })
    }

    const handleSubscribe = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/newsletter', values)
            console.log('Subscribe successful', response.data);
            toast.success('Successfully subscribed to the newsletter!');
            setValues({ email: '' });
        }
        catch (error) {
            console.error('Subscribe failed', error);
            toast.error('An error occurred.');
        }
    };

    return (
        <>
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
            <footer>
                <div className="footer_main">
                    <div className="tag">
                        <h1>Contact</h1>
                        <a href="#"><i className="fab fa-font-awesome-flag"></i> Belagavi India</a>
                        <a href="#"><i className="fas fa-phone"></i> +91 12 345 6789</a>
                        <a href="#"><i className="fas fa-envelope"></i> contact@gmail.com</a>
                    </div>

                    <div className="tag">
                        <h1>Get Help</h1>
                        <a href="#" className="center">FAQ</a>
                        <a href="#" className="center">Shipping</a>
                        <a href="#" className="center">Returns</a>
                        <a href="#" className="center">Payment Options</a>
                    </div>

                    <div className="tag">
                        <h1>Our Stores</h1>
                        <a href="#" className="center">India</a>
                        <a href="#" className="center">USA</a>
                        <a href="#" className="center">Switzerland</a>
                        <a href="#" className="center">Germany</a>
                    </div>

                    <div className="tag">
                        <h1>Follw Us</h1>
                        <div className="social_link">
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="tag">
                        <h1>Newsletter</h1>
                        <div className="search_bar">
                            <form>
                                <input type="email" name="email" placeholder="Your email id here" value={values.email} onChange={handleChange} />
                                <button type="submit" onClick={handleSubscribe}>Subscribe</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </footer>
        </>
    );
}

export default Footer;
