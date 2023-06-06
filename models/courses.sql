CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description VARCHAR(255),
  weeks INT,
  tuition INT,
  scholarships_available INT,
  bootcamp_id INT,
  skill_level ENUM('beginner','intermediate','expert'),
  INDEX par_ind (bootcamp_id),
  FOREIGN KEY (bootcamp_id)
    REFERENCES bootcamp(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);