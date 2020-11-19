const mongoose = require('mongoose');


const InformationSchema = new mongoose.Schema({
  institutions:{type:String},
  employees:{type:Number},
  serviceGiven:{type:String},
  budget:{type:Number}
})
module.exports = mongoose.model('information', InformationSchema);