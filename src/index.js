const express = require( 'express' );
const app = express();
const morgan = require( 'morgan' );
const multer = require( 'multer' );
const archivo = multer( { dest: __dirname + '/uploads' } );

//Settings
app.set( 'port', process.env.PORT || 3000 );
//app.set( 'json spaces', 1 );

// Middleware
app.use( morgan( 'dev' ) );
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );
app.use( archivo.any() );
app.use((req, res, next) => {   // CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use( require( './routes/index' ) );
app.use( '/api/movies', require( './routes/movies' ) );
app.use( '/api/users', require( './routes/users' ) );

// Servidor
app.listen( app.get( 'port' ), () => {
    console.log( `Server on port ${ app.get( 'port' ) }` );
} );