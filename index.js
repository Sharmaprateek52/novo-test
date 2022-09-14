const express = require("express");
const db = require("./db/connect");
const seedData = require('./services/seed');
const findByLocation = require('./services/user');
const User = require("./models/userModel");
var morgan = require('morgan')


const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

db.connect();

seedData();

app.get('/get-user-data', async (req, res) => {
    try {
        let coordinates = [];
        coordinates.push(parseFloat(req.query.lat));
        coordinates.push(parseFloat(req.query.long));
        let returnFields = {
            user_id: { $toInt: "$user_id" },
            name: 1,
            latlong: 1
        }
        let sortBy = { user_id: 1 }
        let distance = parseInt(req.query.distance * 1000);
        let data = await findByLocation(User, coordinates, returnFields, sortBy, distance);
        res.status(200).send({ status: 200, message: "Success", data: data });
    } catch (err) {
        console.log("Error in get user data api ", err);
        return Promise.reject(err);
    }
})

app.listen(3000, () => {
    console.log("working on 3000");
})