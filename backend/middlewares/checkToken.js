import Jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    console.log(token);
    const ogToken = token.split(" ")[1];

    const isValid = Jwt.verify(ogToken, process.env.USER_SECRET_KEY);

    //for multiple roles to access (user and admin)
    if (!role.includes(isValid.role)) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    next();
  } catch (e) {
    res.status(403).json({ message: "You are not authorized" });
  }
};

export default checkToken;
