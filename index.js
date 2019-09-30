const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
// import functions from './functions'
const {newsSources,menu} = require('./apiFunctions');

clear();
console.log(
    chalk. blue(
        figlet.textSync('YOUR NEWS', { horizontalLayout: 'full' })
    )
);


menu();