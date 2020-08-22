# wicked-sales
 A full stack Node.js &amp; React shopping cart app.

 ## Live Site
 Try the live site here: http://wicked-sales.david-diep.com/
 
 ## Technologies Used
 <li>PostgreSQL</li>
 <li>React</li>
 <li>Bootstrap</li>
 <li>Node</li>
 <li>NPM</li>
 <li>Express</li>
 <li>Javascript</li>
 <li>CSS</li>
 <li>HTML</li>
 <li>Webpack</li>
 <li>Babel</li>
 <li>Amazon Web Services EC2</li>
 
 ## Main Features
 As a storefront and shopping cart app:  
 
  - The user can view a catalog of products on the front page showing the picture, price, and description of the item.  
  - The user can view a detailed description of the item on click.  
  - The user can view their cart by clicking the cart text/icon on right side of the header.  
  - The user can move to chekcout from their cart and fill out their payment and address information, completing an order.  
  - The user can add a number of items to the cart from the front page.
  - The user can change the quantity of each item in their cart.
  - The user can view their total in their cart and the number of items in their cart.
  - All information is stored and retrieved in the backend with PostgreSQL.  
  
  Here's an example of what it looks like: ![Wild Plushies](https://i.imgur.com/nrZcW0R.png "Wild Plushies") 
 
## Development  
### System Requirements  
 - Node.js  
 - NPM  
 - PostgreSQL
 
 ### Getting Started
 1. Clone the repository.  
 
    ```git clone https://github.com/david-diep/wicked-sales-js.git```  
 
 2. Run "npm install" to install the dependencies.   
 
     ```npm install```

 3. Start the service postgreSQL.  
 
    ```sudo service postgresql start```  
   
 4. Create the database.  
 
    ```createdb wickedSales```  
 
 5. Import the database.  
 
    ```npm run db:import```  
 
 6. Rename and copy the ```.env.example``` file to ```.env``` and customize its settings.   
 
 7. Start the website.   
 
    ```npm run dev```
 
 A local copy should then be accessible at localhost:3000 or the localhost:DEV_SERVER_PORT specified in the .env folder.  

 
  
 
