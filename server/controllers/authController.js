const express = require('express');
const EmployeeModel = require('../models/Employees');

const router = express.Router();

router.post('/login', async (req,res)=>{
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
          res.json("Password is incorrect");
          console.log("Login Failed");
        }
      }
      else{
        res.json("Record not found");
        console.log("No record");
      }
    }
    )
});


router.post('/register', async (req, res) => {
  console.log("Received request body:", req.body);

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  try {
    const newEmployee = new EmployeeModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, 
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

module.exports = router;
