const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const config = require('./config.json')

let port = process.env.PORT || 5000

mongoose.connect(config.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex  : true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {

    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
});

app.use('/articles', articleRouter)
app.listen(port, () => {console.log('Running at port: ' + port)});
