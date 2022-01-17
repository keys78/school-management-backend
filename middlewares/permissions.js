const User = require('../models/User')

function userPermisson(id) {
    return (req, res, next) => {
      if (req.user.id !== id) {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    }
  }


  module.exports = {
   userPermisson
  }