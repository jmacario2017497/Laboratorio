const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre && parametros.usuario && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.usuario = parametros.usuario;
            usuarioModel.rol = '“ROL_ALUMNO';

            Usuario.find({ usuario : parametros.usuario }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'este usuario ya se encuentra en uso' });
                }
            })
    }
}

function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre && parametros.usuario && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.usuario = parametros.usuario;
            usuarioModel.rol = '“ROL_MAESTRO';

            Usuario.find({ usuario : parametros.usuario }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'este usuario ya se encuentra en uso' });
                }
            })
    }
}

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ usuario : parametros.usuario }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}


function EditarUsuario (req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;
    if(idUser != req.user.sub) return res.status(500).send({mensaje: 'no pose los permisos para editar este usuario'});
    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new: true},(err, usuarioActualizado)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'})
        if(!usuarioActualizado) return res.status(500).send({mensaje: 'error al editar el usuario'})
        return res.status(200).send({usuario: usuarioActualizado})
    })
}


function EliminarAlumno(req, res) {
    var idUsu = req.params.idUsuario;
    if(idUsu != req.user.sub) return res.status(500).send({mensaje: 'no pose los permisos para eliminar este usuario'});
    Usuario.findByIdAndDelete(idUsu, (err, usuarioEliminado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!usuarioEliminado) return res.status(500).send({ mensaje: "erro al intentar borrar el usuario"});

        return res.status(200).send({ usuario: usuarioEliminado });
    })
}


module.exports = {
    RegistrarAlumno,
    Login,
    RegistrarMaestro,
    EditarUsuario,
    EliminarAlumno
}