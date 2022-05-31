const {Router} = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../model/user");
const authController = Router()
const { signToken } = require("../jwt")

authController.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(400);
    }

    const {
      email,
      password
    } = req.body

    try {
      const user = await User.findOne({
        email
      });
      if(!user){
        return res.sendStatus(404);
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.sendStatus(401).send();
      }
      
      const token = signToken(req.body.email, "24h")
      res.send({ token: token });
    } catch(error) {
      return res.status(500).send(error);
    }
  });

authController.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.sendStatus(400);
  }

  const {
    email,
    password
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.build({
      email: email,
      password: hashedPassword
  });

  try {
    await user.validate();
    await user.save();
  
    const response = JSON.parse(JSON.stringify(user));
    return res.send(response)
  } catch(error) {
    res.status(500).send(error)
  }
})

exports.authController = authController

