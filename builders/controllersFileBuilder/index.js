const fs = require('fs')
const ejs = require('ejs')
const helpers=require('../helperFunctions/index')
const path= require('path')

module.exports.buildControllerFiles=(blueprint)=>{

const rootName=blueprint.name;
const routeTypes = helpers.getRouteTypes(blueprint)

const controllerFileEntityLocation = blueprint.routes.controllerEntity
const controllerLocation = blueprint.routes.controllerLocation

let controllerFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${controllerFileEntityLocation}`),'utf8')
  
routeTypes.forEach(routeType => {

  //pull routes for each route type
  const routes = blueprint.routes.controllers[routeType]
 

  //render the file
  let controllerFile = ejs.render(controllerFileEntity,{
    routeType,
    routes,
    controllerLocation
  })

  fs.writeFileSync(path.join(process.cwd(),`${rootName}/${controllerLocation}/${routeType}Controller.js`),controllerFile)



});

}