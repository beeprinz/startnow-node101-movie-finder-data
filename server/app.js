const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const website = 'http://www.omdbapi.com/?apikey=8730e0e&';
const encode = encodeURIComponent;
const app = express();
let cache = {};

app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', function(req,res){
    let param = null;
    let key = null;

    if(req.query.hasOwnProperty('i')){
        key = req.query.i;
        param = 'i=' + encode(key);
    } else if (req.query.hasOwnProperty('t')){
        key = req.query.t;
        param = 't=' + encode(key);
    }
    if(cache.hasOwnProperty(key)){
        res.json(cache[key]);
    }else {
        console.log(website+param);
        axios.get(website + param)
        .then(function(response){
            cache[key] = response.data;
            res.json(cache[key]);
        })
        .catch(function(error){
        console.log('Oh no, something went wrong!',error);
        res.status(500).send(error.message)
     });
    };

   });

app.get('/data', function(req,res){
    res.json(cache);
})


//const mcache = require('memory-cache');

//node 100 lvl 6 look over
// const app = express();
// var cache = {
//     url: '',
//     data: ['']
// };
// app.use(morgan('dev')); 

//app.get('/', function(req, res){ //add later: if get request URL=cache data URL, return cache data; 
    //if the request url is in the cache then we respond with that objects data, 
    //else get data through axios requests, then push that data and url to the cache and serve the data to the client
    //

   //make an empty array to push the data from the movies 
   //look in to concate

   //var requestUrl = 

//console.log('original url', req.originalUrl);
//cache['url'] = req.originalUrl;
  // cache.push(originalUrl);


    
//     if(req.query.i){
//         axios.get('http://www.omdbapi.com/?apikey=8730e0e&i=' + req.query.i) 
//         .then(function (response){
//         console.log('Here is the movie info!', response.data);
//         res.json(response.data);   //data.push(cache)?  
//         cache.push(data); //should i do cache['data'] = respose.data;? 
//     })  
//     .catch(function(error){
//         console.log('Oh no, something went wrong!',error);
//         res.status(500).send(error.message)
//      });
//   }
//     if(req.query.t){
//         axios.get('http://www.omdbapi.com/?apikey=8730e0e&t=' + req.query.t) 
//         .then(function (response){
//         console.log('Here is the movie info!', response.data);
//         res.json(response.data);
//         cache.push(data);   
//     })  
//     .catch(function(error){
//         console.log('Oh no, something went wrong!',error);
//         res.status(500).send(error.message)
//     });
//   }
// });



   
// res.json(data);        //data or /?i=tt3896198
     
// });

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;