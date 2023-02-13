const { response } = require("express");
const Usuario = require('../models/usuario')

const getUsuarios = async (req, res = response) => {
    const uid = req.uid;

    try {
        //Find user
        const usuarios = await Usuario.find({_id: {$ne: uid}}).sort('-online').all();
        if (!usuarios) {
            return res.status(400).json({
                ok: false,
                msg: 'Without data!.',
            })
        }

        res.json({
            ok: true,
            usuarios,
            msg: 'getUsuario'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk to admin"
        });
    }
}


module.exports = {
    getUsuarios,
}