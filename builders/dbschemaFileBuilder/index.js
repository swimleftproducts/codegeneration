const fs = require('fs')
const ejs = require('ejs')
const path=require('path')
const helpers=require('../helperFunctions/index')

module.exports.buildDbschemaFiles=(blueprint)=>{

const rootName=blueprint.name;
const dbmodels = Object.keys(blueprint.database.models)

const dbmodelFileEntityLocation = blueprint.database.schemaEntity
const dbmodelLocation = blueprint.database.schemaLocation

let dbmodelFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${dbmodelFileEntityLocation}`),'utf8')
  
dbmodels.forEach(model => {
  //render the file
  let modelFile = ejs.render(dbmodelFileEntity,{
   model:model,
   schemaKey:blueprint.database.models[model] 
  })

  //save file
  fs.writeFileSync(path.join(process.cwd(),`${rootName}/${dbmodelLocation}/${model}Schema.js`),modelFile)
});

}