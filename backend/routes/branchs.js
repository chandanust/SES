const { Program } = require('../models/program');
const {Branch, validate} = require('../models/branch');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const branchs = await Branch.find().sort('branchCode');
  res.send(branchs);
});

router.get('/:branchShortName', async (req, res) => {
  try{
    const branch = await Branch.find({branchShortName: req.params.branchShortName});
    if (!branch) return res.status(404).send('The branch with the given Short Name was not found.');
    res.send(branch);
  }catch(ex){
    console.log(ex.message);
  }
  
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const program = await Program.findById(req.body.programId);
  if (!program) return res.status(400).send(error.details[0].message);
  
  try{
    let branch = new Branch({
    program: {
      _id: program._id,
      programShortName: program.programShortName
    },
    branchCode: req.body.branchCode,
    branchShortName: req.body.branchShortName,
    branchFullName: req.body.branchFullName,
    branchNameInHindi: req.body.branchNameInHindi
    });
    branch = await branch.save();
    res.send(branch);
  }catch(ex){
    console.log(ex.message);
  }
});

// router.put('/:id', async (req, res) => {
//   const { error } = validateGenre(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
  
//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
//     new: true
//   });
  
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
//   res.send(genre);
// });

// router.delete('/:id', async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

// router.get('/:id', async (req, res) => {
//   const genre = await Genre.findById(req.params.id)
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

module.exports = router;