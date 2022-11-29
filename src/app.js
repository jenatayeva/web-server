const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { send } = require('process');



const app = express();
const port = process.env.PORT || 4000;

//Define path for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebar engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set up static dirctory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jennet'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jennet'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'help page',
    message: 'What is the problem?',
    name: 'Jennet'
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address ){
    return res.send({
      error: 'You must provide an address'
    })
  }
  
  geocode(req.query.address, (error, { latitude, longitide, location } = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(latitude, longitide, (error, data) => {
      if(error) send({
        error: error
      })
      res.send({
        forecast: data,
        location,
        address: req.query.address
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jennet',
    errorMessage: 'Help article not found'
  })
})



app.get('*', (req, res) => {
  res.render('404', {
    title:'404',
    name: 'Jennet',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('server is up on port 4000')
})