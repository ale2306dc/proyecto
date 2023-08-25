const app = require('./app') //Creando el protocolo de transferencia para creara nuestro propio servidor http

const port = process.env.PORT || 9000
const http = require('http')
const server = http.createServer(app);

server.listen(port, () => {
    console.log('El servidor esta corriendo en el puerto', port);
})