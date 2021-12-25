const { execSync, spawnSync } = require("child_process")


module.exports.herokuConfig =(blueprint) =>{
  //front end folder location and app name
  const herokuName = blueprint.hosting.name
  const rootName=blueprint.name
  
  console.log('lets get this project live... work with me here:')
  //log into heroku
  const login = spawnSync(`heroku`,['login','-i'],{
    stdio: 'inherit'
  });
  //create new project and pull names
  const git = spawnSync(`git`,['init'],{cwd:`./${rootName}`});
  const createNewProject = spawnSync(`heroku`,['create',`${herokuName}`],{cwd:`./${rootName}`});

  const[projectHerokuGit,projectUrl]=createNewProject.stdout.toString('utf-8').split(' | ')
  
  console.log(`project url at ${projectUrl}`)
  console.log(`project git at ${projectHerokuGit}`)
}