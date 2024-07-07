const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    id: Number,
    name:String,
    email:String,
    password:String,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],

})

const EmployeeModel = mongoose.model("employees",EmployeeSchema)
module.exports = EmployeeModel