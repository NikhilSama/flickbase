const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const users = require('./routes/api/users')

//parse the body of the request at JSON
app.use(bodyParser.json());

//create a route /api/users goes to the routes defined in users -> routes/api/users
app.use("/api/users", users);

//Get server to listen on port 
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
//

//COnnect to MongoDB
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