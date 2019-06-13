const express = require('express');
const app= express();
const imdbMovieSearch = require('./imdb_movie_search');

app.get('/',(req,res)=>{
    res.json({success: "welcome to imdb scrapper. api online..."})
})

app.get('/search/:title',(req,res)=>{
    let title = req.params.title;
    console.log(title);
    imdbMovieSearch.searchMovies(title).then(result=>{
        res.json(result);
    });    
})

app.get('/details/:id',(req,res)=>{
    let id = req.params.id;
    imdbMovieSearch.movieDetails(id).then(result=>{
        res.json(result);
    });    
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('magic happens on localhost:'+port)
})