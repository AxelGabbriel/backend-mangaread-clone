const express = require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
//const room= require('../controllers/room')
//const puntaje=require('../controllers/puntaje')
//const passport=require('passport')
const { passportAuth } = require('../middlewares')






//registro y login
router.post('/registro', usuario.register)
router.post('/login', passportAuth)
router.get('/perfil', (req, res) => {
    res.send('perfil')
})


//Manejo de archivos
const multer = require('multer')
const sharp = require('sharp')

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('invalid image file', false)
    }
}
const uploads = multer({ storage, fileFilter })




router.post('/upload', uploads.single('manga'), async (req, res) => {

    try {
        const fotoBuffer = req.file.buffer
        const { width, height } = await sharp(fotoBuffer).metadata()
        finalImage = await sharp(fotoBuffer).resize(343, 801).toBuffer
        res.status(201).json({success: true, message: 'Foto Cargada'})

    } catch (error) {
        res.status(500).json({success: false, message: 'Foto no Cargada'})
        console.log('Error con la imagen', error.message)
    }





})







//rutas usuario
router.get('/buscar-usuario/:id_usuario', usuario.buscarid)
router.get('/buscar-nombre/:username', usuario.buscarnombre)


module.exports = router