const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    
  connectionString: process.env.DATABASE_URL,
  max:500,
  min:100,
  ssl:{rejectUnauthorized:false}

  
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     username,
     correo,
     nombre,                             
     contraseña,
     verificarclave
      }= req.body;
      
      if(contraseña===verificarclave){

     const passwordencriptado = await helpers.encryptPassword(contraseña)
      const result= await pool.query('INSERT INTO usuario(username,correo,nombre,contraseña) VALUES($1,$2,$3,$4)', [
     username,correo,nombre,passwordencriptado ])
      console.log(result)
      res.json(result.rows)

      }else{
        res.json('contraseñas no compatibles')
      }
    }
    const buscarnombreusuario= async(req,res)=>{
      const username =req.params.username
      const response=await pool.query('SELECT* FROM usuario WHERE  username=$1',[username])
      console.log(response);
      res.json(response.rows)
   } 

   const buscaridusuario= async(req,res)=>{
    const id_usuario =req.params.id_usuario
    const response=await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1',[id_usuario])
    console.log(response);
    res.json(response.rows)
   } 

    module.exports={
         crearusuario,buscarnombreusuario,buscaridusuario
        
        
     }