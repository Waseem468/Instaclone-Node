require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect("mongodb+srv://Instaclone1234:insta1234@cluster0.jxvkywb.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected to database..."))
.catch(() => console.log("Error while connecting..."))

app.listen(5000, () => {
    console.log(`server listening on port ${5000}...`)
})