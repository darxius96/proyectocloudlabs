const mongoose = require('mongoose');
const MONGO_URL = process.env.URLMONGO ? process.env.URLMONGO : process.env.MONGOFAIL;
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