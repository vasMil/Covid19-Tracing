DROP DATABASE database_ct;
CREATE DATABASE database_ct;
USE database_ct;

CREATE TABLE user_table (
  user_id INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id));
  

CREATE TABLE admin_table (
  admin_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (admin_id),
  FOREIGN KEY (admin_id) REFERENCES user_table (user_id));

DROP TABLE IF EXISTS covid_case_table;
CREATE TABLE covid_case_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  INDEX user_id_idx (user_id) INVISIBLE);


CREATE TABLE poi_table (
  id VARCHAR(30) NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  rating FLOAT(1) NOT NULL,
  rating_n INT NOT NULL,
  PRIMARY KEY (id),
  INDEX name_address_idx (name, address) INVISIBLE,
  INDEX lat_long_idx (latitude, longitude) INVISIBLE
);
  
  
CREATE TABLE poi_type (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  type VARCHAR(100) NOT NULL,
  poi_id VARCHAR(30) NOT NULL,
  FOREIGN KEY (poi_id) REFERENCES poi_table (id),
  PRIMARY KEY (id),
  UNIQUE (type, poi_id)
); -- INDEXES?


CREATE TABLE popular_times_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  poi_id VARCHAR(30) NOT NULL,
  day INT NOT NULL,
  CONSTRAINT day_Ck CHECK (day BETWEEN 0 AND 6),
  hour INT NOT NULL,
  CONSTRAINT hour_Ck CHECK (hour BETWEEN 0 AND 23),
  number_of_people INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (poi_id) REFERENCES poi_table(id),
  INDEX day_hour_idx (poi_id,day,hour) INVISIBLE);

DROP TABLE IF EXISTS visit_table;
CREATE TABLE visit_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  poi_id VARCHAR(30) NOT NULL,
  estimation INT NOT NULL,
  timestamp DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  FOREIGN KEY (poi_id) REFERENCES poi_table(id),
  INDEX user_poi_idx (user_id, poi_id) INVISIBLE);

DROP TABLE IF EXISTS admin_changes_table;
CREATE TABLE admin_changes_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id INT UNSIGNED NOT NULL,
  type ENUM('DELETE', 'UPDATE', 'INSERT') NOT NULL,
  success BOOLEAN NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  num_of_changes INT NOT NULL,
  file_last_mod DATETIME(3) DEFAULT NULL,
  file_name_used VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES admin_table (admin_id),
  INDEX file_name_idx (file_name_used) INVISIBLE
  );
  