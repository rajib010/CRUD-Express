const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
try {
    mongoose.connect("mongodb://localhost:27017/formData");
    console.log("Connected to database successfully");
} catch (err){
    console.log("Database connection error", err)
}


// Define schema and model for user data
const User = mongoose.model("User", {
    name: String,
    email: String,
    gender: String,
    course: String,
    country: String,
    description: String
});

// Route to handle form submission
app.post("/post", async (req, res) => {
    try {
        const { name, email, gender, course, country, description } = req.body;
        const user = new User({ name, email, gender, course, country, description });
        await user.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error storing user data:", error);
        res.status(500).send("Internal server error");
    }
});

// get form data

app.get("/get", async (req, res) => {
    const Data = await User.find({});
    return res.status(200).send(Data);
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
