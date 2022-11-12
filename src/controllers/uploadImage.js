const sharp = require('sharp')
const cloudinary = require('../helpers/imageUpload')
const { Pool } = require('pg');
const config = {

  connectionString: process.env.DATABASE_URL,
  max: 500,
  min: 100,
  ssl: { rejectUnauthorized: false }


};

const pool = new Pool(config);

exports.uploadImage = async (req, res) => {

    //console.log(req.body)
    //console.log(req.file)

    const { nombre, autor, capitulo, pagina} = req.body

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${new Date().getTime()}_manga`,
            crop: 'fill'
        })
        console.log('url: ' + result.url + ', nombre: ' + nombre + ', autor: ' + autor + ', capitulo: ' + capitulo)
        const resultdb = await pool.query('INSERT INTO foto(url,manga,autor,capitulo,image_id,pagina) VALUES($1,$2,$3,$4,$5,$6)', [
            result.url, nombre, autor, capitulo, result.public_id, pagina])
        console.log('registro exitoso')
        res.json('registro exitoso' + resultdb.rows)



        res.status(201).json({ success: true, message: 'Foto Cargada' })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Foto no Cargada' })
        console.log('Error con la imagen', error.message)
    }





}