const sigueme = {}
const bd = require('../database')



sigueme.crear= (req,res)=>{
    try{bd.crearseguido(req,res);}catch(e){ console.log(e);}}

 sigueme.borrarid= (req,res)=>{
        try{bd.borrarseguido(req,res);}catch(e){ console.log(e);}}

 sigueme.buscarid= (req,res)=>{
            try{bd.buscarseguido(req,res);}catch(e){ console.log(e);}}








    module.exports= sigueme