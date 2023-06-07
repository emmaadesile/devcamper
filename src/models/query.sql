USE devcamper;

-- users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- bootcamps table
CREATE TABLE IF NOT EXISTS bootcamps (
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
;
