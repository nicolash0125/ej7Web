//Importa modulos
const fs = require("fs");
const axios = require('axios');
const http = require('http');
const { stringify } = require("querystring");


//Crea un archivo en el sistema de archivos 








urlProveedores = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
urlClientes = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'


axios.get(urlProveedores).then(respProv => {    
    
    
    var contenidoProveedores = '<!DOCTYPE html> <html lang="en"> <head>     <meta charset="UTF-8">     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">     <meta name="viewport" content="width=device-width, initial-scale=1.0">     <title>Proveedores</title> </head> <body>     <section class="container">         <h1 class="text-center">Listado de proveedores</h1>         <table class="table-striped">             <thead>                 <tr>                     <th scope="col">ID</th>                     <th scope="col">Nombre</th>                     <th scope="col">Contacto</th>                 </tr>             </thead>             <tbody>'                  
    
    respProv.data.forEach(element => {
        contenidoProveedores +='<tr>'
        contenidoProveedores +='<td>'
        contenidoProveedores += element.idproveedor
        contenidoProveedores +='</td>'

        contenidoProveedores +='<td>'
        contenidoProveedores += element.nombrecompania
        contenidoProveedores +='</td>'

        contenidoProveedores +='<td>'
        contenidoProveedores += element.nombrecontacto
        contenidoProveedores +='</td>'

        contenidoProveedores += '</tr>'
    });
    
    
    
    contenidoProveedores += '</tbody>         </table>     </section> </body> </html>'
    
    
    fs.writeFile("proveedores.html", contenidoProveedores, "utf-8", (err) => {
        if (err) console.log("Error writing file");
      });
    
});

axios.get(urlClientes).then(respClientes => {    
    
    
    var contenidoClientes = '<!DOCTYPE html> <html lang="en"> <head>     <meta charset="UTF-8">     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">     <meta name="viewport" content="width=device-width, initial-scale=1.0">     <title>Clientes</title> </head> <body>     <section class="container">         <h1 class="text-center">Listado de clientes</h1>         <table class="table-striped">             <thead>                 <tr>                     <th scope="col">ID</th>                     <th scope="col">Nombre</th>                     <th scope="col">Contacto</th>                 </tr>             </thead>             <tbody>                  '
    respClientes.data.forEach(element => {
        contenidoClientes +='<tr>'
        contenidoClientes +='<td>'
        contenidoClientes += element.idCliente
        contenidoClientes +='</td>'

        contenidoClientes +='<td>'
        contenidoClientes += element.NombreCompania
        contenidoClientes +='</td>'

        contenidoClientes +='<td>'
        contenidoClientes += element.NombreContacto
        contenidoClientes +='</td>'

        contenidoClientes += '</tr>'
    });
    
    
    
    contenidoClientes += '</tbody>         </table>     </section> </body> </html>'
    
    
    fs.writeFile("clientes.html", contenidoClientes, "utf-8", (err) => {
        if (err) console.log("Error writing file");
      });
    
});


// Crea una nueva instancia del servidor
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); 

    if (req.url=='/api/proveedores'){
        fs.readFile('proveedores.html', 'utf8', function(err, data){ 
    
            // Display the file content 
            res.end(data);
        }); 
        
    }
    if (req.url=='/api/clientes'){
        fs.readFile('clientes.html', 'utf8', function(err, data){ 
    
            // Display the file content 
            res.end(data);
        }); 
    }
    

// Contenido de la respuesta por defecto del servidor


}).listen(8081); // Puerto que usará el servidor para escuchar las solicitudes



