var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
//var Bing = require('node-bing-api')({acckey:'a5ef47c5e08c4546a06b91e72c0941d6'});
var searchTerm = require('./models/searchTerm.js')
var google_cx='004428927283651543213:vmmx57sovda';
var google_key= 'AIzaSyAXjTCbPFydRwU2_ym9WDsfD9uzWpg6zhg';
var request = require("request");

app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/searchTerms");

app.get('/api/recentsearch',function(req,res){

    searchTerm.find({},(err,data) =>{
    res.json(data);
  })
})
app.get('/api/imagesearch/:searchVal*',function(req,res){
    var searchVal = req.params.searchVal;
    var start = req.query.offset;
    console.log(start);

    var data = new searchTerm({
          searchVal:searchVal,
          searchDate: new Date()
    });

    data.save()
     .then(doc => {
       console.log("data passed")
     })
     .catch(err => {
       console.error(err)
     })

     request.get("https://www.googleapis.com/customsearch/v1?key=" + google_key + "&cx=" + google_cx + "&searchType=image&q=" + searchVal + "&start=" + start,
     function(error, response, body){
           var arr = [];
           var items = JSON.parse(body).items;
           //res.json(items);
           items.forEach(function(item, ind){
               var myjson = {
                   imgURL : item.link,
                   alt: item.snippet,
                   thumbnail: item.image.thumbnailLink,
                   contextLink: item.image.contextLink
               };
               arr.push(myjson);
          })
          res.json(arr);
     })
  // Bing.images(searchVal,{
  //    count:10
  //  },(err,rez,body) =>{
  //      res.json(body);
  //  })

});

app.listen(3000,console.log("app is running on 3000"));
