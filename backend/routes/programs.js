const {Program, validate} = require('../models/program');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const programs = await Program.find().sort('programShortName');
  res.send(programs);
});

router.get('/:programShortName', async (req, res) => {
  try{
    const program = await Program.find({programShortName: req.params.programShortName});
    if (!program) return res.status(404).send('The program with the given Short Name was not found.');
    res.send(program);
  }catch(ex){
    console.log(ex.message);
  }
  
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try{
    let program = new Program({
    programCode: req.body.programCode,
    programShortName: req.body.programShortName,
    programFullName: req.body.programFullName,
    programCategory: req.body.programCategory,
    programNameInHindi: req.body.programNameInHindi
    });
    program = await program.save();
    res.send(program);
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