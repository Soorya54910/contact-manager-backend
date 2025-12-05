const {constants} = require('../constants')
const errorHandler = (err,req,res,next)=>{
  const statuscode = res.statusCode? res.statusCode : 500
  switch (statuscode) {
    case constants.FORBIDDEN:
        res.json({title : "Forbidden",message : err.message,stackTrace : err.stack})
        break;
    case constants.VALIDATION_ERROR:
        res.json({title : "validation Error",message : err.message,stackTrace : err.stack})
        break;
    case constants.UNAUTHORIZED:
        res.json({title : "Unauthorized",message : err.message,stackTrace : err.stack})
        break;  
    case constants.NOT_FOUND:
        res.json({title : "Not Found",message : err.message,stackTrace : err.stack})
        break;
    case constants.INTERNAL_SERVER_ERROR:
        res.json({title : "Internal server error",message : err.message,stackTrace : err.stack})
        break;              
    default:
        console.log('No error all fine')
        break;
  }
}

module.exports = errorHandler