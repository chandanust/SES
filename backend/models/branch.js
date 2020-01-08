const programSchema = require('./program');
const mongoose = require('mongoose');
const Joi = require('joi');

const branchSchema = new mongoose.Schema({
    program: {
      type: programSchema,
      required: true
    },
    branchCode: {type: String, required: true},
    branchShortName: String,
    branchFullName: String,
    branchNameInHindi: String
  });
  
  const Branch = mongoose.model('Branch', branchSchema);

  function validatebranch(branch) {
  const schema = {
    programId: Joi.string().required(),
    branchCode: Joi.string().min(2).required(),
    branchShortName: Joi.string().min(2).required(),
    branchFullName: Joi.string(),
    branchNameInHindi: Joi.string()
  };

  return Joi.validate(branch, schema);
}

exports.Branch = Branch;
exports.validate = validatebranch;