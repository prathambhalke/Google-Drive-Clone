const { getUser } = require("../Services/auth");
const restrictUserLogin = async (req, res, next) => {
  const userId = req.cookies?.uid;
  // console.log("userId", userId)
  if (!userId) return res.status(404).json("user not found!");
  const user = getUser(userId);

  if (!user) return res.status(204).json("user not Found22222!");
  req.user = user;
  console.log("this is", user)
  next();
};

module.exports = {
  restrictUserLogin,
};
