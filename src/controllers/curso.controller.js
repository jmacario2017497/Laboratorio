const Curso = require('../models/curso.model')

function AgregarCurso(req, res) {
    var parametros = req.body;
    var cursoModelo = new Curso();

    if (parametros.nombre) {
        cursoModelo.nombre = parametros.nombre;
        cursoModelo.idMaestro = req.user.sub;

        cursoModelo.save((err, cursoGuardado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!cursoGuardado) return res.status(404).send({ mensaje: "Error, no se agrego el curso" });

            return res.status(200).send({ curso: cursoGuardado });
        })
    } else {
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." })
    }
}

function EditarCurso(req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;

    Curso.findOneAndUpdate({ _id: idCur, idMaestro: req.user.sub}, { nombre: parametros.nombre }, { new: true }, (err, cursoEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!cursoEditado) return res.status(500).send({ mensaje: "No tiene acceso para editar este curso" });
        return res.status(200).send({ curso: cursoEditado });
    });
}

function VerCursos(req, res) {
    Curso.find({ idMaestro: req.user.sub }, (err, viendoCursos) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!viendoCursos) return res.status(500).send({ mensaje: "Error al obtener los cursos" });

        return res.status(200).send({ curso: viendoCursos });
    })
}




module.exports = {
    AgregarCurso,
    EditarCurso,
    VerCursos
}

