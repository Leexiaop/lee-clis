const actions = require('./actions');
const Generator = require('./generator');

module.exports = async (name, option) => {
    await actions.dirCheck(name, option);
    const { stack } = await actions.stackSelect();
    const { type } = await actions.createType();
    const { client } = await actions.clientType();
    if (type === 'default') {
        const generator = new Generator(name, stack, client)
        generator.create();
        return;
    }
};