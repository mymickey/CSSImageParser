var fs =require('fs');
var path = require('path');
/** 获取图片绝对路径 **/
 function parseImageABSPath(files,cssFilePath,filterNoExist){
  var filedir = path.dirname(cssFilePath),arr=[];
  files.forEach(function(v,k){
    var asbPath ,exist , rePath = path.resolve(v),opt;
    if(!fs.existsSync(rePath)){   
      absPath = path.join(filedir,v);
      exist = fs.existsSync(absPath);
    }
    else{
      absPath = rePath;
      exist = true
    }

   if( (filterNoExist===true && exist === true) || (filterNoExist !== true) ) {
      opt = {
         exist:exist,
         path:absPath,
         codePath:v
      }
    }
    opt && arr.push(opt);
  });
  return arr
};
module.exports.parseImageABSPath  = parseImageABSPath;