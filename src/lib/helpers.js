const bycrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(13);
    const hash = await bycrypt.hash(password, salt);
    return hash;
}

helpers.comparePassword = async (password, savedPassword) => {
    try {
        return await bycrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports = helpers;