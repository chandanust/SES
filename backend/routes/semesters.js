const { Program } = require('../models/program');
const {Semester, validate} = require('../models/semester');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const semesters = await Semester.find().sort('semesterCode');
  res.send(semesters);
});

router.get('/:semesterCode', async (req, res) => {
  try{
    const semester = await Semester.find({semesterCode: req.params.semesterCode});
    if (!semester) return res.status(404).send('The Semester with the given Code was not found.');
    res.send(semester);
  }catch(ex){
    console.log(ex.message);
  }
  
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 
  try{
    let semester = new Semester({
    semesterCode: req.body.semesterCode,
    semesterShortName: req.body.semesterShortName,
    semesterFullName: req.body.semesterFullName,
    semesterNameInHindi: req.body.semesterNameInHindi
    });
    semester = await semester.save();
    res.send(semester);
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