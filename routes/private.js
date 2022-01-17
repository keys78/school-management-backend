const express = require("express");
const router = express.Router();
const { getUsers } = require('../controllers/private');
const { protect } = require('../middlewares/authProtect')
const { userPermission } = require('../middlewares/permissions')
const User = require('../models/User')

// router.route("/").get(protect, getUsers) => {
//     User.find({}, (err, result) => {
//         err ? res.json(err) : res.json(result)
//     })
// };

// router.get('/', protect, (req, res, next) => {
//     // User.find({}, (err, result) => {
//     //     err ? res.json(err) : res.json(result)
//     // })
//     // console.log(res.json)
//     const id = req.params.id;

//     try {
//         User.findById(id)
//       .then(result => {
//         res.json(result);
        
//       })

//     } catch (error) {
//         next(error)
//     }
// });

router.get('/', protect, function (req, res) {
    // req.user should be defined here because of the ensureAuth middleware
    const id = req.user.id;
  
    User.findOne({_id: id}, function (err, user) {
      if (err) return res.json(400, {message: `user ${id} not found.`});
      res.json(user);
    });
  });

module.exports = router; 