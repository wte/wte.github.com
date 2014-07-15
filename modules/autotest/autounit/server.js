
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var url = require('url');


var mimeTypes = require('./server_config/mime').types;

var extname = ''; 
extname += '/*.('; 
for (var p in mimeTypes) {
	extname += p + '|'; 
}

extname = extname.replace(/\|$/, ''); 
extname += '){1}'; 

app.all(extname, function(req, res, next){
    //var static_file_formats = ['.html','.css','.js','.jpg','.png'];
    //console.log(path.extname(req.url));
    var realpath = __dirname + url.parse(req.url).pathname;

    var extname = path.extname(req.url).replace(/^./, '');
    res.setHeader('content-type', mimeTypes[extname]);
    //console.log(realpath);
    if(path.existsSync(realpath)){
        res.end(fs.readFileSync(realpath));
    }else{
        res.end('Cannot find request url: '+req.url);
    }

    console.log('all'); 
});

app.listen(4000);
console.log('Server running at http://127.0.0.1:4000/');

// app.get('/*.action', function(req, res, next) {
//     console.log(req.url);
//     res.send('hi');
// })


