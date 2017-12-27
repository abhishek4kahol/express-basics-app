'use strict';     //this is going to save from making mistakes

var express = require('express');
//requiring the express module and using it with the help of variable express.

var posts = require('./mock/posts.json');
var app = express();
//we created variable app  and assign express to it.the app variable is now going to be
//extended and altered by this we mean we are going to assign different settings and
//routes to it and is now the central part of it.

app.use(express.static(__dirname + '/public'))
//use method defines middleware for our application. middleware is an important concept in express,
//middleware is the   logic that tells express how to handle a request in between the time a request made
//by client but before it arrives at routes.this is where middle in the middleware comes from.It can be
//used in any range of tasks from authentication so only certian users can view certain pages on website,
//to serving static files like we are about to do

//before we can render pug template , we need to tell express how. to do this we need two configurations
app.set('view engine', 'pug');
//this is to set the view engine parameter on our application i.e. jade
//app.set method defines different settings in our express application.

app.set('views', __dirname + '/templates');
//Now we will use them again to define the views parameter,a views parameter takes a
//folder path where the express will look for our templates.here we are invoking
//the __dirname :returns the directory name of the directory containing the JavaScript
//source code file this is important because we are starting the server from different
//directory



app.get('/', function(req, res){
  res.render('index');
})
// here we are creating a route with app variable using get method,and send
//response to the client.

app.get('/blog/:title?', function(req,res) { // ? tells the parameter that it is optional
  var title = req.params.title;
  if(title === undefined) {
    res.status(503); //service unavailable.
    res.render('blog');
  } else {
  var post = posts[title] || {};   //{} :if a post doesn't exist then show an empty page,this is a temporary solutions
  res.render('post', {post: post}); // we can access the above defined variable title in
  //the template by providing it as a second parameter in res.render method
  }
})
// the cool thing about res.send method is that you can actually send html tags.

app.listen(3000,function(){
  console.log('the frontend server is running on port:3000');
});
// settingup the development server and we give this method a parameter for port no
