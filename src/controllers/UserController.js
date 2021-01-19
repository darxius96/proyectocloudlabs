const UserModel = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;

class UserController {

    createUser = async (data) => {
        try {
            const { firstname,surname,username,password,mail } = data;
            const queryOne = await UserModel.find().sort({$natural:-1}).limit(1);
            let id = queryOne.length > 0 ? parseFloat(queryOne[0].id) + 1 : 1;
            const newUser = new UserModel({
                id,
                firstname,
                surname,
                username,
                password,
                mail
            });
            const result = await newUser.save();
            return result !== null ? 1 : 0;
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsers = async () => {
        try {
            let data = new Array();
            const result = await UserModel.find();
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