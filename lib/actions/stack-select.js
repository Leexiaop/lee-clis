/**
 * 技术栈的选择
 */
const ora = require('ora');
const inquirer = require('inquirer');

const spinner = ora('Start Removing...');

const actionList = [
    {
        name: 'React',
        value: 'react'
    },
    {
        name: 'Vue2.x',
        value: 'vue2'
    },
    {
        name: 'Vue3.x',
        value: 'vue3'
    },
    {
        name: 'Angular',
        value: 'angular'
    }
];

module.exports = async () => {
    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Please select one of your favourate JavaScript libraries!',
            choices: actionList
        }
    ]);
    return new Promise((resolve) => {
        resolve({ stack: action });
    });
};