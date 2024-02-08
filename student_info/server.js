let express = require('express');
let mongoose = require('mongoose');
let cors = require("cors")
mongoose.connect("mongodb://localhost:27017/studentData");
let Student = mongoose.model(
    'Student', {
    name: String,
    email: String,
    address: String
}
);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    let data = await Student.find({});
    res.status(200).json(data);
})

app.post('/', async (req, res) => {
    const sR = new Student(req.body);
    await sR.save();
    return res.status(201).send(sR);
})
app.listen(3000, () => {
    console.log("Port is running on 3000..");
})