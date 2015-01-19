var mongoose = require('mongoose');
var ConnectedUser = require('../models/connectedUser');

module.exports = function(app) {
  app.get('/api/connectedusers', function(req, res) {
    ConnectedUser.find(function(err, users) {
      if(err) {
        return res.json(err);
      }
      if(!users) {
        return res.json({success: false});
      } else {
        return res.json({success: true, connectedUsers: users});
      }
    });
  });
}
