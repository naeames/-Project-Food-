const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
   email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  },
  dataofcreation: {
    type: Date,
    default: Date.now()
  },
  tasks:{
    type:Array,
    default:[]
  },
  role:{
    type:String,
    
  },
   activate:{
    type:Boolean,
    required:false,
    default:true
    
  },
  role:{
    type:String,
    required:false
    
  }
  
});

module.exports = User = mongoose.model("user", UserSchema);
