// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 5000
const { PORT = 5000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose")
// import cors and morgan
const cors = require('cors');
const morgan = require('morgan');
//////////////////////////////
// DATABASE CONNECTION
//////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("You're connected to mongoose"))
  .on("close", () => console.log("You're disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// Models
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String,
})

const Cheese = mongoose.model('Cheese', CheeseSchema)
// Routes

// Test route
app.get('/', (req, res) => {
    res.send('Hello World')
});

//  Index Route
app.get('/cheese', async (req, res) => {
    try {
        res.json( await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete Route
app.delete('/cheese/:id', async (req,res) => {
    try {
        res.json( await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})
// Update Route
app.put('/cheese/:id', async (req, res) => {
    try {
        res.json( await Cheese.findByIdAndUpdate(req.params.id, req.body, { new:true }));
    } catch(error) {
        res.status(400).json(error);
    }
})
// Create Route
app.post('/cheese', async(req, res) => {
    try {
        res.json( await Cheese.create(req.body))
    } catch(error) {
        res.status(400).json(error);
    }
})

// Listener 

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
