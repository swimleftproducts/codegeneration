const fs = require('fs')
const ejs = require('ejs')
const path=require('path')

module.exports.buildPackageJson=(blueprint)=>{
  const rootName = blueprint.name
  //get list of dependencies
  const dependencies = blueprint.dependencies

  var packageJsonEntity = fs.readFileSync(path.join(__dirname,`../../entities/packageJson.ejs`),'utf8')
 
  let packageJson = ejs.render(packageJsonEntity,{
    dependencies
  })
  fs.writeFileSync(path.join(process.cwd(),`${rootName}/package.json`),packageJson)
 }