const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb://localhost:27017/formData");
    console.log("Connected database");

} catch (e) {
    console.log("Error in database connection.", e);
}

const app = express();

app.use(express.json());
app.use(cors());

const User = mongoose.model("moreusers", {
    name: String,
    email: String
});

app.get("/get", async (req, res) => {
    let data = await User.find({});
    return res.status(200).json(data);
});

app.post("/post", async (req, res) => {
    const { name, email } = req.body;
    let userInfo = new User({ name, email });
    await userInfo.save();
    return res.status(201).send(userInfo);
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});

