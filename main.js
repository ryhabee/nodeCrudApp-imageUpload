// imports
require('dotenv').config() ;
const express =require('express' ) ;
const dbConfig = require('./dbConfig') ;
const session=require('express-session') ; 
 
const app = express() ;
const PORT = process.env.PORT ||4000 ; 

//middelwares
app.use(express.urlencoded({extended : false}))
app.use(express.json()) ;

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized : true ,
    resave :false ,
})) ;
app.use((req, res, next)=>{
    res.locals.message=req.session.message ;
    delete req.session.message ; 
    next() ; 
  }
);
//set template engine
app.set('view engine', 'ejs') ; 

// routes prefix
app.use('/' ,require('./routes/routes')) ;

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`)
})