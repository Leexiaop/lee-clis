#! /usr/bin/env node

const program = require('commander');

program
    // 查看版本
    .version(require('../package.json').version)
    //  创建
    .command('create <name>')
    .option('-f, --force', '是否强制覆盖')
    .description('创建项目')
    .action((name, option) => {
        require('../lib/create.js')(name, option)
    })

program.parse(process.argv);