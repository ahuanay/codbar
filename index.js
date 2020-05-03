const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./config/database')

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

app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});