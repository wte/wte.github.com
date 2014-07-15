
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var url = require('url');


app.all('/*.(html|css|js|jpg|png){1}', function(req, res, next){
    //var static_file_formats = ['.html','.css','.js','.jpg','.png'];
    //console.log(path.extname(req.url));
    var realpath = __dirname + '/static' + url.parse(req.url).pathname;

    var extname = path.extname(req.url).replace(/^./, '');
    res.setHeader('content-type', mimeTypes[extname]);
    //console.log(realpath);
    if(path.existsSync(realpath)){
        res.end(fs.readFileSync(realpath));
    }else{
        res.end('Cannot find request url: '+req.url);
    }
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');