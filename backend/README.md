# API Documentation

# Admin Authentication

## Admin Login

- **URL:** `/admin`
- **Method:** `POST`
- **Request:**
  - Body: `{ "email": "admin_email", "password": "admin_password" }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "message": "Login successful" }`
  - **401 Unauthorized:**
    - Body: `{ "error": "Invalid credentials" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# User Management

## Get All Users

- **URL:** `/userslist`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of user objects
  - **404 Not Found:**
    - Body: `{ "error": "No users found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## User Signup

- **URL:** `/usersignup`
- **Method:** `POST`
- **Request:**
  - Body: `{ "firstName": "John", "lastName": "Doe", "email": "user_email", "password": "user_password" }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "success": true, "data": user_data }`
  - **400 Bad Request:**
    - Body: `{ "error": "All fields are required" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Error inserting data into the database" }`

## User Login

- **URL:** `/userlogin`
- **Method:** `POST`
- **Request:**
  - Body: `{ "email": "user_email", "password": "user_password" }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "message": "Login successful" }`
  - **401 Unauthorized:**
    - Body: `{ "error": "Invalid credentials" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Product Management

## Get All Products

- **URL:** `/productstable`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of product objects
  - **404 Not Found:**
    - Body: `{ "error": "No products found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Add Product

- **URL:** `/addproduct`
- **Method:** `POST`
- **Request:**
  - Body: FormData with fields `{ "title": "Product Title", "description": "Product Description", "category": "Product Category", "price": 99.99, "image": File }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "success": true, "message": "Product added successfully" }`
  - **400 Bad Request:**
    - Body: `{ "error": "Missing required field: field_name" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Delete Product

- **URL:** `/deleteproduct/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id`: Product ID
- **Responses:**
  - **200 OK:**
    - Body: Deleted product data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Update Product

- **URL:** `/updateproduct/:id`
- **Method:** `PUT`
- **Parameters:**
  - `id`: Product ID
- **Request:**
  - Body: Updated product fields
- **Responses:**
  - **200 OK:**
    - Body: `{ "success": true, "message": "Product updated successfully" }`
  - **400 Bad Request:**
    - Body: `{ "error": "No valid fields to update" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Order Management

## Get All Orders

- **URL:** `/orderstable`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of order objects
  - **404 Not Found:**
    - Body: `{ "error": "No Orders found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Place Order

- **URL:** `/orders`
- **Method:** `POST`
- **Request:**
  - Body: `{ "orderItems": [{ "product_id": 1, "price": 99.99, "orderDate": "2024-02-29" }] }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "message": "Order placed successfully" }`
  - **400 Bad Request:**
    - Body: `{ "error": "Invalid order format" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Clear Cart on Successful Order

- **URL:** `/clearCart`
- **Method:** `DELETE`
- **Responses:**
  - **200 OK:**
    - Body: Deleted cart data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Get Orders with Product Details

- **URL:** `/getOrders`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of products in orders
  - **404 Not Found:**
    - Body: `{ "error": "No cart products found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Cart and Wishlist Management

## Get Cart Products

- **URL:** `/cart`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of cart products
  - **404 Not Found:**
    - Body: `{ "error": "No cart products found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Add Product to Cart

- **URL:** `/addtocart/:id`
- **Method:** `POST`
- **Parameters:**
  - `id`: Product ID
- **Responses:**
  - **200 OK:**
    - Body: Added to cart data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Delete Product from Cart

- **URL:** `/cartdelete/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id`: Product ID
- **Responses:**
  - **200 OK

:**
    - Body: Deleted from cart data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Get Wishlist Products

- **URL:** `/wishlist`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of wishlist products
  - **404 Not Found:**
    - Body: `{ "error": "No wishlisted products found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Add Product to Wishlist

- **URL:** `/addtowishlist/:id`
- **Method:** `POST`
- **Parameters:**
  - `id`: Product ID
- **Responses:**
  - **200 OK:**
    - Body: Added to wishlist data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Delete Product from Wishlist

- **URL:** `/wishlistdelete/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id`: Product ID
- **Responses:**
  - **200 OK:**
    - Body: Deleted from wishlist data
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Dashboard Analytics

## Pie Chart Data

- **URL:** `/piechart`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of data for the pie chart
  - **404 Not Found:**
    - Body: `{ "error": "No products found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Bar Chart Data

- **URL:** `/ordersPerDay`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: Array of data for the bar chart
  - **404 Not Found:**
    - Body: `{ "error": "No data found" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Payments

## Total Earnings

- **URL:** `/totalamount`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: `{ "totalEarnings": 999.99 }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Total Orders

- **URL:** `/totalorders`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: `{ "totalOrders": 50 }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Total Products

- **URL:** `/totalproducts`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: `{ "totalProducts": 200 }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

## Total Users

- **URL:** `/totalUsers`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: `{ "totalUsers": 100 }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Internal Server Error" }`

# Miscellaneous

## Newsletter Subscription

- **URL:** `/newsletter`
- **Method:** `POST`
- **Request:**
  - Body: `{ "email": "user_email" }`
- **Responses:**
  - **200 OK:**
    - Body: `{ "success": true, "data": newsletter_data }`
  - **400 Bad Request:**
    - Body: `{ "error": "All fields are required" }`
  - **500 Internal Server Error:**
    - Body: `{ "error": "Error inserting data into the database" }`

## Server Information

- **URL:** `/`
- **Method:** `GET`
- **Responses:**
  - **200 OK:**
    - Body: `{ "message": "Server is running" }`
