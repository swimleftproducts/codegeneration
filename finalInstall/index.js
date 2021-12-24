const { exec } = require("child_process");
const fs = require("fs");
const path = require('path')

const npmInstall =(blueprint)=>{
  exec(`cd ${blueprint.name}/ && npm i`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`Installed dependencies: ${stdout}
  type 'npm run start' to start server'
  `);
  });
}

const addToGitIgnore=(blueprint)=>{
  const rootName=blueprint.name
  thingsToIgnore=blueprint.gitignore
  thingsToIgnore.forEach(element => {
    fs.appendFileSync(path.join(process.cwd(),`${rootName}/.gitignore`),`\n${element}`)
  });
}

module.exports ={
  npmInstall,
  addToGitIgnore
}