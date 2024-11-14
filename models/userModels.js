const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isCandidate:{
    type:Boolean,
    default:true,
    required:true,
  },
  passwordOtp: {
    value: String,
   
  },
    
  avatarUrl: {
    type: String,
    default: '', 
  },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
});
userSchema.index({ savedJobs: 1 });
module.exports = mongoose.model('User', userSchema);