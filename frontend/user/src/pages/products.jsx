import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import './product.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Products() {

    useEffect(() => {
        fetchMen();
        fetchWomen();
        fetchKids();
    }, []);

    const [men, setMen] = useState([]);
    const [women, setWomen] = useState([]);
    const [kids, setKids] = useState([]);

    const fetchMen = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/menproducts');
            setMen(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWomen = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/womenproducts');
            setWomen(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchKids = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/kidsproducts');
            setKids(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };


    const handleAddToCart = async (id) => {
        try {
            await axios.post('http://localhost:8081/addtocart/' + id)
            console.log('Product added successful');
            toast.success('Product added to cart');
        }
        catch (err) {
            console.log('Error adding product !', err);
        }

    };

    const handleAddToWish = async (id) => {
        try {
            await axios.post('http://localhost:8081/addtowishlist/' + id)
            console.log('Product added successful');
            toast.success('Product added to wishlist');
        }
        catch (err) {
            console.log('Error deleting product !', err);
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

            <Header />

            <div className="products" id="kidsShoes" style={{marginTop: '50px'}}>
                <h1>Mens Shoes</h1>

                <Grid container spacing={2}>
                    {men?.map((d, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <div className="box">
                                <div className="card">
                                    <div className="small_card" onClick={() => handleAddToWish(d.p_id)} >
                                        <i className="fa-solid fa-heart" ></i>
                                    </div>
                                    <div className="image">
                                        {d.image && (
                                            <img
                                                src={`http://localhost:8081/images/${d.image}`}
                                                alt="Product Image"
                                            />
                                        )}
                                    </div>
                                    <div className="products_text">
                                        <h2>{d.title}</h2>
                                        <p>{d.description}</p>
                                        <h3>₹{d.price}</h3>
                                        <div className="products_star">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <Button className="btn" onClick={() => handleAddToCart(d.p_id)}>Add To Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

            </div>

            <div className="products" id="kidsShoes">
                <h1>Womens Shoes</h1>

                <Grid container spacing={2}>
                    {women?.map((d, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <div className="box">
                                <div className="card">
                                    <div className="small_card" onClick={() => handleAddToWish(d.p_id)}>
                                        <i className="fa-solid fa-heart"></i>
                                    </div>
                                    <div className="image">
                                        {d.image && (
                                            <img
                                                src={`http://localhost:8081/images/${d.image}`}
                                                alt="Product Image"
                                            />
                                        )}
                                    </div>
                                    <div className="products_text">
                                        <h2>{d.title}</h2>
                                        <p>{d.description}</p>
                                        <h3>₹{d.price}</h3>
                                        <div className="products_star">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <Button className="btn" onClick={() => handleAddToCart(d.p_id)}>Add To Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

            </div>

            <div className="products" id="kidsShoes">
                <h1>Kids Shoes</h1>

                <Grid container spacing={2}>
                    {kids?.map((d, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <div className="box">
                                <div className="card">
                                    <div className="small_card" onClick={() => handleAddToWish(d.p_id)}>
                                        <i className="fa-solid fa-heart"></i>
                                    </div>
                                    <div className="image">
                                        {d.image && (
                                            <img
                                                src={`http://localhost:8081/images/${d.image}`}
                                                alt="Product Image"
                                            />
                                        )}
                                    </div>
                                    <div className="products_text">
                                        <h2>{d.title}</h2>
                                        <p>{d.description}</p>
                                        <h3>₹{d.price}</h3>
                                        <div className="products_star">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <Button className="btn" onClick={() => handleAddToCart(d.p_id)}>Add To Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

            </div>

            <Footer />
        </div>
    );
}

export default Products;
