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

foto.mostrarmangas= (req, res) => {
       try { bd.todosmanga(req, res); } catch (e) { console.log(e); }
}

foto.mostrarcaps= (req, res) => {
       try { bd.todoscap(req, res); } catch (e) { console.log(e); }
}

foto.mostrarmangasb= (req, res) => {
       try { bd.todosmangab(req, res); } catch (e) { console.log(e); }
}

foto.mostrarcapsb= (req, res) => {
       try { bd.todoscapb(req, res); } catch (e) { console.log(e); }
}

foto.mostrarpagesb= (req, res) => {
       try { bd.todospageb(req, res); } catch (e) { console.log(e); }
}





module.exports = foto