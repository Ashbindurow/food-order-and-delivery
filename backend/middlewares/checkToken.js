import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    console.log("Token: ", token);
    const ogToken = token.split(" ")[1];

    // const isValid = Jwt.verify(ogToken, process.env.USER_SECRET_KEY); oldcode

    jwt.verify(ogToken, process.env.USER_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "You are not authorized" });
      }
      //for multiple roles to access (user and admin)
      if (!role.includes(decoded.role)) {
        return res.status(403).json({ message: "You are not authorized" });
      }
    });

    next();
  } catch (e) {
    res.status(403).json({ message: "You are not authorized" });
  }
};

export default checkToken;
