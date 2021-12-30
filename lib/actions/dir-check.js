/**
 * 检查文件名是否重复
 */
const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');
const ora = require('ora');
const inquirer = require('inquirer');

const spinner = ora('Start Removing...');
const actionList = [
    {
        name: 'OverWrite',
        value: 'overwrite'
    },
    {
        name: 'Cancel',
        value: 'cancel'
    }
];

module.exports = async (name, option) => {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, name);
    if (fs.existsSync(targetDir)) {
        if (option.force) {
            spinner.start();
            await fs.remove(targetDir);
            spinner.succeed('Remove Success!');
        } else {
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    message: `${name} is already exist, please choose one for operating!`,
                    type: 'list',
                    choices: actionList
                }
            ]);
            if (action === 'cancel') {
                shell.exit(1);
            }
            if (action === 'overwrite') {
                spinner.text = 'Start Removing...';
                spinner.start();
                await fs.remove(targetDir);
                spinner.succeed('OverWrite Success!');
            }
        }
    }
    return new Promise((resolve) => {
        resolve({
            targetDir
        })
    });
};
