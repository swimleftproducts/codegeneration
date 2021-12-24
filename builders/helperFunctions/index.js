module.exports ={

  getRouteTypes(blueprint){
   return Object.keys(blueprint.routes.controllers)
  },
  getMiddlewareTypes(blueprint){
    return Object.keys(blueprint.middleware.types)
  },
  getUniqueDependencies(dependencies){
    

    return  uniqueDependencies
  }
}