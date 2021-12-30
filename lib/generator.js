const shell = require('shelljs');
const ora = require('ora');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const actions = require('./actions');

class Generator {
    constructor(name, stack, client) {
        this.name = name;
        this.stack = stack;
        this.client = client;
    }

    async create() {
        const spiner = ora('Waiting for downloading template...')
        spiner.start();
        try {
            await exec(`git clone https://github.com/Leexiaop/fe-${this.stack}-${this.client}-template ${this.name}`);
            spiner.stop();
            // spiner.succeed('Cogratulations! Download Success!');
            // await actions.baseInfo();
            shell.exit(1);
        } catch(error) {
            spiner.fail('Download Fali!');
            shell.exit(1);
        }
    }
}

module.exports = Generator