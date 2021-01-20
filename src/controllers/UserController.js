const UserModel = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;
const { encryptPassword } = require('../lib/helpers');

class UserController {

    createUser = async (data) => {
        try {
            const { firstname,surname,username,password,mail } = data;
            var result;
            if (firstname == '' || surname == '' || username == '' || password == '' || mail == '') {
                result = 2;
            } else {
                const queryOne = await UserModel.findOne({ username: username });
                if (queryOne !== null ) {
                    result = 3;
                } else {
                    const queryTwo = await UserModel.findOne({ mail: mail });
                    if (queryTwo !== null) {
                        result = 4;
                    } else {
                        const queryOne = await UserModel.find().sort({$natural:-1}).limit(1);
                        let id = queryOne.length > 0 ? parseFloat(queryOne[0].id) + 1 : 1;
                        let passwordEncrypted = await encryptPassword(password);
                        const newUser = new UserModel({
                            id,
                            firstname,
                            surname,
                            username,
                            password: passwordEncrypted,
                            mail
                        });
                        const rest = await newUser.save();
                        result = rest !== null ? 1 : 0;
                    }
                }
            }            
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsers = async (id) => {
        try {
            let result;
            result = id !== null ? await UserModel.find({ $and: [ { id: { $ne: id } },{ id: { $ne: 1 } } ]}) : [];
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async (data) => {
        try {
            const result = await UserModel.findOne({_id: data});
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (data) => {
        try {
            const result = await UserModel.findOneAndDelete({_id: data});
            return result !== null ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = { UserController };