const fetch = require("node-fetch");
const inquirer = require('inquirer');
const chalk = require('chalk');

const API_KEY = "53b97dacea5e413eb279b06fb97c4122";
const Base_URL = 'https://newsapi.org/v2/';

// function to return new sources
async function newsSources(){
    //url that returns a list of news sources
    const url = `${Base_URL}sources?apiKey=${API_KEY}`;
    try{
        const fetchResult =fetch(url);
        const response = await fetchResult;
        const jsonData =await response.json();
        console.log(jsonData.sources[1].name)
        const topNewsSources=[];
        const country=[];
        for(i=1; i<5; i++){
                topNewsSources.push(jsonData.sources[i].id);
                country.push(jsonData.sources[i].country)
            
          }
        //   using the inquirer library to capture user input from the console
        inquirer.prompt([
            {   type: 'list',
                name: 'newsSource',
                message:'Select your preffered news source.',
                choices:topNewsSources 

            },
            {
               type:'list',
               name:'country', 
               message:'Select the preffered country from which you want to retrive information ',
               choices: country
            }
        ])
        .then (answers =>{
            //a variable to store the name of the news source from the inquirer list
            const newsSource =answers.newsSource;

            //a variable to store the name of the country from the inquirer list
            const country= answers.country;
            console.log(
                chalk. yellow(`Fetching news from ${newsSource}`))
                topNewsHeadLines(newsSource, country);

                 }
                 
                 );
        }
    
    catch (err) {
        console.error(chalk.red(err));
    }

    
    }

const topNewsHeadLines = async (newssource, country) => {
    try{
    const HeadlinesUrl = `${Base_URL}top-headlines?country=${country}&apiKey=${API_KEY}&source=${newssource}`
    const fetchTopHeadLines =fetch(HeadlinesUrl)
   const response = await fetchTopHeadLines;
   const JsonData = await response.json();
   for(let i=0; i<11; i++){
       const responseObject={
                          Title:JsonData.articles[i].title,
                          Description: JsonData.articles[i].description,
                          URL: JsonData.articles[i].url,
                          PublishedDate: JsonData.articles[i].publishedAt,
                       
                       }
                       console.log(responseObject);
                       console.log('\n');


                    }
   }
   catch(err){
       console.log (chalk.red(err))
   }
}


newsSources();

