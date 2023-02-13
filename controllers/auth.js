const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'this email already register',
            })
        }
        const usuario = new Usuario(req.body);
        //Encryp password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        /// Generate JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk to admin"
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Encryp password
        const salt = bcrypt.genSaltSync();
        const passworEncryp = bcrypt.hashSync(password, salt);

        //Find user
        const user = await Usuario.findOne({ email, passworEncryp });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong credentials',
            })
        }

        /// Generate JWT
        const token = await generarJWT(user.id);
        res.json({
            ok: true,
            usuario: user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "talk to admin"
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario,
        token
    })
}
module.exports = {
    crearUsuario,
    login,
    renewToken
}