const sharp = require('sharp')
const cloudinary = require('../helpers/imageUpload')

exports.uploadImage = async (req, res) => {

    console.log(req.file)

    const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${new Date().getTime()}_manga`,
        width: 343,
        height: 801,
        crop: 'fill'
    })

    console.log(result)

    /*try {
        const fotoBuffer = req.file.buffer
        const { width, height } = await sharp(fotoBuffer).metadata()
        finalImage = await sharp(fotoBuffer).resize(343, 801).toBuffer
        res.status(201).json({success: true, message: 'Foto Cargada'})

        console.log(finalImage)

    } catch (error) {
        res.status(500).json({success: false, message: 'Foto no Cargada'})
        console.log('Error con la imagen', error.message)
    }*/





}