var abs = require('./lib/absImgParser');
var imgParser = require('./lib/imgParser');
var replace = require('./lib/replace').replace
var path = require('path')

var filePath = process.argv[2]
//var filePath = path.resolve('/Users/mickey/work/node-webkit/TMSer/CSSImageParser-test/css.css');
//console.log('filePath:',filePath);

module.exports.parse =parse = function(filePath,encoding){
  var files = [];
  if(filePath){
    var opt = imgParser.parseByFilePath(filePath,encoding);
    opt.files = abs.parseImageABSPath(opt.files,filePath,true);
    //var content = replace(filePath,encoding,opt.files,true)
  }
  return opt;
}
//console.log(parse(filePath));
