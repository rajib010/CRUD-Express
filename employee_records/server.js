let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/employeeRecords");

let Employee = mongoose.model('Employee', {
    name: String,
    age: Number,
    address: String
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    let data = await Employee.find({});
    res.status(200).json(data);
});

//instance of adding a student info

// app.get('/insert', async (req, res) => {
//     let data = {
//         name: "Rahul",
//         age: 22,
//         address: "Rukmi"
//     }

//     let emp = new Employee(data);
//     await emp.save();
//     res.status(200).json({ message: "Employee added" });
// });


app.post('/', async (req, res) => {
    const eR = new Employee(req.body);
    await eR.save();
    return res.status(201).send(eR);
});

app.listen(4000, () => {
    console.log("Port is running on 4000.")
});