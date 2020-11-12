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

// Category.find({}, function(err, result){
//   if(err) throw err;
//   console.log(result);
// });


app.get("/", (req, res) => {
  Category.find({}, function(err, categories){
    if(err){
      console.log(err);
    } else {
      let featured = categories[0];
      // console.log(featured.products);
      res.render("home", {featuredProducts: featured.products});
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

  Category.findOne({name: reqdCategory}, function(err, result){
    if (err){
      console.log(err);
    } else {
      // console.log(result.products);
      res.render("category", {category: result});
    }
  })
});

app.get("/shop/:categoryName/:product", function(req, res){
  // const reqdCategory = req.params.categoryName;
  const reqdproduct = req.params.product;


});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});


















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
