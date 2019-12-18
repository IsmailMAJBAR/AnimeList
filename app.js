
const express           = require('express');
const expressLayouts    = require('express-ejs-layouts');
const mongoose          = require('mongoose');
const passport          = require('passport');
const flash             = require('connect-flash');
const session           = require('express-session');

const app = express();

//Passport
require('./config/passport')(passport);

//Mongoose
mongoose.connect('mongodb://localhost/appAnimeList', {useNewUrlParser: true})
    .then(()=> console.log('we\'re connected!') )
    .catch(()=> console.error.bind(console, 'connection error:'));



// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//BodyParser
app.use(express.urlencoded({extended : false}));


//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));


//Passport
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());


//Glaobal Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

