const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.json());

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
//

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(()=>{
    console.log("MongoDB connected")
}, err => {
    console.log('error:'+err)
    console.log("user is "+ process.env.DB_USER)
    console.log("pwd is "+ process.env.DB_PASSWORD)
    console.log("host is "+ process.env.DB_HOST)
    process.exit()
})