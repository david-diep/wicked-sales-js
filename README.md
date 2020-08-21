# wicked-sales-js
 A full stack Node.js &amp; React shopping cart app.
 
 Live Deployment: http://wicked-sales.david-diep.com/
 
 Technologies used: PostgreSQL, React, JavaScript, CSS, Bootstrap, npm, express
 
 As a storefront and shopping cart app:
 
  -The user can view a catalog of products on the front page showing the picture, price, and description of the item.  
  -The user can view a detailed description of the item on click.  
  -The user can view their cart by clicking the cart text/icon on right side of the header.  
  -The user can move to chekcout from their cart and fill out their payment and address information, completing an order.  
  -The user can add a number of items to the cart from the front page.
  -The user can change the quantity of each item in their cart.
  -The user can view their total in their cart and the number of items in their cart.
  -All information is stored and retrieved in the backend with PostgreSQL.  
  
  Here's an example of what it looks like: ![Wild Plushies](https://i.imgur.com/nrZcW0R.png "Wild Plushies") 
 
 To launch a local copy, postgreSQL and npm is required. Run "npm install" to install the dependencies. Start the service postgreSql.  Rename the ".env.example" file to ".env" and customize its settings. Run "npm run db:import". Then run "npm run dev". A local copy should then be accessible at localhost:3000 or the DEV_SERVER_PORT specified in the .env folder.

 
  
 
