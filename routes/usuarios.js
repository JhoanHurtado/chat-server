/** 
*  path: api/usuarios
* 
*/
const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = new Router();
// validarJWT
router.get('/',validarJWT, getUsuarios);

module.exports = router;

