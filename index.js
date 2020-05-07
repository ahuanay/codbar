const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./config/database');
const socketIO = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(morgan('start'));
app.use(express.json());

app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/roles', require('./routes/rol.routes'));
app.use('/api/menus', require('./routes/menu.routes'));
app.use('/api/tipos-kardex', require('./routes/tipo_kardex.routes'));
app.use('/api/productos-kardex', require('./routes/producto_kardex.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/colores', require('./routes/color.routes'));
app.use('/api/modelos', require('./routes/modelo.routes'));
app.use('/api/tiendas', require('./routes/tienda.routes'));
app.use('/api/tipos_cuero', require('./routes/tipo_cuero.routes'));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.emit('test', 'hola mundo como estas');

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
})