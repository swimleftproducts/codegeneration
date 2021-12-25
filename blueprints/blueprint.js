
const blueprint={
  "name": "APP",
  "entryFileEntity": "rootEntity.ejs",
  "hosting":{
    "provider":"heroku",
    "name":"testApp"
  },
  "frontend":{
    "type":"React",
    "location":"client"
  },
  "routes":{
    "routeLocation": 'routes',
    "controllerLocation":'controllers',
    "routeEntity":"routeEntity.ejs",
    "controllerEntity":"controllerEntity.ejs",
    "controllers":{
      // the key is the name of the controller file for the subsequent routes
      "user":[
        //each array details a route
        // [HTTPMethod, route, routeName, [DBmodelsUsed]]
        ['get','/api/user/:id',"getUsers",["user"]],
        ['post','/api/user',"createUser",["user"]]
      ],
      "company":[
        ['get','/api/company/:id',"getCompany",["company"]],
        ['post','/api/company',"createCompany",["company"]]
      ]
    }
  },
  "database":{
    "schemaLocation":"models",
    "modelLocation":"models",
    "schemaEntity": "mongoDbschemaEntity.ejs",
    "modelEntity": "mongoDbModelsEntity.ejs",
    "configEntity": "mongoDbConfigEntity.ejs",
    "connectionStringDev": "mongodb+srv://${process.env.DBUNAMEDEV}:${process.env.DBPWDDEV}@cluster0.d6dt5.mongodb.net/${process.env.DBNAMEDEV}?retryWrites=true&w=majority",
    "connectionStringProd":"mongodb+srv://${process.env.DBUNAMEPROD}:${process.env.DBPWDPROD}@cluster0.d6dt5.mongodb.net/${process.env.DBNAMEPROD}?retryWrites=true&w=majority",
    "credentials":{
      "dev":{
        "DBNAMEDEV":"todoDev",
        "BUNAMEDEV":"testName",
        "DBPWDDEV":"testName"
      },
      "prod":{
        "DBNAMEPROD": "todoDev",
        "BUNAMEPROD":"testName",
        "DBPWDPROD":"testName"
      }
    },

    "models":{
      "user":[
        ["name","String"],
        ["age","Number"]
      ],
      "company":[
        ["name","string"],
        ["founded","number"]
      ]
    }
  },
  middleware:{
    "middlewareEntity":"middlewareEntity.ejs",
    middlewareLocation:"middleware",
    types:{
      auth:[
        ["cors.ejs","cors","cors"]
      ],
      general:[
        //[entityFile,dependencyVariableName,packageName]
        ["cors.ejs","cors","cors"],
        ["json.ejs","express","express"],
        ["urlEncoded.ejs","express","express"],
      ]
    }
  },
  "errorHandling":{
    "errorHandlerLocation":"errorHandling",
    "errorHandlerEntity": "errorHandlerEntity.ejs",
  },
  "dependencies":[
    "dotenv",
    "axios",
    "ejs",
    "express",
    "mongoose",
    "cors",
    "concurrently",
    "nodemon"
  ],
  "gitignore":[
    "node_modules",
    ".env"
  ],
  "git":{
    "gitCreate":true,
    "gitRepoName":"Firstworking",
    "userName":"swimleftproducts"
}
  }
  
module.exports=blueprint