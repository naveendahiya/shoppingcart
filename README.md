# shoppingcart
clone it

#getting started
navigate to shoppingcart folder in your terminal then type command
node app.js

#adding new product
/admin/add-products
body would contain all the fields specified in product model

#edit product {pass productId of the product you need to edit from frontend as params} {method :'POST'}
/admin/edit-product/:productId

#add to cart {pass productId of product you need to add to cart as params}{method:'POST'}
/shop/cart/:productId

#get all items in cart {method:'GET'}
/shop/cart

#delete product from cart {methos:'POST'}  { pass productId as params}
/shop/cart-delete-item/:productId


# Create a seller
use the route /seller/create to create a seller
use the route /seller/ to get all sellers

__Details required:__
name,email,password,shopName and number
the fields should send the data in same way like *name:Your Name*

# Create a product
http://localhost:8000/shop/product/create
`{
    "id":"5f411b8c0e65b05778bdcf0a",
    "title":"Mouse",
    "price":"250",
    "description":"Wireless mouse",
    "imageUrl":"None for now",
    "quantity":"50"
}`

# Update a product
http://localhost:8000/shop/product/update route to update the prouct
*Data form* :
`{
    "id":"5f44b5a5c5724a3be48e5c13",
    "userId":"5f411b8c0e65b05778bdcf0a",
    "quantity":"10000"
}`

# Delete a product
http://localhost:8000/shop/product/delete
` {
    "id":"5f44b5a5c5724a3be48e5c13",
    "userId":"5f411b8c0e65b05778bdcf0a",
    
} `








