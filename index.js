const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const funtion = require('./functions');

clear();
console.log(
    chalk. blue(
        figlet.textSync('YOUR NEWS', { horizontalLayout: 'full' })
    )
);