const express = require ('express')
const passport=require('passport')
const session=require('express-session')
const app = express()
const {Strategy} =require('passport-local')
const { LocalStrategy } = require('./strategies')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')


//middlewares

app.use(cors())

/*const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads')
  filename: 
})*/
app.use(multer({dest: path.join(__dirname, 'public/uploads')}).single('image'))

app.use(session({
    secret:'xd',
    resave: false,
    saveUninitialized: false
}))

/*app.use(express.json());
app.use(express.urlencoded({extended: true}));*/

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  
  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

app.use(passport.initialize())
app.use(passport.session());
//router
app.use(require('./routes/router'));

//process.env.PORT ||


//servidor activo
const port =process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log('servidor activo en puerto 8000')
})




