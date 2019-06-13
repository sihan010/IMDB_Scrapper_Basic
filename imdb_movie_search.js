const fetch = require('node-fetch');
const cheerio = require('cheerio');
const search_base = "https://www.imdb.com/find?s=tt&exact=true&q=";
const movie_base = "https://www.imdb.com/title/";
const fs = require('fs')


const searchMovies = (searchText) => {
    return fetch(`${search_base}${searchText}`).then(res => res.text()).then(body => {
        let result = []
        const $ = cheerio.load(body);
        $(".findResult").each((key, item) => {
            let image = $(item).find(".primary_photo a img").attr('src');
            let title = $(item).find(".result_text a").text();
            let imdbId = $(item).find(".result_text a").attr('href').split("/")[2];
            let slug = $(item).find(".result_text").text();

            let movie = {
                title,
                slug,
                imdbId,
                image
            }
            result.push(movie);
        })
        return result;
    })
}

const movieDetails = (id) => {
    return fetch(`${movie_base}${id}`).then(res=>res.text()).then(body=>{
        const $ = cheerio.load(body);
        let title = $(".title_wrapper h1").text().trim();
        let year = $(".title_wrapper h1 span a").text().trim();
        let rating = $("span[itemprop='ratingValue']").text().trim(); 
        let metacritic = $(".metacriticScore span").text(); 
        let ratingCount = $("span[itemprop='ratingCount']").text().trim();            
        let runtime = $(".subtext").text().split('|')[0].trim();
        let genre = $(".subtext").text().split('|')[1].trim().replace("\n","");
        let release = $(".subtext").text().split('|')[2].trim();
        let poster = $(".poster a img").attr('src');
        let plot = $(".summary_text").text().trim().replace("\n","");
        let storyline=$("#titleStoryLine p span").text().trim().replace("\n","");
        let credit_summary=[];
        $(".plot_summary .credit_summary_item").each((key,item)=>{
            credit_summary.push($(item).text().trim().replace("\n","").split("|")[0].trim())
        })
        
        let result={
            title,
            year,
            rating,
            ratingCount,
            metacritic,
            runtime,
            genre,
            release,
            poster,
            plot,
            storyline,
            credit_summary
        }
        return result;
    })
}

module.exports = {
    searchMovies,
    movieDetails
}