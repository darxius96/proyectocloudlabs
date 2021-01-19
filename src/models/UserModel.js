const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    id: { type: Schema.Types.Number, required: true },
    firstname: { type: Schema.Types.String, required: true },
    surname: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    mail: { type: Schema.Types.String, required: true },
},{
    timestamps: true
});
module.exports = model('User', userSchema);