const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const helpers=require('../helperFunctions/index')

module.exports.buildMiddlewareFiles=(blueprint)=>{

const rootName=blueprint.name;
const middlewareTypes = Object.keys(blueprint.middleware.types)

const middlewareFileEntityLocation = blueprint.middleware.middlewareEntity
const middlewareLocation = blueprint.middleware.middlewareLocation

let middlewareFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${middlewareFileEntityLocation}`),'utf8')
  
middlewareTypes.forEach(middlewareType => {
  //pull routes for each route type
  const middlewares= blueprint.middleware.types[middlewareType]
 
  //get unique dependencies
  let dependencies=middlewares.map(element => {
    return element[2]
  });
  let uniqueDependencies = [...new Set(dependencies)];

  // check for different naming for packages
  let dependenciesNames=middlewares.map(element => {
    return element[1]
  });
  let uniqueNames = [...new Set(dependenciesNames)];
  if(uniqueDependencies.length !== uniqueNames.length){
    console.log("you have the same packages required with different names. BOTH require statements were included. Code will error until addressed")
    uniqueNames=dependenciesNames
    uniqueDependencies=dependencies
  }
  

  //render the file
  let middlewareFile = ejs.render(middlewareFileEntity,{
    path:path,
    __dirname,
    middlewares:middlewares,
    dependencies:uniqueDependencies,
    names:uniqueNames
  })
  //save file
  
  fs.writeFileSync(path.join(process.cwd(),`${rootName}/${middlewareLocation}/${middlewareType}Middleware.js`),middlewareFile)
});

}