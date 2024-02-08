const express = require("express");
const cors = require("cors");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentManagement")

let user = mongoose.model("students", {
    name: String,
    email: String,
    address: String
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const sData = await user.find({});
    return res.status(200).send(sData);
});

app.post("/", async (req, res) => {
    const sR = new user(req.body);
    await sR.save();
    return res.status(201).send(sR);
});

app.listen(3000, () => {
    console.log("Server is running on Port 4000");;
})