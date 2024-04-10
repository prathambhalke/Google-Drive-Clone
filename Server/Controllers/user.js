const User = require("../Models/usersData");
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../Services/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const singleUser = await User.create({
      name,
      email,
      password,
    });
    return res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing up" });
  }
}

async function handleUserLogin(req, res) {  
  const { name, password } = req.body;
  const logUser = await User.findOne({ name, password });
  if (!logUser) return res.status(404).json("Invalid UserName or Password⚠️");
  const sessionId = uuidv4();
  setUser(sessionId, logUser);
  res.cookie("uid", sessionId);
  return res.status(204).json(`${name} Login SuccessFully🚀!`);
}

module.exports = { handleUserSignUp, handleUserLogin };
