const fs = require('fs')
const path= require('path')

module.exports.buildFolders=(rootName,folders)=>{
  let fileRegX = /\./
  if (!fs.existsSync(rootName)){
    folders.map(element=>{
      let dirPath=element
      makeDir(rootName,dirPath)
    })  

    function makeDir(rootPath,folderPath){
      if(typeof folderPath === "object" && !Array.isArray(folderPath)){
        const newRoot =Object.keys(folderPath)
        const nestedPath = rootPath+"/"+newRoot
        folderPath[newRoot].map((element) => {
          makeDir(nestedPath,element )
        })
        return
      }
      if(fileRegX.test(folderPath)){
        fs.writeFileSync(path.join(process.cwd(),`${rootPath}/${folderPath}`),"",(err) => {
          console.log(err)
        })
        return
      }
     
      fs.mkdirSync(path.join(process.cwd(),`${rootPath}/${folderPath}`), { recursive: true });      
    }
  }else{  
    console.log('please check if root folder already exists')
  }  
}
