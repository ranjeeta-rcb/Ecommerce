const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path')

const app = express();
const port = 8081;
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../images')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const db = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecomwebsite'
});



//admin database...............//

//admin login..
app.post('/admin', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM admin WHERE a_username = ? AND a_password = ?';
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful' });
    });
});

//user table 
app.get('/userslist', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        return res.send(result);
    });
});

//Products table 
app.get('/productstable', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        return res.send(result);
    });
});

//Orders table 
app.get('/orderstable', (req, res) => {
    const sql = 'SELECT * ,DATE_FORMAT(date, "%Y-%m-%d") AS orderDate FROM orders ORDER BY date';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No Orders found' });
        }

        return res.send(result);
    });
});

//Payments table 
app.get('/paymentstable', (req, res) => {
    const sql = 'SELECT *,DATE_FORMAT(date, "%Y-%m-%d") AS orderDate FROM payments';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No payment history found' });
        }

        return res.send(result);
    });
});

//Query for pie chart
app.get('/piechart', (req, res) => {
    const sql = 'SELECT category, COUNT(*) AS product_count FROM products GROUP BY category';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        return res.send(result);
    });
});

//Query for bar chart
app.get("/ordersPerDay", (req, res) => {
    const sql = `
    SELECT
      SUBSTRING(o.date, 9, 2) AS orderDay,
      COUNT(CASE WHEN p.category = 'men' THEN o.o_id END) AS menCount,
      COUNT(CASE WHEN p.category = 'women' THEN o.o_id END) AS womenCount,
      COUNT(CASE WHEN p.category = 'kids' THEN o.o_id END) AS kidsCount
    FROM
      orders o
      JOIN products p ON o.product_id = p.p_id
    GROUP BY
      orderDay
    ORDER BY
      o.date;
  `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: "No data found" });
      }
  
      return res.json(result);
    });
  });

//Query for displaying total earning
app.get('/totalamount', (req, res) => {
    const sql = 'SELECT SUM(amount) AS total_earnings FROM payments WHERE status = "paid"';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const totalEarnings = result[0].total_earnings || 0;

        return res.json({ totalEarnings });
    });
});

//Query for calculating total nuber of orders
app.get('/totalorders', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total_orders FROM orders';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const totalOrders = result[0].total_orders || 0;
        return res.json({ totalOrders });
    });
});

//Query for calculating total number of products
app.get('/totalproducts', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total_products FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const totalProducts = result[0].total_products || 0;
        return res.json({ totalProducts });
    });
});

//Query for calculating total number of users
app.get('/totalUsers', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total_users FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const totalUsers = result[0].total_users || 0;
        return res.json({ totalUsers });
    });
});

// Adding new products to the table
app.post('/addproduct', upload.single('image'), (req, res) => {
    const requiredFields = ['title', 'description', 'category', 'price'];
    
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Missing image file' });
    }

    const sql = "INSERT INTO products (`title`, `description`, `category`, `price`, `image`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.category,
        req.body.price,
        req.file.filename
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json({ success: true, message: 'Product added successfully' });
    });
});

//Deleting products from the table
app.delete('/deleteproduct/:id', (req, res) => {

    const id = req.params.id;
    
    const sql = "DELETE FROM products WHERE p_id = ?";
 
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

//Deleting user
app.delete('/deleteuser/:id', (req, res) => {
    const sql = "DELETE FROM user WHERE u_id = ?";
    const id = req.params.id;
 
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Update product details
app.put('/updateproduct/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
 
    const updateFields = Object.keys(updatedProduct).filter((field) => updatedProduct[field]);
  
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
  
    const sql = `UPDATE products SET ${updateFields.map((field) => `${field} = ?`).join(', ')} WHERE p_id = ?`;
 
    const values = updateFields.map((field) => updatedProduct[field]);
    values.push(productId);
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.json({ success: true, message: 'Product updated successfully' });
    });
  });
  
  



//user database................//

//user signup
app.post('/usersignup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO user (`fname`, `lname`, `mail`, `pass`) VALUES (?, ?, ?, ?)";
    const values = [firstName, lastName, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting data into the database" });
        }
        return res.json({ success: true, data });
    });
});


//user login
app.post('/userlogin', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM user WHERE mail = ? AND pass = ?';
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json({ message: 'Login successful' });
    });
});

//Wishlist query
app.get('/wishlist', (req, res) => {

    const sql = `
    SELECT products.*
    FROM wishlist
    JOIN products ON wishlist.product_id = products.p_id;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No wishlisted products found' });
        }

        return res.send(result);
    });
});

//Cart query
app.get('/cart', (req, res) => {

    const sql = `
    SELECT products.*
    FROM cart
    JOIN products ON cart.product_id = products.p_id;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No cart products found' });
        }

        return res.send(result);
    });
});

//Products
//mens products
app.get('/menproducts', (req, res) => {
    const sql = 'SELECT * FROM products WHERE category = "men"';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No mens products found' });
        }

        return res.send(result);
    });
});

//womens products
app.get('/womenproducts', (req, res) => {
    const sql = 'SELECT * FROM products WHERE category = "women"';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No womens products found' });
        }

        return res.send(result);
    });
});

//kids products
app.get('/kidsproducts', (req, res) => {
    const sql = 'SELECT * FROM products WHERE category = "kids"';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No kids products found' });
        }

        return res.send(result);
    });
});

//footer newsletter
app.post('/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO newsletter (`email`) VALUES (?)";
    const values = [email];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting data into the database" });
        }
        return res.json({ success: true, data });
    });
});

//Deleting products from the cart
app.delete('/cartdelete/:id', (req, res) => {
    const sql = "DELETE FROM cart WHERE product_id = ?";
    const id = req.params.id;
 
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Adding a product to the cart
app.post('/addtocart/:id', (req, res) => {
    const productId = req.params.id;

    const sql = "INSERT INTO cart (product_id) VALUES (?)";
    
    db.query(sql, [productId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Adding a product to the wishlist
app.post('/addtowishlist/:id', (req, res) => {
    const productId = req.params.id;

    const sql = "INSERT INTO wishlist (product_id) VALUES (?)";
    
    db.query(sql, [productId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

//Deleting products from the wishlist
app.delete('/wishlistdelete/:id', (req, res) => {
    const sql = "DELETE FROM wishlist WHERE product_id = ?";
    const id = req.params.id;
 
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

//Place order
app.post('/orders', (req, res) => {
    const orderItems = req.body.orderItems;
    console.log('Received request:', req.body);

    if (orderItems && Array.isArray(orderItems) && orderItems.length > 0) {
        const values = orderItems.map(item => [item.product_id, item.price, item.orderDate, 'unpaid']);

        db.query('INSERT INTO orders (product_id, price, date, status) VALUES ?', [values], (err) => {
            if (err) {
                console.error('Error placing order:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Order placed successfully' });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid order format' });
    }
});

//Clear Cart on successful order
app.delete('/clearCart', (req, res) => {
    const sql = 'DELETE FROM cart';
    const id = req.params.id;
 
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

//Orders query
app.get('/getOrders', (req, res) => {

    const sql = `
    SELECT orders.*, products.*
    FROM orders
    JOIN products ON orders.product_id = products.p_id
    ORDER BY orders.date DESC;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'No cart products found' });
        }

        return res.send(result);
    });
});

// Add to payments
app.post('/addtopayments', (req, res) => {
    const { oId, currentDate, productPrice, type, status } = req.body;
    console.log('Received request:', req.body);

    const sql = "INSERT INTO payments (orderId, type, date, amount, status) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [ oId, type, currentDate, productPrice, status], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

//Onclick of pay now orders table updation(status change)
app.put('/updateOrders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const status = req.body.status;

    const sql = 'UPDATE orders SET status = ? WHERE o_id = ?';

    db.query(sql, [status, orderId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error', message: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No orders matched' });
        }

        return res.json({ message: 'Order updated successfully' });
    });
});

//Query for displaying total number of products in cart
app.get('/cartCount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total_items FROM cart';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const totalitems = result[0].total_items || 0;
        return res.json({ totalitems });
    });
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
