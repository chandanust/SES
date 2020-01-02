const mongoose = require('mongoose');
const programs = require('./routes/programs');
const express = require('express');
const app = express();


mongoose.connect('mongodb+srv://chandan_ust:281741@cluster0-p0ufs.mongodb.net/SES?retryWrites=true&w=majority')
.then('Connected to mongodb....')
.catch(err => console.log('Error Occured.....', err.message));

app.use(express.json());
app.use('/api/programs', programs);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


