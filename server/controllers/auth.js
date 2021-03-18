const User = require("../models/user")
const AWS = require("aws-sdk")
const jwt = require("jsonwebtoken")
const { registerEmailParams } = require("../helpers/email")
const Token = require("../models/emailToken")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const ses = new AWS.SES({ apiVersion: "2010-12-01" })

exports.register = (req, res) => {
  // console.log('REGISTER CONTROLLER', req.body);
  const { username, email, password } = req.body
  // check if user exists in our db
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      })
    }
    // generate token with user username email and password
    // const token = jwt.sign(
    //   { username, email, password },
    //   process.env.JWT_ACCOUNT_ACTIVATION,
    //   {
    //     expiresIn: "10m",
    //   }
    // )

    const newUser = new User({ username, email, password })
    newUser.save()
    const token = new Token({
      _userId: newUser._id,
      token: Math.floor(Math.random() * 899999 + 100000),
    })
    token.save()
    // send email
    const params = registerEmailParams(email, token.token)
    console.log(token.token)

    const sendEmailOnRegister = ses.sendEmail(params).promise()

    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted to SES", data)
        res.json(newUser)
      })
      .catch((error) => {
        console.log("ses email on register", error)
        res.json({
          message: `We could not verify your email. Please try again`,
        })
      })
  })
}

exports.registerActivate = (req, res) => {
  return
}

exports.login = (req, res) => {
  const { email, password } = req.body
  // console.table({ email, password });
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please register.",
      })
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      })
    }
    // generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    const { _id, username, email, role } = user

    return res.json({
      token,
      user: { _id, username, email, role },
    })
  })
}
