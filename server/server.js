const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const EmployeeModel = require('./models/Employees');

const app = express();
const PORT = 3001;

const pswd = process.env.pswd;
const url = `mongodb+srv://Harish:IpcoahXz8yD2IibT@cluster0.p3yw9uj.mongodb.net/employee`;

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected to Mongo DB");
  } catch (error) {
    console.error("Error connecting to Mongo DB:", error);
  }
}

connect();

app.use(cors({ origin: 'http://localhost:5173' })); 

app.use(bodyParser.json());


app.post('/login', async (req,res)=>{
  console.log("Login body:", req.body);
  const {email,password} = req.body;
  EmployeeModel.findOne({email:email})
  .then( user=>{
      if(user){
        if(user.password === password){
          res.json("Success");
          console.log("Login Success");
        }
        else{
          res.json("Password is incoorect");
          console.log("Login Failed");
        }
      }
      else{
        res.json("Record not found");
        console.log("No record");
      }
    }
    )
})

app.post('/register', async (req, res) => {
  console.log("Received request body:", req.body);

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  try {
    const newEmployee = new EmployeeModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Assuming you have a password field
    });

    // Log employee data before saving
    console.log("Employee data before saving:", newEmployee);

    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);

  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).json({ error: 'Error registering employee.' });
  }
});

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});



// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const EmployeeModel = require('./models/Employees');
// const { restart } = require('nodemon');

// const app = express();
// const PORT =  3001; //process.env.PORT ||

// const Pswd=process.env.pswd

// const url = `mongodb+srv://Harish:IpcoahXz8yD2IibT@cluster0.pqirhqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/employee`

// async function connect(){
//     try{
//         await mongoose.connect(url);
//         console.log("connected to Mongo DB");
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// connect();

// app.use(cors({ // Add the cors middleware
//     origin: 'http://localhost:5173' // Whitelist port 5173
//   }));
// app.post('/register', (req, res) => {
//     EmployeeModel.create(req.body)
//       .then(employees => res.json(employees))
//       .catch(err => res.json({ error: err.message })); 
//   });
  
// // app.post('/register',(req,res)=>{
// //     EmployeeModel.create(req.body)
// //     .then(employees => res.json(employees))
// //     .catch(err => res.json(err))
// // })


// app.listen(PORT, ()=>{
//     console.log(`server started on PORT ${PORT}`);
// })