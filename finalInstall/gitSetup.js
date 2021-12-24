const { exec, spawnSync, execSync } = require("child_process");
const fs = require("fs");
const path = require('path')
const readlineSync = require('readline-sync')

module.exports.gitSetup =(blueprint)=>{
  const {gitRepoName,userName} = blueprint.git

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

  console.log(`git setup done`);
}
// touch README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin git@github.com:alexpchin/<reponame>.git
// git push -u origin master