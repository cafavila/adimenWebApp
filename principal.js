var express = require('express');
//var port = require('port');
var app = express();

app.set("WebApp", "AdimenWebApp");
var serverName = app.get("WebApp");
app.use(express.static(__dirname + '/public'));
// Trazamos la consola solo en ambiente de desarrollo
app.use(function (req, res, next) {
    var fecha = new Date();
    if ('development' == app.get('env')) {
        console.log('==> %s %s %s |--||', fecha, req.method, res.url);
        next();
    }
});
app.use(express.logger());
app.get('/', function (req, res)
{
    //res.sendfile(__dirname + '/public/index.html');
    res.sendfile('index.html');
});
// Iniciamos el Servidor
port = 3000;
app.listen(port);
// Solo desarrollo
    if ('development' == app.get('env'))
    {
        console.log('Iniciado servidor Node Express en puerto http//%s:%s', serverName, port);
    }
