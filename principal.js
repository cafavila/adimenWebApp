var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();

// Seteo de variables de ambiente para la aplicacion
app.set("WebApp", "AdimenWebApp");
app.locals({ titulo: "AdimenWebApp", empresa: "AdimenTech", contacto: "contacto@adimen.cl", serverName: "AdimenWebApp", port: 3000 });
app.use(express.compress());
// Trazamos la consola solo en ambiente de desarrollo
app.use(function (req, res, next)
{
    if ('development' == app.get('env'))
    {
        //console.log('===> %s %s: %s %s %s - %s */*/*/', fecha, req.host, req.path, req.method, req.ip, res.type);
        //   res.send(404, 'error no se encontro el pedido en este servidor');
        log = ' ===> ' + req.ip + ' ' + req.method + ' ' + req.host + ':' + app.locals.port + req.path;
        console.log('>>> Put %s>>>%s', new Date().getTimezoneOffset(), log);
        getLog4Node(log, false);
        next();
    }
    else if (app.get('env') == 'production')
    {
        getLog4Node(' ===> ' + req.ip + ' ' + req.method + ' ' + req.host + ':' + app.locals.port + req.path, false);
        next();
    }
});
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/log4Node'));
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
    getLog4Node("", true);
    console.log('Iniciado servidor Node Express en puerto http//%s:%s', app.locals.serverName, app.locals.port);
}


// funciones especiales
function getTimestamp()
{
    now = new Date();
    year = now.getFullYear();
    mes = ((now.getMonth() < 10) ? ("0" + now.getMonth()) : (now.getMonth()));
    dia = ((now.getDay() < 10) ? ("0" + now.getDay()) : (now.getDay));
    hora = ((now.getHours() < 10) ? ("0" + now.getHours) : (now.getHours()));
    minuto = ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes()));
    segundo = ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds()));
    milisegundo = now.getMilliseconds();
    return (year + '/' + mes + '/' + dia + ' ' + hora + ':' + minuto + ':' + segundo + '.' + milisegundo);
}
function getLog4Node(data, inicial)
{
    var fecha = getTimestamp();
    if (inicial)
    {
        fs.writeFile(__dirname + '/log4Node/logWebApp.log', fecha + ' **** Servidor iniciado **** \n');
    }
    else
    {
        fs.appendFile(__dirname + '/log4Node/logWebApp.log', fecha + '_' + data + '\n');
    }
}
