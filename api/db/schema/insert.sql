USE database_ct;

INSERT INTO user_table (user_id, username, email, password) VALUES
(1, 'admin', 'admin@admin.com', '$2a$04$chq0zRMXDOuQJ1./tXVpO.W4W83QuVRr8QoTuyLFOkS4Wj6TKCNsa'); # Admin123@

INSERT INTO user_table (username, email, password) VALUES
('mg', '@mail', '$2a$04$3jNJI/YsnhkLLirSXnxND.oSJ8rAnmUDwPoL3fmDGjYQ/lhdj3RHS'); # Pass123@

# You may use this: https://www.devglan.com/online-tools/bcrypt-hash-generator
# to hash passwords, when not using the api

INSERT INTO admin_table VALUES 
(1);