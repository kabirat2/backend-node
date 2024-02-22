const userModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../Config/mailer");

const SignUp = async (req, res, next) => {
  const { FullName, Email, Password } = req.body;

  if (!FullName || !Email || !Password) {
    res.status(400);
    return next(new Error("All Fields are mandatory"));
  }

  try {
    const validateUser = await userModel.findOne({ Email });

    if (validateUser) {
      res.status(400).send({ message: "User Already Exists" });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    const createUser = await userModel.create({
      FullName,
      Email,
      Password: hashPassword,
    });

    if (createUser) {
      sendMail(FullName,Email)
      res.status(200).send({
        message: `Account Created Successfully for ${createUser.FullName} We are so pleased to have you onboard`,
        status: "success",
      });
    } else {
      res.status(400);
      return next(new Error("Unable to create user's account"));
    }
  } catch (error) {
    res.status(500);
    return next(new Error("Internal Server Error"));
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    res.status(400).send({ message: "All Fields Are Mandatory" });
  }

  try {
    const validateUser = await userModel.findOne({ Email });

    if (!validateUser) {
      res.status(400).send({
        message: "Account Does Not Exist, Try Creating one!",
        status: false,
      }); 
    } else {
      const comparePassword = await bcrypt.compare(
        Password,
        validateUser.Password
      );
      const secretKey = process.env.SECRET_KEY;
      const generateToken = await jwt.sign(
        {
          user: {
            FullName: validateUser.FullName,
            Email: validateUser.Email,
          },
        },
        secretKey,
        { expiresIn: "1d" }
      );

      if (comparePassword) {
        res.status(200).send({
          message: `Welcome  ${validateUser.FullName}`,
          generateToken,
          status: "success",
        });
      }
    }
  } catch (error) {}
};

const EditAcc = async (req, res) => {
  const user = req.user;
  console.log("userEmail : ", user.Email)
  
  console.log("User Trying To Edit Acc : ", user);
    const { FullName, Email, Password } = req.body;
    if (!FullName || !Email || !Password) {
      res.status(400).send({ message: "All Fields are mandatory" });
    } 
    try {
      const hashPassword = await bcrypt.hash(Password, 10);
      const updateUser = await userModel.findOneAndUpdate({Email:user.Email}, {
        FullName,
        Email,
        Password: hashPassword
      }, {
        new: true
      })
      
      if (updateUser) {
        updateUser.save()
        res.status(200).send({message:"profile updated successful",user:updateUser})
       
      } else {
        return res.status(404).send('user not found')
      
      }
    } catch (error) {

      res.status(500).send({ message: "server error from firebase" });
    }
};

module.exports = { SignUp, Login, EditAcc };
