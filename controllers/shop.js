const Product =require('../models/product');
 exports.getAllProducts=(req,res,next)=>{
   
      Product.find()
      .then(products=>{
          console.log(products)
        return res.status(200).json({
            data:{
                products:products
            },
            message:"all products"
         })
      })
}
   //shop/product/:productId
  exports.getProduct=(req,res,next)=>{
      const prodId=req.params.productId;
      Product.findById(prodId)
      .then(product=>{
        console.log(product)
        return res.status(200).json({
             data:{
               product:product
             },
             message:"single product"
         })
      })
      .catch(err=>{
          console.log(err)
      })
  }

  exports.postCart=(req,res,next)=>{
      const prodId=req.params.productId;
      Product.findById(prodId)
      .then(product=>{
          return req.user.addToCart(product)
      })
      .then(result=>{
          console.log(result)
          return res.status(200).json({
            data:{
              product:result
            },
            message:"item added to cart"
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }


exports.getCart=(req,res,next)=>{
  req.user
  .populate('cart.items.productId')
  .execPopulate()
  .then(user=>{
     const products=user.cart.items;
    return res.status(200).json({
      data:{
        products:products
      }
     })
  })
  .catch(err=>{
    console.log(err)
  })
}


exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  req.user
  .removeFromCart(prodId)
  .then(result=>{
    return res.status(200).json({
      message:"item deleted from cart"
    })
  })
  .catch(err=>{
    console.log(err);
  })
}