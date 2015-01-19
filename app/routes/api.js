var mongoose = require('mongoose');
var ConnectedUser = require('../models/connectedUser');

module.exports = function(app) {
  app.get('/api/connectedusers', function(req, res) {
    ConnectedUser.find(function(err, users) {
      if(err)
        return res.json(err);
      if(!users)
        return res.json({success: false});
      else
        return res.json({success: true, connectedUsers: users});
    });
  });

  app.post('/api/connecteduser', function(req, res) {
    ConnectedUser.findOne({'name': req.body.name}, function(err, user) {
      if(err)
        return res.json(err);
      if(user)
        return res.json({success: false});
      else
        var newConnectedUser = new ConnectedUser();
        newConnectedUser.name = req.body.name;
        newConnectedUser.id = req.body.id;

        newConnectedUser.save(function(err) {
          if(err)
            return res.json(err);
          return res.json({success: true});
        });
    });
  });
}
