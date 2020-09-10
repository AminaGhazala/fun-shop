# Fun Shop
> - Maintained by: `Jason Kim`

## Description
A full stack Node.js and React e-commerce application.

## Live Demo
https://funshop.jsonkim.com/

## Features
 1. User can view new arrival items.
 2. User can view most popular items for sale.
 3. User can view details of a product.
 4. User can add products to the shopping cart.
 5. User can view products in the shopping cart.
 6. User can place an order.

## Technologies Used
  - CSS3
  - JavaScript (ES6)
  - React.js
  - Node.js
  - Express
  - PostgreSQL
  - webpack
  - babel
  - Bootstrap 4
  - AWS EC2

## Getting Started
#### 1. Clone the repository and navigate to the directory
```shell
git clone https://github.com/jasonkim-jk/fun-shop.git
cd fun-shop
```

#### 2. Install all dependencies
```shell
npm install
```

#### 3. Start PostgreSQL and Import existing database
```shell
sudo service postgresql start
npm run db:import
```

#### 4. Compile project
```shell
npm run dev
```

#### 5. Access application by entering [https://localhost:3000](https://localhost:3000) in the browser.


## Preview
  - Device: Desktop / Browser: Chrome 
  
<img src="server/public/images/funshop-screenshot.gif">


  - Device: Mobile / Mode: Portrait / Browser: Chrome 

<img src="server/public/images/funshop-screenshot-mobile-portrait.gif">
