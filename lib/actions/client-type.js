const inquirer = require('inquirer');

const actionList = [
    {
        name: 'Web Client',
        value: 'pc'
    },
    {
        name: 'Mobile Client',
        value: 'h5'
    }
];

module.exports = async () => {
    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Please pick a client for your program!',
            choices: actionList
        }
    ]);
    return new Promise((resolve) => {
        resolve({ client: action})
    })
};