exports.register = async (req, res) => {
  // console.log('REGISTER CONTROLLER', req.body);
  const { username, email, password } = req.body

  try {
    const userEmail = await User.findOne({ email })
    const userUsername = await User.findOne({ username })
    if (userEmail)
      return res.status(400).json({
        error: "Email is taken",
      })
    if (userUsername)
      return res.status(400).json({
        error: "Username is taken",
      })

    const hashedPass = await bcrypt.hash(password, process.env.JWT_SECRET)
    console.log(password)
    const user = new User({ username, email, password: hashedPass })
    await user.save()
    const token = new Token({
      _userId: user._id,
      token: Math.floor(Math.random() * 899999 + 100000),
    })
    await token.save()
    // send email
    const params = registerEmailParams(email, token.token)
    console.log(token.token)

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

    return res.json(user)
  } catch (error) {
    return res.status(404).json({ msg: "register error" })
  }
}
