const { Router } = require( 'express' );
const router = Router();

//Rutas
router.get( '/test', ( req, res ) => {

    const data = {
        "name": "Oscar",
        "website": "none"
    }
    res.json( data );
} );

module.exports = router