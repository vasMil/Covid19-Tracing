DROP PROCEDURE IF EXISTS verify_user;
DELIMITER $
CREATE PROCEDURE verify_user (IN username VARCHAR(45), IN password VARCHAR(70))
BEGIN
	DECLARE userId INT DEFAULT NULL;
    DECLARE isAdmin BOOL DEFAULT FALSE;
    
	SELECT user_table.user_id INTO userId
    FROM user_table
    WHERE user_table.username = username AND user_table.password = password;
	
    SELECT COUNT(*) > 0 INTO isAdmin
    FROM admin_table
    WHERE admin_table.admin_id = userId;
    
    IF userId IS NOT NULL THEN
		SELECT userId AS "id", isAdmin AS "isAdmin", username AS "username";
    END IF;
END $
DELIMITER ;

CALL verify_user("mg", "pass123");