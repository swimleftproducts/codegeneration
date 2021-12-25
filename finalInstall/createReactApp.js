const { execSync } = require("child_process")


module.exports.createReactApp =(blueprint) =>{
  //front end folder location and app name
  const frontendLocation = blueprint.frontend.location
  const rootName=blueprint.name
 
  console.log('creating the react app... may take a bit')
  execSync(`cd ${blueprint.name}/ && npx create-react-app client`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
  });

  execSync(`cd ${blueprint.name}/client && rm -rf .git`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
});

  console.log(`React app created in ${rootName}/client \n
  .git file removed in client 
  `)

}