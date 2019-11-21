const mongoose = require('mongoose');

const URL = 'mongodb+srv://admin:mNTQCMTYTMS@codbar-9tjaz.mongodb.net/codbar?retryWrites=true&w=majority';

mongoose.connect(URL)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;