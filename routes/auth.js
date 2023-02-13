/*
Path: ??
*/
const { Router } = require('express');
const { check } = require('express-validator');


const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = new Router();

// Add routes
router.post('/new', [
    check('nombre', 'the name is require').not().isEmpty(),
    check('password', 'the password is require').not().isEmpty(),
    check('email', 'the email is require').not().isEmpty(),
    check('email', 'the email is invalid').isEmail(),
    validarcampos,
], crearUsuario);

router.post('/', [
    check('password', 'the password is require').not().isEmpty(),
    check('email', 'the email is require').not().isEmpty(),
    check('email', 'the email is invalid').isEmail(),
    validarcampos,
], login);


// validarJWT
router.get('/renew',validarJWT, renewToken);

module.exports = router;

