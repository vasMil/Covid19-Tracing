DROP PROCEDURE IF EXISTS update_username_password;
DELIMITER $
CREATE PROCEDURE update_username_password(IN user_id INT, IN new_username VARCHAR(45), IN new_password VARCHAR(70))
BEGIN
	DECLARE usernameUsed BOOL DEFAULT FALSE;
    DECLARE success_username BOOL DEFAULT FALSE;
    DECLARE success_password BOOL DEFAULT FALSE;
    
    IF new_username IS NOT NULL AND new_password IS NOT NULL THEN
		-- Update both password and username
		SELECT COUNT(*) > 0 INTO usernameUsed
		FROM user_table
		WHERE user_table.username = new_username;
        
        IF NOT usernameUsed THEN
			UPDATE user_table AS users
            SET users.username = new_username,
				users.password = new_password
            WHERE users.user_id = user_id;
            
            SET success_username = TRUE;
            SET success_password = TRUE;
		END IF;
        
    ELSEIF new_username IS NOT NULL THEN
		-- Update only the username
		SELECT COUNT(*) > 0 INTO usernameUsed
		FROM user_table
		WHERE user_table.username = new_username;
        
		IF NOT usernameUsed THEN
			UPDATE user_table AS users
            SET users.username = new_username
            WHERE users.user_id = user_id;
            
            SET success_username = TRUE;
		END IF;
        
	ELSEIF new_password IS NOT NULL THEN
		-- Update only the password
		UPDATE user_table AS users
		SET users.password = new_password
		WHERE users.user_id = user_id;
        
        SET success_password = TRUE;
    END IF;
    
	SELECT success_username, success_password, usernameUsed;
END $
DELIMITER ;

-- TEST
-- Successful update
-- CALL update_username_password(4, "newUsername", "NewUsername123@");
-- Update only the username
-- CALL update_username_password(4, "temp", NULL);
-- Update only the password
-- CALL update_username_password(4, NULL, "$2a$04$4OMqhjfu.eCGzFUcyp14AubLrXjw5fbOH8bP2mAWgYAxcm9ztFp3C"); -- Temp123@