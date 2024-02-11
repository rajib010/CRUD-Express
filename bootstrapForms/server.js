const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/formData").then(() => {
    console.log("Connected to dB");
}).catch((e) => {
    console.log("Error in dB connection", e);
});


const People = mongoose.model("peoples", {
    username: String,
    email: String,
    gender: String,
    language: Array,
    country: String
});

// server to get the data

app.get("/get", async (req, res) => {
    try {
        let data = await People.find({});
        return res.status(200).json(data);
    } catch (error) {
        console.log("Error fetching from dB", e);
    }
});

// server to post the data

app.post("/post", async (req, res) => {
    try {
        const { username, email, gender, language, country } = req.body;
        const person = new People({ username, email, gender, language, country });
        await person.save();
        return res.status(200).json({ message: "users registered successfully" })
    } catch (e) {
        console.log("Error posting to dB", e);
    }
});

// server to delete the data

app.delete("/:id", async (req, res) => {
    let id = req.params.id;
    await People.deleteOne({ _id: id });
    return res.json({ message: 'User deleted' });
});


app.listen(3000, () => {
    console.log("App is listening on Port 3000");
})