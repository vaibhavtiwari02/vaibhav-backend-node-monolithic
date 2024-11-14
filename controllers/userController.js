const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, isCandidate } = req.body;
    if (password?.length > 30) {
      return res
        .status(400)
        .json({ message: "Password must be less than 30 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isCandidate: isCandidate,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is Not Registered" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,)
  
    res.status(200).json({ message: "Login Success",token , User:{
      name: user.name,
      email: user.email,
      avatar:user.avatarUrl,
      savedJob:user.savedJobs
    } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};