const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()

// Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')

// setup handlebars engone and views locatin
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve 
app.use(express.static(publicDirPath))


app.get('',(req, res)=> {
    res.render('index',{
        title: 'Wether App',
        name: 'Hitesh Dhameliya'
    })
})

app.get('/about',(req, res)=> {
    res.render('about',{
        title: 'About',
        name: 'Hitesh Dhameliya'
    })
})

app.get('/help',(req, res)=> {
    res.render('help',{
        title: 'Help',
        helptext: 'this is some helpful text',
        name: 'Hitesh Dhameliya'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error,{ latitude, longitude ,location } = {}) => {
        if(error) { 
            return res.send({ error })
        }

        res.send({
            latitude: latitude,
            longitude: longitude,
            location: location
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     locatin: 'surat',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=> {
    res.send('Help articals not found.')
})

app.get('*',(req, res)=> {
    res.send('MY 404 page')
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})