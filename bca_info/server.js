let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");

let app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bcaStudentsRecords");

let Student = mongoose.model("students", {
    name: String,
    semester: Number,
    college: String,
    contact: String
});

app.get('/', async (req, res) => {
    let data = await Student.find({});
    res.status(200).json(data);
});

app.post("/", async (req, res) => {
    const stdRec = new Student(req.body);
    await stdRec.save();
    res.status(201).send(stdRec);

});


app.listen(4000, () => {
    console.log("Port is running on 4000");
})