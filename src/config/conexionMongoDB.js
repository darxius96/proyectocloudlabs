const mongoose = require('mongoose');
const MONGO_URL = process.env.URLMONGO ? process.env.URLMONGO : 'mongodb+srv://cloudlabs:aeWV5d853NnNPK2B@cluster0.waobj.mongodb.net/db_cloudlabs?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongodb is connected');
});