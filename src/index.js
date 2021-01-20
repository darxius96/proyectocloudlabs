require('dotenv').config();
require('../src/config/conexionMongoDB');
const app = require('./app');
async function main() {
    await app.listen(app.get('port'));
    console.log('server started on port', app.get('port'));
}
main();