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
    // io.sockets.emit - envia a todos
    // socket.broadcast.emit - envia a todos menos al que esta enviando

    socket.on('models:modelo', (data) => {
        socket.broadcast.emit('models:modelo', data);
    })

    socket.on('models:categoria', (data) => {
        socket.broadcast.emit('models:categoria', data);
    })

    socket.on('models:color', (data) => {
        socket.broadcast.emit('models:color', data);
    })

    socket.on('models:tienda', (data) => {
        socket.broadcast.emit('models:tienda', data);
    })

    socket.on('models:tipo-cuero', (data) => {
        socket.broadcast.emit('models:tipo-cuero', data);
    })

    socket.on('models:producto-ingreso', (data) => {
        socket.broadcast.emit('models:producto-ingreso', data);
    })

    socket.on('models:producto-egreso', (data) => {
        socket.broadcast.emit('models:producto-egreso', data);
    })
})