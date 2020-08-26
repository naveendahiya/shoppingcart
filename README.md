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

__Details required:__
name,email,password,shopName and number
the fields should send the data in same way like *name:Your Name*







