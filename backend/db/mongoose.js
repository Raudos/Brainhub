var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/BrainHub${process.env.NODE_ENV || ""}`);

module.exports = { mongoose };
