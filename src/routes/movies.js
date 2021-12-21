const { Router } = require( 'express' );
const router = Router();
const _ = require( 'underscore' );

const movies = require( '../example.json' );
//console.log( movies ); 

router.get( '/', ( req, res ) => {
    res.json( movies );
} );

router.post( '/', ( req, res ) => {
    const { titulo, director, anio, rating } = res.body;
    if( titulo && director && anio && rating ){
        const id = movies.length + 1;

        const newmovie = { id, ...req.body };
        movies.push( newmovie );
        res.json( movies );
    }else{
        res.send( 'Bad request' );
    }
    res.send( 'Recibido' );
} );

router.delete( '/:id', ( req, res ) => {
    const { id } = req.params;
    _.each( movies, ( movie, i ) => {
        if( movie.id == id ){
            movies.splice( i, 1 );
        }
    } );
    res.json( movies );
} );

router.put( '/:id', ( req, res ) => {
    const { id } = req.params;
    const { titulo, director, anio, rating } = res.body;
    if( titulo && director && anio && rating ){
        _.each( movies, ( movie, i ) =>{
            if( movie.id == id ){
                movie.titulo = titulo;
                movie.director = director;
                movie.anio = anio;
                movie.rating = rating;
            }
        } );
        res.json( movies );
    }else{
        res.json( { error: "Bad id" } );
    }
} );

module.exports = router