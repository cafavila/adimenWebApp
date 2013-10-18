var express = require('express');
var https = require('https');
var http = require('http');

var app = express();

// Seteo de variables de ambiente para la aplicacion
app.set("WebApp", "AdimenWebApp");
app.locals({ titulo: "AdimenWebApp", empresa: "AdimenTech", contacto: "contacto@adimen.cl", serverName: "AdimenWebApp", port: 3000 });
// Trazamos la consola solo en ambiente de desarrollo
app.use(function (req, res, next) {
    var fecha = new Date();
    if ('development' == app.get('env')) {
        console.log('===> %s %s: %s %s %s - %s */*/*/', fecha, req.host, req.path, req.method, req.ip, res.type);
     //   res.send(404, 'error no se encontro el pedido en este servidor');
        next();
    }
});
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.get('/', function (req, res)
{
    //res.sendfile(__dirname + '/public/index.html');
    res.sendfile('index.html');
});

// Iniciamos el Servidor
http.createServer(app).listen(3000);
//https.createServer(options, app).listen(3010);

// Solo desarrollo
    if ('development' == app.get('env'))
    {
        console.log('Iniciado servidor Node Express en puerto http//%s:%s', app.locals.serverName, app.locals.port);
    }
