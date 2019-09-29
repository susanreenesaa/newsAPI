const fetch = require("node-fetch");
const inquirer = require('inquirer');
const chalk = require('chalk');

const API_KEY = "53b97dacea5e413eb279b06fb97c4122";
const Base_URL = 'https://newsapi.org/v2/';

//function that returns news from any location 
async function generalNews(){
        const urlForGeneralNews =`${Base_URL}sources?apiKey=${API_KEY}`;
            try{
            const fetchResult =fetch(urlForGeneralNews);
            const response = await fetchResult;
            const jsonData =await response.json();
            for(let i=1; i<11; i++){
                let generalNewsObj={
                SourceName:jsonData.sources[i].name,
                Description: jsonData.sources[i].description,
                URL: jsonData.sources[i].url,
                
                }
                console.log(chalk.blue(`News headline number ${i}`));
                console.log(generalNewsObj);
                console.log("\n");

            
            }
        }
    catch(err){
        console.log(chalk.red(err));
    }
    }

    // function that returns news from a particular area i.e  fashion and design
    async function newsByCategory(newsSource,country, category){
        try{
            const UrlForNewsByCategory = `${Base_URL}top-headlines?country=${country}&apiKey=${API_KEY}&source=${newsSource}&category=${category}`;
            const fetchResult =fetch(UrlForNewsByCategory);
            const response = await fetchResult;
            const jsonData =await response.json();
            console.log("\n");
            console.log( chalk.blue(`News from ${newsSource} in ${country} from the ${category} field`))
            for(i=1; i<11; i++){
            let NewsByCategoryObj={
                SourceName:jsonData.articles[i].title,
                Description: jsonData.articles[i].description,
                URL: jsonData.articles[i].url,
                PublishedDate: jsonData.articles[i].publishedAt,
                
                }
                console.log(chalk.blue(`News headline number ${i}`));             
                console.log(NewsByCategoryObj);
                console.log("\n");
        }
            
            }
            
        catch(err){
            console.log(chalk.red(err));
        }
    }
    function categoryPrompt(newsSource,country,category){
        this.category=category;
        try{
        inquirer.prompt([
            {   type: 'list',
                name: 'category',
                message:'Select your preffered news category.',
                choices:["entertainment","health", "science", "sports", "technology"]

            }
    ])
    .then( answers =>{
        let category =answers.category;
        newsByCategory(newsSource,country,category)

    })
    }
    catch(error){
        console.log( chalk.red(error));
    }

    }
    // function to return a list of top four news sources
    async function newsSources(newsSource,country, category){
        this.newsSource =newsSource;
        this.category = category;
        this.country = country
        //url that returns a list of news sources
        const url = `${Base_URL}sources?apiKey=${API_KEY}`;
        try{
            const fetchResult =fetch(url);
            const response = await fetchResult;
            const jsonData =await response.json();
            const topNewsSources=[];
            const country=[];
            const category=[];
            for(i=1; i<5; i++){
                    topNewsSources.push(jsonData.sources[i].id);
                    country.push(jsonData.sources[i].country);
                    category.push(jsonData.sources.category);
                
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
                },
                {
                    type:'list',
                    name:'yesNo', 
                    message:'Do you need news from a specific Country or Field',
                    choices: ["Yes", "No"]
                }
            ])
            .then (answers =>{
                //a variable to store the name of the news source from the inquirer list
                let newsSource =answers.newsSource;
                let yesNo = answers.yesNo;
                //a variable to store the name of the country from the inquirer list
                const country= answers.country;
                if (yesNo === "No"){
                    topNewsHeadLines(newsSource, country)
                    }
                else if(yesNo === "Yes"){
                    categoryPrompt(newsSource,country,category)
                    }     
                else{
                    console.log(chalk.red("Select a news source to proceed"));
                }
                    }
                    )
        }
        
        catch (err) {
            console.error(chalk.red(err));
        }

        
        }

    const topNewsHeadLines = async (newsSource, country) => {
        try{
        const HeadlinesUrl = `${Base_URL}top-headlines?country=${country}&apiKey=${API_KEY}&source=${newsSource}`
        const fetchTopHeadLines =fetch(HeadlinesUrl)
    const response = await fetchTopHeadLines;
    const JsonData = await response.json();
    console.log("\n");
    console.log( chalk.blue(`News from ${newsSource} in ${country}`))
            
    for(let i=1; i<11; i++){
        const responseObject={
                Title:JsonData.articles[i].title,
                Description: JsonData.articles[i].description,
                URL: JsonData.articles[i].url,
                PublishedDate: JsonData.articles[i].publishedAt,
                        }
                console.log(chalk.blue(`News headline number ${i}`));             
                console.log(responseObject);
                console.log('\n');


                        }
    }
    catch(err){
        console.log (chalk.red(err))
    }
    }

    function menu(newsSource,country,category){
        console.log(
            chalk.yellow('Below is a Menu of different ways to obtain news Headlines\n'),
            chalk.green('Country:'), chalk.blue(' Returns top ten headlines from a particular country.\n'),
            chalk.green('Country/Feild:'), chalk.blue(' Returns headlines from a particular country and field i.e US/entertainment\n'),
            chalk.green('General:'),  chalk.blue(' Returns any ten headlines from any news source i.e CNN'));
        console.log( 
            chalk.green(chalk.yellow('\n MENU')));
        inquirer.prompt([
            {   type: 'list',
                name: 'menu',
                message:'Select your preffered news source by category.',
                choices:["Country", "Country/Field", "General"]

            }
        ])

        .then (answers =>{
            let choiceMade= answers.menu;
            try{
                switch (choiceMade) {
                    case "Country":
                        newsSources();
                        break;
                    case "Country/Field":
                        newsSources(newsSource,country,category)
                        break;
                    
                    case "General":
                        generalNews()
                        break;
                    
                    default:
                        console.log(chalk.red("No choice made. please make a choice to proceed"));
                        break;
                    }
                }
            
            catch(err){
                console.log( chalk.red(err));
            }  
                
        })       
    
}

module.exports= {
    menu
};