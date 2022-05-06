#!/usr/bin/env node
const fs = require('fs')
const path = require('path')



//delete app if it exists already, risky?? very!
//const {cleanup} = require('./dev_cleanup')
//cleanup()

// import default blueprint file or use your own
// if user supplies a name of a blueprint in the cwd then 
// that will be used
let blueprint
if(process.argv[2]){
  console.log('using custom blueprint')
  blueprint = require(path.join(process.cwd(),process.argv[2]))
}else{
  blueprint = require('./blueprints/blueprint.js')
}


//build folder structure
const content = fs.readFileSync(__dirname+'/skaffolds/express.json','utf8')
const {folders} = JSON.parse(content)
const {buildFolders} = require('./builders/folderBuilder/index')
const rootName = blueprint.name
buildFolders(rootName,folders)

//create entry file
const {buildEntryFile}= require('./builders/entryFileBuilder/index.js')
buildEntryFile(blueprint)

//create package.json
const{buildPackageJson} = require('./builders/packageJsonBuilder/index.js')
buildPackageJson(blueprint)

//build routes files
const {buildRouteFiles}=require('./builders/routesFileBuilder/index')
buildRouteFiles(blueprint)

//build controller files
const {buildControllerFiles}=require('./builders/controllersFileBuilder/index')
buildControllerFiles(blueprint)

//build middleware files
const {buildMiddlewareFiles}= require('./builders/middlewaresFileBuilder/index')
buildMiddlewareFiles(blueprint)

//build mongoDbSchem files
const {buildDbschemaFiles}= require('./builders/dbschemaFileBuilder/index')
buildDbschemaFiles(blueprint)

//setup mongoDb model files
const {buildDbmodelFiles}= require('./builders/dbmodelFileBuilder/index')
buildDbmodelFiles(blueprint)

//setup mongoDb config file
const {buildDbconfigFile}= require('./builders/dbconfigFileBuilder/index');
buildDbconfigFile(blueprint)

//populate .gitignore file
const{addToGitIgnore}=require('./finalInstall/index.js')
addToGitIgnore(blueprint)

//build error handler route and error custom class
const {buildErrorHandlerFile}= require('./builders/errorHandlingFileBuilder/index')
buildErrorHandlerFile(blueprint)

//create react app
if(blueprint.frontend.type==="React"){
  const{createReactApp}=require('./finalInstall/createReactApp')
  createReactApp(blueprint)
}


//run npm i inside of new folder and clean up package.json in cwd
const{npmInstall}=require('./finalInstall/index.js')
npmInstall(blueprint)



//create and connect to git repository
if(blueprint.git.gitCreate){
   const{gitSetup}=require('./finalInstall/gitSetup.js')
  gitSetup(blueprint)
}

//create heroku project and push everything live
if(blueprint.hosting.provider==="heroku"){
   const{herokuConfig}=require('./finalInstall/herokuConfig')
   herokuConfig(blueprint)
}


/*
Learn to
-write .js code in node
-use template language in node
-read and save files in node
-use command line from node.js node
-create git repository from command line
-create heroku project from command line
*/