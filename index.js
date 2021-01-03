//importing dotenv file for uploading in production
require('dotenv').config();

//setup the server
const express = require('express');
const app = express();
const resumeRoute = require('./routes/resume');
var bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');

//cors setup
app.use(cors())


//database setup
mongoose.connect(
process.env.DB_LINK
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log(`DB connects`));


//parsing the body
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//routes
app.use('/api',resumeRoute);

//test route
app.get('/', (req, res) => {
    return res.status(200).json("hello");	
});

//port and setting the port in localhost
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

