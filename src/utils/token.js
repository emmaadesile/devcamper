import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

/**
 * @desc generate token for authorization
 * @param userId
 * @returns token
 */
export const generateToken = ({userId}) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "24h" });
  return token;
};

/**
 * @desc decode token
 * @param token
 * @returns userId
 */
export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization missing",
      });
    }
  }
  const token = req.headers["authorization"].split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "User unauthorized",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err.toString(),
      });
    }

    req.userId = decoded.userId;
    next();
  });
};
