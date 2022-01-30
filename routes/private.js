const express = require("express");
const router = express.Router();
const { getUsers } = require('../controllers/private');
const { protect } = require('../middlewares/authProtect')
const User = require('../models/User')



router.get('/', protect, function (req, res) {

  // const admin = User.find({role: "admin"}, (err, result) => {
  //       err ? res.json(err) : res.json(result)
  //     })

  //     if(admin) {
  //       User.find({}, (err, result) => {
  //             err ? res.json(err) : res.json(result)
  //           })
  //     } else {
  //       const id = req.user.id;
  //         User.findOne({ _id: id }, function (err, user) {
  //           if (err) return res.json(400, { message: `user ${id} not found.` });
  //           res.json(user);
  //         });
  //     }

  // if(req.body.role === "admin") {
  //    User.find({}, (err, result) => {
  //     err ? res.json(err) : res.json(result)
  //   })
  // } else {
    const id = req.user.id;
    User.findOne({ _id: id }, function (err, user) {
      if (err) return res.json(400, { message: `user ${id} not found.` });
      res.json(user);
    });
  // }
 


});

module.exports = router; 