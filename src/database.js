const { Pool } = require('pg');
const helpers = require('./helpers')
const config = {

  connectionString: process.env.DATABASE_URL,
  max: 500,
  min: 100,
  ssl: { rejectUnauthorized: false }


};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario = async (req, res) => {

  const {
    username,
    correo,
    nombre,
    contraseña,
    verificarclave
  } = req.body;

  if (contraseña === verificarclave) {

    const passwordencriptado = await helpers.encryptPassword(contraseña)
    const result = await pool.query('INSERT INTO usuario(username,correo,nombre,contraseña) VALUES($1,$2,$3,$4)', [
      username, correo, nombre, passwordencriptado])
    console.log(result)
    res.json(result.rows)

  } else {
    res.json('contraseñas no compatibles')
  }
}
const buscarnombreusuario = async (req, res) => {
  const username = req.params.username
  const response = await pool.query('SELECT* FROM usuario WHERE  username=$1', [username])
  console.log(response);
  res.json(response.rows)
}

const buscaridusuario = async (req, res) => {
  const id_usuario = req.params.id_usuario
  const response = await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1', [id_usuario])
  console.log(response);
  res.json(response.rows)
}


const buscarmanga = async (req, res) => {
  const manga = req.params.manga
  const response = await pool.query('SELECT* FROM foto WHERE  manga=$1', [manga])
  console.log(response);
  res.json(response.rows)
}

const buscarcap = async (req, res) => {
  const manga = req.params.manga
  const capitulo = req.params.capitulo
  const response = await pool.query('SELECT * FROM foto WHERE  manga=$1 AND capitulo=$2', [manga, capitulo])
  console.log(response);
  res.json(response.rows)
}

const borrarmanga = async (req, res) => {
  const manga = req.params.manga
  const response = await pool.query('DELETE FROM foto WHERE manga=$1', [manga])
  console.log(response);
  res.json(response.rows)
}

const borrarcapitulo = async (req, res) => {
  const capitulo = req.params.capitulo
  const response = await pool.query('DELETE FROM foto WHERE capitulo=$1', [capitulo])
  console.log(response);
  res.json(response.rows)
}

const crearfoto = async (req, res) => {

  const {
    url,
    manga,
    autor,
    capitulo,
    image_id,
    pagina
  } = req.body;

  const result = await pool.query('INSERT INTO foto(url,manga,autor,capitulo,image_id,pagina) VALUES($1,$2,$3,$4,$5,$6)', [
    url, manga, autor, capitulo,image_id,pagina])
  console.log(result)
  res.json(result.rows)


}

const buscarseguido = async (req, res) => {
  const id_usuario = req.params.id_usuario
  const response = await pool.query('SELECT* FROM seguimiento WHERE  id_usuario=$1', [id_usuario])
  console.log(response);
  res.json(response.rows)
}

const borrarseguido = async (req, res) => {
  const id_usuario = req.params.id_usuario
  const response = await pool.query('DELETE FROM seguimiento WHERE id_resena=$1', [id_usuario])
  console.log(response);
  res.json(response.rows)

}

const crearseguido = async (req, res) => {

  const {
    id_usuario, seguido
  } = req.body;

  const result = await pool.query(`
  do $$ 
  begin 
  if exists 
  (select seguido from seguimiento where seguido = $2 and id_usuario = $1) 
  then 
  Raise Notice '1'; 
  else 
  Raise Notice '0';
  insert into seguimiento (id_usuario,seguido) values($1,$2);
  end if; 
  end $$
  `, [
    id_usuario, seguido])
  console.log(result)
  res.json(result.rows)


}

const todosmanga = async (req, res) => {
  const response = await pool.query('select distinct manga from foto')
  console.log(response);
  res.json(response.rows)
}

const todoscap = async (req, res) => {
  const manga = req.params.manga
  const response = await pool.query('select distinct capitulo from foto WHERE manga=$1', [manga])
  console.log(response);
  res.json(response.rows)
}




module.exports = {
  crearusuario, buscarnombreusuario, buscaridusuario,
  buscarmanga, borrarmanga, borrarcapitulo, crearfoto,
  buscarseguido, borrarseguido, crearseguido, buscarcap,
  todosmanga, todoscap



}