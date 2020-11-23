//jshint esversion:6

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

// mongodb+srv://admin-niranjay:<password>@cluster0.wrvir.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://admin-niranjay:Nebula@cluster0.wrvir.mongodb.net/blsDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const categorySchema = {
  name: String,
  description: String,
  products: [
    {
      productName: String,
      price: String,
      thumbnail: String,
      description: String
    }
  ]
};

const Category = mongoose.model("Category", categorySchema);

app.get("/", (req, res) => {
  Category.find({}, function(err, categories){
    if(err){
      console.log(err);
    } else {
      let featured = categories[0];
      // console.log(featured.name);
      res.render("home", {featuredProducts: featured});
    }
  });
});

app.get("/shop", (req, res) => {
    Category.find({}, function(err, categories){
      if(err){
        console.log(err);
      } else {
        let showList = [];
        for(let i = 0; i < 3; i++){
          if(i === 0){
            // console.log("Featured category detected and not added to the showList");
          } else {
            showList.push(categories[i]);
          }
        }
        // console.log(showList);

        res.render("shop", {categories: showList});
      }
    });
});

// app.get("/posts/:postName", function(req, res){
//   posts.forEach(function(post){
//     if(_.lowerCase(req.params.postName) === _.lowerCase(post.title)){
//       res.render("post", {postTitle: post.title, postBody: post.body});
//     } else {
//       console.log("Match not found.");
//     }
//   });
// });

app.get("/shop/:category", function(req, res){
  const reqdCategory = req.params.category;

  Category.findOne({name: reqdCategory}, function(err, categoryProducts){
    if (err){
      console.log(err);
    } else {
      // console.log(categoryProducts);
      res.render("category", {category: categoryProducts});
    }
  })
});

app.get("/shop/:category/products/:product", function(req, res){
  const reqdCategory = req.params.category;
  const reqdProduct = req.params.product;

  Category.find({
    "name": reqdCategory
  },
  {
    "products": {
      "$elemMatch": {
        "productName": reqdProduct
      }
    }
  }, function(err, product){
    if(err){
      console.log(err);
    } else {
      // console.log(product[0].products[0]);
      res.render("product", {categoryName: reqdCategory, product: product[0].products[0]});
    }
  });

});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});


















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
