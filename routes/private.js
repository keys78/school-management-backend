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

// function authRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       res.status(401)
//       return res.send('Not allowed')
//     }

//     next()
//   }
// }




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