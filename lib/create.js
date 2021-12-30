const actions = require('./actions');
const Generator = require('./generator');

module.exports = async (name, option) => {
    const { targetDir } = await actions.dirCheck(name, option);
    const { stack } = await actions.stackSelect();
    const { type } = await actions.createType();
    const { client } = await actions.clientType();
    if (type === 'default') {
        const generator = new Generator(name, targetDir, stack, client)
        generator.create();
        return;
    }
};