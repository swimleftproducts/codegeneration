const fs = require('fs')
const path = require('path')

module.exports.cleanup=()=>{
// import blueprint file
const blueprint = require('./blueprints/blueprint.js')

//build folder structure
const rootName = blueprint.name

fs.rmdirSync(path.join(process.cwd(),`${rootName}`), { recursive: true });
 console.log(`${rootName} is deleted!`);
}