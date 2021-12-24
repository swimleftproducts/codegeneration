const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const helpers=require('../helperFunctions/index')

module.exports.buildEntryFile=(blueprint)=>{
  
  const rootName = blueprint.name
  const entryFileEntityLocation = blueprint.entryFileEntity

  //pull required structure for entry file from blueprint file
  const routeTypes = helpers.getRouteTypes(blueprint)
  const routeLocation = blueprint.routes.routeLocation

  const middlewareTypes = helpers.getMiddlewareTypes(blueprint)
  const middlewareLocation = blueprint.middleware.middlewareLocation
  
  
  var entryFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${entryFileEntityLocation}`),'utf8')
  
  let entryFile = ejs.render(entryFileEntity,{
    routeTypes,
    routeLocation,
    middlewareTypes,
    middlewareLocation
  })
   fs.writeFileSync(path.join(process.cwd(),`${rootName}/index.js`),entryFile)
}