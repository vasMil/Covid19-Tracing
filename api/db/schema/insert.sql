USE database_ct;

INSERT INTO user_table (user_id, username, email, password) VALUES
(1, 'admin', 'admin@admin.com', '$2a$04$chq0zRMXDOuQJ1./tXVpO.W4W83QuVRr8QoTuyLFOkS4Wj6TKCNsa'); # Admin123@

INSERT INTO user_table (username, email, password) VALUES
('mg', '@mail', '$2a$04$3jNJI/YsnhkLLirSXnxND.oSJ8rAnmUDwPoL3fmDGjYQ/lhdj3RHS'), # Pass123@
('test', 'test@test.com', '$2a$04$YoxIt8eQm2.CPFDCBK15JOBJp4s22eKFdaNKn6OhlM49lkHbU3q4G'), # Test123@
('temp', 'temp@temp.com', '$2a$04$4OMqhjfu.eCGzFUcyp14AubLrXjw5fbOH8bP2mAWgYAxcm9ztFp3C'); # Temp123@

# You may use this: https://www.devglan.com/online-tools/bcrypt-hash-generator
# to hash passwords, when not using the api

INSERT INTO admin_table VALUES 
(1);

INSERT INTO visit_table (user_id, poi_id, estimation, timestamp) VALUES
(2,'ChIJ_cM58sE3XhMRCHVgkJkjUeQ',10,'2022-01-18 10:00:00'),
(3,'ChIJ_cM58sE3XhMRCHVgkJkjUeQ',11,'2022-01-18 08:00:00'),
(4,'ChIJ_cM58sE3XhMRCHVgkJkjUeQ',10,'2022-01-18 09:00:00'),
(4,'ChIJ0a4YHeBJXhMRgESyORq9JSo',2,'2022-01-18 10:00:00'),
(3,'ChIJ0a4YHeBJXhMRgESyORq9JSo',2,'2022-01-18 10:00:00');

INSERT INTO covid_case_table (user_id, date) VALUES
(3, "2022-01-17"),
(4, "2022-01-20");