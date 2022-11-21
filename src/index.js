const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Inits
const app = express()
require('./db')

// Settings
app.set('port', process.env.PORT || 3000)
app.engine(
    '.hbs',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    })
)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: 'mysecretapp',
        resave: true,
        saveUninitialized: true
    })
)
app.use(flash())

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// App listening
app.listen(app.get('port'), () => {
    console.log('App listening on port 3000')
    console.log('Enter to http://localhost:3000')
})
