const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const helpers=require('../helperFunctions/index')

module.exports.buildDbconfigFile=(blueprint)=>{

const rootName=blueprint.name;

const dbconfigFileEntityLocation = blueprint.database.configEntity

const prod = blueprint.database.connectionStringProd
const dev = blueprint.database.connectionStringDev

let dbconfigFileEntity = fs.readFileSync(path.join(__dirname,`../../entities/${dbconfigFileEntityLocation}`),'utf8')
  
let modelFile = ejs.render(dbconfigFileEntity,{
  prod,
  dev
})

//save file
fs.writeFileSync(path.join(process.cwd(),`/${rootName}/config/dbConfig.js`),modelFile)

const credentials = Object.keys(blueprint.database.credentials)

credentials.forEach(environment => {
  const envCredentials=Object.keys(blueprint.database.credentials[environment])
  envCredentials.forEach(element => {
     fs.appendFileSync(path.join(process.cwd(),`${rootName}/.env`),`\r\n${element}=${blueprint.database.credentials[environment][element]}`)
  });
});



}