const moment=require('moment');

const logger=(request, response, next)=>{
    console.log(moment().format());
    next();
}

module.exports = logger;