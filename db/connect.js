const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbUrl = "mongodb+srv://prateek:Prateek12@cluster0.ho73t.mongodb.net/novo-test?retryWrites=true&w=majority";
const connect = async () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", () => {
        console.log("could not connect");
    });
    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
};
module.exports = { connect };