const inquirer = require('inquirer');

const actionList = [
    {
        name: 'Default',
        value: 'default'
    },
    {
        name: 'Manually select features!',
        value: 'manually'
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
        resolve({ type: action})
    })
};