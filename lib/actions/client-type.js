const inquirer = require('inquirer');

const actionList = [
    {
        name: 'Web Client',
        value: 'pc'
    },
    {
        name: 'Mobile Client',
        value: 'mobile'
    }
];

module.exports = async () => {
    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Please pick a preset!',
            choices: actionList
        }
    ]);
    return new Promise((resolve) => {
        resolve({ client: action})
    })
};