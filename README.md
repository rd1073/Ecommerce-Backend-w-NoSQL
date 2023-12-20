# E-commerce Marketplace(Backend)

## Overview

This project implements an e-commerce marketplace using MongoDB, Express.js and Node.js stack. It facilitates the interaction between buyers and sellers, allowing users to register, create catalogs, manage products, and place orders.

## Entities

### 1. Users

- Two types: buyers and sellers
- Users can sign up as either buyers or sellers

### 2. Catalogs

- Belongs to a seller
- One seller can have one catalog
- Consists of products

### 3. Products

- Has a name and a price

### 4. Orders

- Created by a buyer to purchase items from a seller's catalog
- Consists of a list of products

## APIs

### Auth APIs

- **POST /api/auth/register**
  - Register a user (accept username, password, type of user - buyer/seller)
- **POST /api/auth/login**
  - Let a previously registered user log in (e.g., retrieve authentication token)

### APIs for Buyers

- **GET /api/buyer/list-of-sellers**
  - Get a list of all sellers
- **GET /api/buyer/seller-catalog/:seller_id**
  - Get the catalog of a seller by seller_id
- **POST /api/buyer/create-order/:seller_id**
  - Send a list of items to create an order for the seller with id = seller_id

### APIs for Sellers

- **POST /api/seller/create-catalog**
  - Send a list of items to create a catalog for a seller
- **GET /api/seller/orders**
  - Retrieve the list of orders received by a seller


### Tech Stack and System Prerequisites

- Node.js
- MongoDB
- nodemon

### Installation and Running

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd Ecommerce-Backend-w-NoSQL`
3. Install dependencies: `npm install`
4. Chane your mongoDB url(line 3 in db.js in config folder)
5. Make sure to change the JWT secret key to a stronger one than the example "abce" key here.
6. 6. Start the server: `npm start`
  

