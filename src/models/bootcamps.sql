CREATE TABLE bootcamps (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  website VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  careers JSON,
  housing INT,
  jobGuarantee INT,
  user_id INT,
  INDEX par_ind (user_id),
  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
