const express = require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const foto= require('../controllers/foto')
const sigueme=require('../controllers/seguimiento')
const { passportAuth } = require('../middlewares')


//registro y login
router.post('/registro', usuario.register)
router.post('/login', passportAuth)
router.get('/perfil', (req, res) => {
    res.send('perfil')
})


//Manejo de archivos
const multer = require('multer')
const { uploadImage } = require('../controllers/uploadImage')

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('invalid image file', false)
    }
}
const uploads = multer({ storage, fileFilter })

router.post('/upload', uploads.single('manga'), uploadImage)


//rutas usuario
router.get('/buscar-usuario/:id_usuario', usuario.buscarid)
router.get('/buscar-nombre/:username', usuario.buscarnombre)

//rutas para foto
router.post('/crear-foto',foto.crear)
router.get('/buscar-manga/:manga',foto.buscar)
router.get('/buscar-cap/:manga/:capitulo',foto.buscarcapitulo)
router.delete('/borrar-manga/:manga',foto.borrarmanga)
router.delete('/borrar-capitulo/:capitulo',foto.borrarcapitulo)
router.get('/mostrar-mangas',foto.mostrarmangas)
router.get('/mostrar-caps/:manga',foto.mostrarcaps)
//rutas para seguimiento
router.post('/crear-seguido',sigueme.crear)
router.get('/buscar-seguido/:id_usuario',sigueme.buscarid)
router.delete('/borrar-seguido/:id_usuario/:seguido',sigueme.borrarid)


module.exports = router