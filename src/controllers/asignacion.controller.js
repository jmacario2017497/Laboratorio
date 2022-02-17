const Asignacion = require('../models/asignacion.model');

function AgregarAsignacion (req, res){
    var parametros = req.body;
    var asignacionModelo = new Asignacion();

    if( parametros.nombre, parametros.idAlumno ) {
        asignacionModelo.idCurso = parametros.idCurso;
        asignacionModelo.idAlumno = parametros.idAlumno;

        asignacionModelo.save((err, asignacionGuardado) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!asignacionGuardado) return res.status(404).send( { mensaje: "Error, no se puedo realizar la asignacion"});

            return res.status(200).send({ asignacion: asignacionGuardado });
        })
    }
}




module.exports={
    AgregarAsignacion
}