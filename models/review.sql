CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  content VARCHAR(255),
  rating VARCHAR(255),
  bootcamp VARCHAR(255),
  user_id INT,
  INDEX par_ind (user_id),
  FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);