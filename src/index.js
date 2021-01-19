require('dotenv').config();
const app = require('./app');
require('../src/config/conexionMongoDB');
async function main() {
    await app.listen(app.get('port'));
    console.log('server started on port ', app.get('port'));
}
main();