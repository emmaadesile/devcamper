import bcrypt from "bcryptjs";

import dbConnect from "../config/dbConfig";
import { generateToken } from "../utils/token";

/**
 * @name register
 * @param {obj} req
 * @desc register a new user
 * @returns new user object
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const query = "INSERT INTO users SET ?";
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    dbConnect.query(query, newUser, (error, results, fields) => {
      if (error) {
        console.log(error);
        throw Error(error);
      }

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: {
          name,
          email,
        },
      });
    });
  } catch (error) {
    console.log(error);
    throw Error(error.toString());
  }
};

/**
 * @name login
 * @param {obj} req
 * @desc login a new user
 * @returns token
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    dbConnect.query(query, email, (error, results) => {
      if (error) {
        throw Error(error.toString());
      }

      const parsedResult = JSON.parse(JSON.stringify(results));

      if (parsedResult.length > 0) {
        const hashedPassword = parsedResult[0].password;
        const isPasswordMatching = bcrypt.compareSync(password, hashedPassword);

        if (!isPasswordMatching) {
          return res.status(401).json({
            status: "error",
            message: "Invalid login credentials",
          });
        }

        const token = generateToken({ userId: parsedResult[0].id });

        return res.status(200).json({
          status: "success",
          token,
        });
      }

      // user does not exist
      return res.status(401).json({
        status: "error",
        message: "Invalid login credentials",
      });
    });
  } catch (error) {
    console.log(error);
    throw Error(error.toString());
  }
};

export { login, register };
