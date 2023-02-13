const Mensaje = require('../models/mansaje')

const obtenerChat = async (req, res) => {
    const miId = req.uid;
    const mensajesDe = req.params.de;
    const msg = await Mensaje.find({ $or: [{de: miId, para: mensajesDe}, {de: mensajesDe, para: miId}]}).sort({createdAt: 'desc'});

    res.json({
        ok: true,
        msg: 'obtener mensajes',
        mensajes: msg
    })
}

module.exports = {
    obtenerChat
}