const User = require("../models/user")
const AWS = require("aws-sdk")
const jwt = require("jsonwebtoken")
const { registerEmailParams } = require("../helpers/email")
const Token = require("../models/emailToken")
const bcrypt = require("bcrypt")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const ses = new AWS.SES({ apiVersion: "2010-12-01" })

exports.register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const u_username = await User.findOne({ username })
    if (u_username) {
      return res.status(400).json({ err: "username already exists" })
    }
    const u_email = await User.findOne({ email })
    if (u_email) {
      return res.status(400).json({ err: "email already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPass })
    await user.save()

    const token = new Token({
      _userId: user._id,
      token: Math.floor(Math.random() * 899999 + 100000),
    })
    await token.save()

    const params = registerEmailParams(email, token.token)

    const sendEmailOnRegister = ses.sendEmail(params).promise()

    sendEmailOnRegister
      .then((data) => {
        console.log("email submitted to SES", data)
        res.json(user)
      })
      .catch((error) => {
        console.log("ses email on register", error)
        res.json({
          message: `We could not verify your email. Please try again`,
        })
      })

    return res.json({ user, token })
  } catch (err) {
    res.status(400).json({ err: "error accured while registering" })
  }
}

exports.registerActivate = (req, res) => {
  return
}

exports.login = async (req, res) => {
  const { email, username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: "User not found " })

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return res.status(401).json({ password: "wrong password" })
    }

    const token = await jwt.sign({ username }, process.env.JWT_SECRET)
    return res.json({ user, token })
  } catch (err) {
    return res.json({ error: "Ssomething went wrong login" })
  }
  return res.json({
    token,
    user,
  })
}
