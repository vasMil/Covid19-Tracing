DROP PROCEDURE IF EXISTS register_user;
DELIMITER $
CREATE PROCEDURE register_user (IN username VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(70))
BEGIN
	
    DECLARE usernameUsed VARCHAR(45) DEFAULT FALSE;
    DECLARE emailUsed VARCHAR(45) DEFAULT FALSE;
    DECLARE success BOOL DEFAULT FALSE;
    
    SELECT COUNT(*) > 0 INTO usernameUsed
    FROM user_table
    WHERE user_table.username = username;
    
    SELECT COUNT(*) > 0 INTO emailUsed
    FROM user_table
    WHERE user_table.email = email;
    
    SET success = NOT (usernameUsed OR emailUsed);
    IF success THEN
		INSERT INTO user_table (user_table.username, user_table.email, user_table.password) VALUES (username, email, password);
    END IF;
    
    SELECT
    CASE WHEN success = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "success",
	CASE WHEN usernameUsed = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "usernameUsed",
	CASE WHEN emailUsed = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "emailUsed";
    
END$
DELIMITER ;

-- Test
-- CALL register_user("manos", "@mail", "pass12344");
-- CALL register_user("admin", "admin@admin.com", "Pass123@");
-- CALL register_user("testUser", "test@user.com", "Test123@");