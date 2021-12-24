const fs = require('fs')
const ejs = require('ejs')
const helpers=require('../helperFunctions/index')
const path= require('path')

module.exports.buildRouteFiles=(blueprint)=>{

const rootName=blueprint.name;
const routeFileEntityLocation = blueprint.routes.routeEntity

const routeTypes = helpers.getRouteTypes(blueprint)
const routeLocation = blueprint.routes.routeLocation
const controllerLocation = blueprint.routes.controllerLocation

let routeFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${routeFileEntityLocation}`),'utf8')
  
routeTypes.forEach(routeType => {

  //pull routes for each route type
  const routes = blueprint.routes.controllers[routeType]


  //render the file
  let routeFile = ejs.render(routeFileEntity,{
    routeType,
    routes,
    controllerLocation
  })

  fs.writeFileSync(path.join(process.cwd(),`${rootName}/${routeLocation}/${routeType}.js`),routeFile)



});

}