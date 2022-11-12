const sharp = require('sharp')
const cloudinary = require('../helpers/imageUpload')

exports.uploadImage = async (req, res) => {

    //console.log(req.body)
    //console.log(req.file)

    const {nombre, autor, capitulo} = req.body

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${new Date().getTime()}_manga`,
            width: 343,
            height: 801,
            crop: 'fill'
        })
        console.log('url: '+result.url+', nombre: '+nombre+', autor: '+autor+', capitulo: '+capitulo)
        res.status(201).json({success: true, message: 'Foto Cargada'})

    } catch (error) {
        res.status(500).json({success: false, message: 'Foto no Cargada'})
        console.log('Error con la imagen', error.message)
    }





}