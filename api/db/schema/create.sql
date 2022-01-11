DROP DATABASE database_ct;
CREATE DATABASE database_ct;
USE database_ct;

CREATE TABLE user_table (
  user_id INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (user_id));
  

CREATE TABLE admin_table (
  admin_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (admin_id),
  FOREIGN KEY (admin_id) REFERENCES user_table (user_id));


CREATE TABLE popular_times_table (
  id INT UNSIGNED NOT NULL,
  day ENUM('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY') NOT NULL,
  hour ENUM('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23') NOT NULL,
  number_of_people INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX day_hour_idx (day,hour) INVISIBLE);


CREATE TABLE covid_case_table (
  id INT UNSIGNED NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  INDEX user_id_idx (user_id) INVISIBLE);


CREATE TABLE poi_table (
  id INT UNSIGNED NOT NULL,
  name VARCHAR(45) NOT NULL,
  address VARCHAR(45) NOT NULL,
  type VARCHAR(45) NOT NULL,
  latitude VARCHAR(45) NOT NULL,
  longitude VARCHAR(45) NOT NULL,
  rating VARCHAR(45) NOT NULL,
  rating_n VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  INDEX name_address_idx (name, address) INVISIBLE,
  INDEX lat_long_idx (latitude, longitude) INVISIBLE);


CREATE TABLE visit_table (
  id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  poi_id INT UNSIGNED NOT NULL,
  estimation INT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  FOREIGN KEY (poi_id) REFERENCES poi_table(id),
  INDEX user_poi_idx (user_id, poi_id) INVISIBLE);
  
  
CREATE TABLE popular_times_poi_table (
  poptim_id INT UNSIGNED NOT NULL,
  poi_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (poptim_id) REFERENCES popular_times_table (id),
  FOREIGN KEY (poi_id) REFERENCES poi_table (id));
   
   
CREATE TABLE admin_changes_table (
  id INT UNSIGNED NOT NULL,
  admin_id INT UNSIGNED NOT NULL,
  type ENUM('-1', '0', '1') NOT NULL,
  success BOOLEAN NULL,
  timestamp TIMESTAMP NOT NULL,
  num_of_changes INT NOT NULL,
  file_last_mod DATETIME(3) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES admin_table (admin_id));
  