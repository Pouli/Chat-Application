var mongoose = require('mongoose');

//Define the schema for our ConnectedUser model
var connectedUserSchema = mongoose.Schema({
    name: String,
    id: String
});

//Creation of the ConnectedUser model and export it
module.exports = mongoose.model('ConnectedUser', connectedUserSchema);
