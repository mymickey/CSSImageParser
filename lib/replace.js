var fs = require('fs');
var path = require('path');
/**
 * 将CSS文件中的路径替换成指定的路径
 * @param  {String} filePath file path
 * @param  {Array} imgArr   文件数组
 * @return {String}	被替换后的文件内容
 */
module.exports.replace  = function(filePath,encoding,files,replaceAsSave){
	var content = fs.readFileSync(filePath, encoding ||'utf-8');
	files.forEach(function(v,k){
		var re = new RegExp(v.codePath)
		content = content.replace(v.codePath,v.path)
	});
	if(replaceAsSave===true){
		fs.writeFileSync(filePath, content, encoding);
	}
	return content
};