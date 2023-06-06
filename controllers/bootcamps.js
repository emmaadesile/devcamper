import dbConnection from "../config/db";

/**
 * @name getBootCamps
 * @param {obj} req
 * @desc get all bootcamps
 * @returns bootcamps
 */
const getBootCamps = (req, res, next) => {
  try {
    const query = "SELECT * FROM bootcamps";
    dbConnection.query(query, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @name getBootCamp
 * @param {obj} req
 * @desc get a bootcamp
 * @returns bootcamp
 */
const getBootCamp = (req, res, next) => {
  try {
    const query = "SELECT * FROM bootcamps WHERE id = ?";
    dbConnection.query(query, req.params.id, (error, results) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      if (results.length > 0) {
        const parsedResult = JSON.parse(JSON.stringify(results));

        return res.status(200).json({
          status: "success",
          data: parsedResult[0],
        });
      }

      return res.status(404).json({
        status: "error",
        message: "Bootcamp not found",
      });
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * @name createBootcamp
 * @param {obj} req
 * @desc creates a new bootcamp
 * @returns new bootcamp
 */
const createBootCamp = (req, res, next) => {
  const {
    name,
    description,
    website,
    email,
    address,
    careers,
    housing,
    jobGuarantee,
  } = req.body;

  try {
    const query = "INSERT INTO bootcamps SET ?";
    const values = {
      name,
      description,
      website,
      email,
      address,
      careers,
      housing,
      jobGuarantee,
      user_id: req.userId,
    };
    dbConnection.query(query, values, (error, results) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      if (results) {
        return res.status(201).json({
          status: "success",
          message: "Bootcamp created",
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * @name deleteBootcamp
 * @param {obj} req
 * @desc delete bootcamp
 * @returns message
 */
const deleteBootCamp = (req, res, next) => {
  try {
    const bootcampId = req.params.id;
    const userId = req.userId;

    const deleteQuery = "DELETE FROM bootcamps WHERE id = ?";
    const selectQuery = "SELECT * FROM bootcamps WHERE id = ? AND user_id = ?";

    dbConnection.query(selectQuery, [bootcampId, userId], (error, results) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      const parsedResult = JSON.parse(JSON.stringify(results));

      if (parsedResult?.length > 0 && parsedResult[0].user_id !== userId) {
        return res.status(403).json({
          status: "error",
          message: "User has no rights to this resource",
        });
      }
    });

    dbConnection.query(deleteQuery, req.params.id, (error, results) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      if (results) {
        return res.status(202).json({
          status: "success",
          data: "Bootcamp deleted",
        });
      }

      return res.status(404).json({
        status: "error",
        message: "Bootcamp not found",
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
};
