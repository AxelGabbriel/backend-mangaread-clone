const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
//const room= require('../controllers/room')
//const puntaje=require('../controllers/puntaje')
//const passport=require('passport')
const  {passportAuth}  = require('../middlewares')






//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})


//Manejo de archivos
const multer = require('multer')
const sharp = require('sharp')

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startWith('image')){
        cb(null, true)
    }else {
        cb('invalid image file', false)
    }
}
const uploads = multer({storage, fileFilter})




router.post('/upload',  uploads.single('manga'), async (req, res) => {
    
    const fotoBuffer = req.file.buffer
    const imageInfo = await sharp(fotoBuffer).metadata()
    console.log(imageInfo)
    res.send('ok')


})







//rutas usuario
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.get('/buscar-nombre/:username',usuario.buscarnombre)


module.exports = router