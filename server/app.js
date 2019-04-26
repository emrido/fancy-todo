require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASS}@porto-bwlio.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
    console.log('App listening on port: ' + port);
});