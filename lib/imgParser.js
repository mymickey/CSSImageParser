var path = require('path');
var fs = require('fs');


var REGEXP_BACKGROUND = exports.REGEXP_BACKGROUND = /([\w\-]+\s*:\s*[\#\w\d]*\s*)(url\s*\((?!\s*data:).+\)\s*[\w%\s,\-]*)+(;|(?=\}))/gi;
var REGEXP_IMAGE = exports.REGEXP_IMAGE = /url\s*\(\s*["']?\s*([^\(\)]*)\.(png|jpg|jpeg|gif)\s*["']?\s*\)/gi;


//合并参数
var merge = function () {
  var i = 0;
  var len = arguments.length;
  var result = {};
  var key, obj;

  for (; i < len; ++i) {
    obj = arguments[i];
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}


/**
@method parseByContent
@param {String} filecontent css代码
分析图片相对路径

@example
    
    var csscontent = fileutil.read('my.css');
    var minifycontent = this.parseByContent(csscontent);

**/
module.exports.parseByContent = parseByContent = function (filecontent) {
  
  var files = [];
  filecontent = filecontent.replace(REGEXP_BACKGROUND, function (matches, prefix, urls, postfix) {

    //获得图片的路径
    var result = urls.replace(REGEXP_IMAGE, function (imageMatches, basename, type) {
      var filename,r =null;
      if(imageMatches){
         imageMatches = imageMatches.replace(/\"|\'/g,'');
         r = imageMatches.replace(/url\([\s]*(.*?)\)/i,function(str,r){
            return r;
         })
      }
      return r
    });
    result && files.push(result);
    return result;
  });
  return files;
}
/**
 * 通过css文件路径获取内容中的image url
 * @param  {String} filePath [css file path]
 * @param  {String} encoding   [css file encoding]
 * @return {Array}          ['pic.png'] 
 */
module.exports.parseByFilePath = parseByFilePath =function(filePath,encoding){
  var content = fs.readFileSync(filePath,encoding||'utf-8');
  var files =  parseByContent(content)  
  return {
    files:files,
    content:content
  };
}

