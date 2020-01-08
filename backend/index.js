const mongoose = require('mongoose');
const programs = require('./routes/programs');
const branchs = require('./routes/branchs');
const semesters = require('./routes/semesters');
const express = require('express');
const app = express();


mongoose.connect('mongodb+srv://chandan_ust:281741@cluster0-p0ufs.mongodb.net/SES?retryWrites=true&w=majority')
.then('Connected to mongodb....')
.catch(err => console.log('Error Occured.....', err.message));

app.use(express.json());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });  
app.use('/api/programs', programs);
app.use('/api/branchs', branchs);
app.use('/api/semesters', semesters);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


