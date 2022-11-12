const foto = {}
const bd = require('../database')



foto.crear = (req, res) => {
       try { bd.crearfoto(req, res); } catch (e) { console.log(e); }
}

foto.borrarmanga = (req, res) => {
       try { bd.borrarmanga(req, res); } catch (e) { console.log(e); }
}

foto.buscar = (req, res) => {
       try { bd.buscarmanga(req, res); } catch (e) { console.log(e); }
}

foto.buscarcapitulo = (req, res) => {
       try { bd.buscarcap(req, res); } catch (e) { console.log(e); }
}

foto.borrarcapitulo = (req, res) => {
       try { bd.borrarcapitulo(req, res); } catch (e) { console.log(e); }
}






module.exports = foto