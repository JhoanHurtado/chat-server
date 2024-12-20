/*
    path: /api/mensajes
*/

const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = new Router();
// validarJWT
router.get('/:de',validarJWT, obtenerChat);

module.exports = router;

