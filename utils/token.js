import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

/** 
 * @desc generate token for authorization
 * @param userId
 * @returns token
*/
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "24h" });
  return token;
};

// export const verifyToken = (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
// };
