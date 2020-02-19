var connect = require('connect');
const path = require('path')
var serveStatic = require('serve-static');
const prod_path = path.resolve(__dirname, '..', 'cytel-ui', 'build')
const dev_path = path.resolve(__dirname, '..', 'cytel-ui', 'dist')

const env = process.argv.slice(2)[0];
const __path = env === '--dev' ? dev_path : prod_path;
const server = env === '--dev' ? 'Development' : 'Production';
connect().use(serveStatic(__path)).listen(8080, function(){
    console.log(`${server} server running on 8080`);
});