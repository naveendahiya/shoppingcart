# BASE_URL: https://backend-shopping-cart.herokuapp.com/

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

#delete product from cart {methos:'POST'} { pass productId as params}
/shop/cart-delete-item/:productId

# Create a seller

use the route /seller/create to create a seller
use the route /seller/ to get all sellers

**Details required:**
name,email,password,shopName and number
the fields should send the data in same way like _name:Your Name_

# Create a product

http://localhost:8000/shop/product/create
`{ "id":"5f411b8c0e65b05778bdcf0a", "title":"Mouse", "price":"250", "description":"Wireless mouse", "imageUrl":"None for now", "quantity":"50" }`

# Update a product

http://localhost:8000/shop/product/update route to update the prouct
_Data form_ :
`{ "id":"5f44b5a5c5724a3be48e5c13", "userId":"5f411b8c0e65b05778bdcf0a", "quantity":"10000" }`

# Delete a product

http://localhost:8000/shop/product/delete
` {
"id":"5f44b5a5c5724a3be48e5c13",
"userId":"5f411b8c0e65b05778bdcf0a",

} `

# Login a seller

http://localhost:8000/seller/login
{
email:'any email',
password:'password'
}

# create a customer

http://localhost:8000/user/create
{
firstname:"",
lastname:"",
email:'any email',
password:'password'
}

# get all orders
http://localhost:8000/orders/


# create an order 
http://localhost:8000/orders/create


Data passed like
{
    "email": "test@email.com",
    "address": "demo",
    "city": "city",
    "region": "region",
    "postalcode": "code",
    "country": "country",
    "cardname": "my name",
    "ccnumber": "1000",
    "expdate": "Sun Aug 30 2020 14:02:54 GMT+0530 (India Standard Time)",
    "cvv": "344",
    "items": [
        {
            "id": "5f439a0fd0a4f554c8bee441",
            "quantity": "5"
        },
        {
            "id": "5f439a925b6e4759e87e0dd1",
            "quantity": "2"
        }
    ]
}