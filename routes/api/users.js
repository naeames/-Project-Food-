const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const checkauth = require("../../Middleware/protected-auth");
const { check, validationResult } = require("express-validator");

// Validation of Input post user
ValidationInputsRules = (req, res, next) => [
  check("email", "this field is required !").notEmpty(),
  check("email", "this field should be a valid email").isEmail(),
];

ValidatorErrorsHandle = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty()
    ? next()
    : res.sendStatus(400).json({ errors: errors.array() });
};

// User Model
const User = require("../../models/user");

// @route  GET api/users
// @desc   Get All Users
// @access Public

router.get("/" ,(req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.error(err));
});
//put enable and disable activate : 
router.put("/disable/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        activate: false
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
    
  
});
router.put("/enable/:_id",(req, res, next) => {
  const { _id } = req.params;


  // console.log(response)

  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        activate: true
      },
    }
  ).then(user=>res.json(user))
  .catch(err=> console.log(err))
    
  
});
// @route  GET api/users
// @desc   Get one User
// @access Public

router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((data) => res.json(data.tasks))
    .catch((err) => res.send(err));
});

// @route  POST api/users
// @desc   Create A User with beta Crypt
// @access Public

router.post("/", ValidationInputsRules(), ValidatorErrorsHandle, (req, res) => {
  const { email, password ,activate,role} = req.body;

  // Test if user exist Already
  User.findOne({ email }).then((user) => {
    if (user) return res.sendStatus(409);
    else {
      const newUser = new User({
        email,
        password,
        activate,
        role
      });
      // newUser
      //       .save()
      //       .then((newuser) => res.json(newuser))
      //       .catch((err) => res.send(err));

      // Code the password using bcrypt module
      password.length > 3 &&
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then((newuser) => res.json(newuser))
              .catch((err) => res.send(err));
          });
        });
    }
  });
});

// @route  LOGIN api/login
// @desc   Login into an Account
// @access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) res.sendStatus(409);
    else {
      bcrypt
        .compare(password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            const payload = { id: user._id, email: user.email,activate:user.activate,role:user.role };
            jwt.sign(payload, "ok", { expiresIn: 3600 }, (err, token) => {
              if (err) res.sendStatus(500);
              else res.json({ token: "Bearer " + token });
            });
          } else res.send(400);
        })
        .catch((err) => res.send("server error"));
    }
  });
});

// Post a newtask
router.put("/newtask/:id", (req, res) => {
  const _id = req.params.id;
  const { text } = req.body;
  User.findOneAndUpdate(
    { _id },
    { $push: { tasks: { index: Date.now(), text, isCompleted: false } } }
  )
    .then((user) => res.send(user))
    .catch((err) => console.error(err));
});

// Post a task
router.put("/deletetask/:id/:index", (req, res) => {
  console.log("params:",req.query)
  const _id = req.params.id;
  const index = req.params.index;
  console.log("id:", _id);
  console.log("index:", index);
  User.findOneAndUpdate(
    { _id },
    { $pull: { tasks:{index:Number(req.params.index)} } }
  )
    .then((user) => res.send(user))
    .catch((err) => console.error(err));
});

// @route  CURRENT api/current
// @desc   Validate token
// @access Public

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
