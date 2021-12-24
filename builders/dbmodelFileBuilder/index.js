const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const helpers=require('../helperFunctions/index')

module.exports.buildDbmodelFiles=(blueprint)=>{

const rootName=blueprint.name;
const dbmodels = Object.keys(blueprint.database.models)

const dbmodelFileEntityLocation = blueprint.database.modelEntity
const dbmodelLocation = blueprint.database.modelLocation

let dbmodelFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${dbmodelFileEntityLocation}`),'utf8')
  
dbmodels.forEach(model => {
  //render the file
  let modelFile = ejs.render(dbmodelFileEntity,{
   dbmodels:dbmodels,
  })

  //save file
  fs.writeFileSync(path.join(process.cwd(),`${rootName}/${dbmodelLocation}/index.js`),modelFile)
});

}