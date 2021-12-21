const { Router } = require( 'express' );
const router = Router();
const _ = require( 'underscore' );
const mysql = require( 'mysql' );

// MySQL
const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api-node'
} );

connection.connect( error => {
    if( error ){
        console.log( error );
    }else{
        console.log( 'Database server running' );
    }
} );

// Metodos y rutas
router.get( '/', ( req, res ) => {
    //res.json( connection );
    const sql = 'SELECT * FROM movies';
    connection.query( sql, ( err, result ) => {
        if( err ) throw err;
        if( result.length > 0 ){
            res.json( result );
        } else {
            res.send( 'No hay registros en base de datos' );
        }
    } );
} );

router.post( '/', ( req, res ) => {
    const { titulo, director, anio, rating } = req.body;
    //console.log( req.body );
    const sql = 'INSERT INTO movies SET ?';
    if( titulo && director && anio && rating ){
        const newobj = {
            titulo: titulo,
            director: director,
            anio: anio,
            rating, rating
        }
        connection.query( sql, newobj, error => {
            if( error ){
                res.send( error );
            }else{
                res.send( 'Agregado' );
            }
            
        } );
        
        //res.json( movies );
    }else{
        res.send( 'Bad request' );
    }
} );

router.delete( '/:id', ( req, res ) => {
    const { id } = req.params;
    const sql = `DELETE FROM movies WHERE id = '${ id }'`;
    connection.query( sql, error => {
        if( error ) throw error;
        res.send( 'Eliminado' );
    } );
} );

router.put( '/:id', ( req, res ) => {
    const { id } = req.params;
    const { titulo, director, anio, rating } = req.body;
    const sql = `UPDATE movies SET titulo = '${ titulo }', director = '${ director }', anio = '${ anio }', rating = '${ rating }' WHERE id = ${ id }`;
    connection.query( sql, error => {
        if( error ) throw error;
        res.send( 'Película actualizada' );
    } );
} );

module.exports = router