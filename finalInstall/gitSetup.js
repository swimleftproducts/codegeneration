const { exec, spawnSync, execSync } = require("child_process");
const fs = require("fs");
const path = require('path')
const readlineSync = require('readline-sync')

module.exports.gitSetup =(blueprint)=>{
  const {gitRepoName,userName} = blueprint.git
  const rootName = blueprint.name
  let gitHubToken = ""
  //get userToken
  gitHubToken = readlineSync.question('git hub token please: ', {
    hideEchoBack: true // The typed text on screen is hidden by `*` (default).
  });
  
  console.log("thank you")
  
  execSync(`cd ${blueprint.name}/ && curl -i -H "Authorization: token ${gitHubToken}" -d '{"name":"${gitRepoName}"}'  https://api.github.com/user/repos`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
  });

  execSync(`cd ${rootName}/ && git init && git add . && git commit -m"automatic first commit"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
  });

  execSync(`cd ${rootName}/ && git remote add origin git@github.com:${userName}/${gitRepoName}.git`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
});

execSync(`cd ${rootName}/ && git push origin main`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
}
if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
}
});

  console.log(`git setup done first commit pushed`);
}
