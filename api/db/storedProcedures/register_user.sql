DROP PROCEDURE IF EXISTS register_user;
DELIMITER $
CREATE PROCEDURE register_user (IN username VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(45))
BEGIN
	
    DECLARE UsernameUsed VARCHAR(45) DEFAULT NULL;
    DECLARE emailUsed VARCHAR(45) DEFAULT NULL;
    
    SELECT COUNT(*) > 0 INTO usernameUsed
    FROM user_table
    WHERE user_table.username = username;
    
    SELECT COUNT(*) > 0 INTO emailUsed
    FROM user_table
    WHERE user_table.email = email;
    
    IF usernameUsed OR emailUsed THEN
		SELECT false AS "success", usernameUsed AS "usernameUsed", emailUsed AS "emailUsed";
	ELSE 
		INSERT INTO user_table (user_table.username, user_table.email, user_table.password) VALUES (username, email, password);
        SELECT true AS "success";
    END IF;
    
END$
DELIMITER ;

CALL register_user("manos", "@mail", "pass12344");