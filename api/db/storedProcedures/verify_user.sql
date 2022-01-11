DROP PROCEDURE IF EXISTS retrieve_userData;
DELIMITER $
CREATE PROCEDURE retrieve_userData (IN username VARCHAR(45))
BEGIN
	DECLARE userId INT DEFAULT NULL;
    DECLARE hashedPass VARCHAR(70) DEFAULT NULL;
    DECLARE isAdmin BOOL DEFAULT FALSE;
    
	SELECT user_table.user_id, user_table.password INTO userId, hashedPass
    FROM user_table
    WHERE user_table.username = username AND user_table.password = password;
	
    SELECT COUNT(*) > 0 INTO isAdmin
    FROM admin_table
    WHERE admin_table.admin_id = userId;
    
    IF userId IS NOT NULL THEN
		SELECT userId AS "id", 
        CASE WHEN isAdmin = '1' 
        THEN TRUE 
        ELSE FALSE 
        END AS "isAdmin",
        username AS "username",
        hashedPass AS "hashedPass";
    END IF;
END $
DELIMITER ;

# Test
-- CALL retrieve_userData("mg");
-- CALL retrieve_userData("admin");