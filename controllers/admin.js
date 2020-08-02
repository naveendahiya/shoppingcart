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
       imageUrl
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
exports.getAllProducts=(req,res,next)=>{
   
  let products=  Product.find({});

  return res.status(200).json({
     data:{
         products:products
     },
     message:"all products"
  })
}