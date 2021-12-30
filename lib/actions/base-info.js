const inquirer = require('inquirer');

const actionList = [
    {
        name: 'name',
        type: 'input',
        message: 'Please input your program name!'
    },
    {
        name: 'description',
        type: 'input',
        message: 'Please Write some descriptions for your program!'
    },
    {
        name: 'author',
        type: 'input',
        message: 'Here is the author of your program!'
    }
];

module.exports = async () => {
    const { action } = await inquirer.prompt(actionList);
};