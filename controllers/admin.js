const Product=require('../models/product');

exports.postAddProduct=(req,res,next)=>{
   const title=req.body.title;
   const imageUrl=req.body.imageUrl;
   const price=req.body.price;
   const description=req.body.description;
   const product= new Product({
       title,
       price,
       description,
       imageUrl,
       soldBy:req.user.userId
   })

   product
   .save()
   .then(result=>{
    return res.status(200).json({
        data: {
           product:product
        },
        message: "product created!"
    });
   })
   .catch(err=>{
       console.log(err);
   })

}
//
exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode){
        return res.status(500).json({
            message:"no valid route"
        })
    }
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then(product=>{
        if(!product){
            return res.status(500).json({
                message:"no valid route"
            })
        }
        res.status(200).json({
            data:{
               pageTitle:'Edit Product',
               product:product,
               editing:editMode
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postEditProduct=(req,res,next)=>{
    console.log(req.body);
    const prodId=req.params.productId
    console.log(prodId)
    const updatedTitle=req.body.title;
    const updatedPrice=req.body.price;
    const updatedImageUrl=req.body.imageUrl;
    const updatedDesc=req.body.description;

    
    Product.findById(prodId)
    .then(product=>{
        console.log(product);
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.imageUrl=updatedImageUrl;
        product.description=updatedDesc
        return product
        .save()
        
    }).then(result=>{
        console.log('UPDATED PRODUCT');
        res.status(200).json({
           data: {
            product:result
           },
           message:"prodcut updated"

         })
    })
    .catch(err=>{
        console.log(err);
    })
    
}

exports.postDeleteProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findByIdAndRemove(prodId)
    .then(()=>{
        res.status(200).json({
            
            message:"product deleted"
 
          })
    })
    .catch(err=>{
        console.log(err);
    })
}
 