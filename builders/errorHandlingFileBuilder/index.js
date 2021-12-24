const fs = require('fs')
const ejs = require('ejs')
const helpers=require('../helperFunctions/index')
const path= require('path')

module.exports.buildErrorHandlerFile=(blueprint)=>{

const rootName=blueprint.name;

const errorHandlerFileEntityLocation = blueprint.errorHandling.errorHandlerEntity
const errorHandlerLocation = blueprint.errorHandling.errorHandlerLocation

let errorHandlerFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${errorHandlerFileEntityLocation}`),'utf8')

//render the file
let controllerFile = ejs.render(errorHandlerFileEntity,{

})

 fs.writeFileSync(path.join(process.cwd(),`${rootName}/${errorHandlerLocation}/errorHandler.js`),controllerFile)

}