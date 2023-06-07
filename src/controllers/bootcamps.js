import dbConnect from "../config/dbConfig";

/**
 * @name getBootCamps
 * @param {obj} req
 * @desc get all bootcamps
 * @returns bootcamps
 */
const getBootCamps = (req, res, next) => {
  try {
    const query = "SELECT * FROM bootcamps";
    dbConnect.query(query, (error, results) => {
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
const getBootCamp = (req, res) => {
  try {
    const query = "SELECT * FROM bootcamps WHERE id = ?";
    dbConnect.query(query, req.params.id, (error, results) => {
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
const createBootCamp = (req, res) => {
  const { name, description, website, email, address, housing, jobGuarantee } =
    req.body;

  try {
    const query = "INSERT INTO bootcamps SET ?";
    const values = {
      name,
      description,
      website,
      email,
      address,
      housing,
      jobGuarantee,
      user_id: req.userId,
    };
    dbConnect.query(query, values, (error, results) => {
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
    const userId = req.userId;
    const query = "DELETE FROM bootcamps WHERE id = ? AND user_id = ?";

    dbConnect.query(query, [req.params.id, req.userId], (error, results) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.toString(),
        });
      }

      if (results.length) {
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

const updateBootcamp = async (req, res) => {
  const fields = Object.keys(req.body);
  const fieldValues = Object.values(req.body);

  let query = "";
  fields.forEach((key, index) => {
    if (index < fields.length - 1) {
      query += `${key} = ?, `;
    } else {
      query += `${key} = ?`;
    }
  });

  const id = req.params.id;
  const userId = req.userId;

  dbConnect.query(
    `UPDATE bootcamps SET ${query} WHERE id = ? AND user_id = ?`,
    [...fieldValues, id, userId],
    (error, results) => {
      try {
        if (error) {
          return res.status(400).json({
            status: "error",
            message: error.toString(),
          });
        }

        const parsedResults = JSON.parse(JSON.stringify(results));

        if (parsedResults.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: "Bootcamp not found",
          });
        }

        if (parsedResults.affectedRows > 0) {
          return res.status(200).json({
            status: "success",
            message: "Bootcamp updated successfully",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
};

export {
  getBootCamps,
  updateBootcamp,
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
};
