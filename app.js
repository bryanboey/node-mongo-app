require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

// connect to mongodb
const dbURI = process.env.NODE_ENV_MONGO_DB
mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs')
// automatically, express and ejs will use views folder by default
// however, if u want to create different folder you can use the below code:
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})

// blog routes
app.use('/blogs', blogRoutes);

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
})