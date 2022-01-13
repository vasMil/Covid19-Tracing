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


CREATE TABLE covid_case_table (
  id INT UNSIGNED NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  INDEX user_id_idx (user_id) INVISIBLE);


CREATE TABLE poi_table (
  id VARCHAR(30) NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  latitude FLOAT(7) NOT NULL,
  longitude FLOAT(7) NOT NULL,
  rating FLOAT(1) NOT NULL,
  rating_n INT NOT NULL,
  PRIMARY KEY (id),
  INDEX name_address_idx (name, address) INVISIBLE,
  INDEX lat_long_idx (latitude, longitude) INVISIBLE);


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


CREATE TABLE visit_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  poi_id VARCHAR(30) NOT NULL,
  estimation INT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  FOREIGN KEY (poi_id) REFERENCES poi_table(id),
  INDEX user_poi_idx (user_id, poi_id) INVISIBLE);
   
   
CREATE TABLE admin_changes_table (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id INT UNSIGNED NOT NULL,
  type ENUM('-1', '0', '1') NOT NULL,
  success BOOLEAN NULL,
  timestamp TIMESTAMP NOT NULL,
  num_of_changes INT NOT NULL,
  file_last_mod DATETIME(3) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES admin_table (admin_id));
  