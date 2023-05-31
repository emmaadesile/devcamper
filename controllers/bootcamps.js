const getBootCamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Show all bootcamps",
  });
};

const getBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Get bootcamp ${req.params.id}`,
  });
};

const editBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp ${req.params.id}`,
  });
};

const createBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Create new bootcamp",
  });
};

const deleteBootCamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp ${req.params.id}`,
  });
};

export {
  getBootCamps,
  getBootCamp,
  editBootCamp,
  createBootCamp,
  deleteBootCamp,
};
