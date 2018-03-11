var mongoose = require('mongoose');
var schema = mongoose.Schema;

var searchSchema = new schema({
            searchVal:String,
            searchDate:Date
      },
      //{timestamps:true}
);

module.exports = mongoose.model('searchTerm',searchSchema);
