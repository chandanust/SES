const mongoose = require('mongoose');
const Joi = require('joi');

const programSchema = new mongoose.Schema({
    programCode: {type: String, required: true},
    programShortName: String,
    programFullName: String,
    branch:[{
        branchCode: String, 
        branchShortName: String,
        branchFullName: String
      }],
      semester: [{
          semesterCode: Number,
          semesterShortName: String,
          semesterFullName: String
      }]
  });
  
  const Program = mongoose.model('Program', programSchema);

  function validateProgram(program) {
  const schema = {
    programCode: Joi.string().min(3).required(),
    programShortName: Joi.string().min(3).required(),
    programFullName: Joi.string(),
    branch: Joi.array(),
    semester: Joi.array()
  };

  return Joi.validate(program, schema);
}

exports.Program = Program;
exports.validate = validateProgram;