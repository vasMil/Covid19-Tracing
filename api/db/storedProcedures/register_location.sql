DROP PROCEDURE IF EXISTS register_location;
DELIMITER $
CREATE PROCEDURE register_location (IN userId INT, IN poiName VARCHAR(100), IN poiAddress VARCHAR(100), IN estim INT, IN date_time DATETIME)
BEGIN
	
    DECLARE IsRegistered VARCHAR(45) DEFAULT FALSE;
    DECLARE success BOOL DEFAULT FALSE;
    DECLARE poiId VARCHAR(30);
    
    SELECT poi_table.id INTO poiId FROM poi_table WHERE poi_table.address = poiAddress AND poi_table.name = poiName;
    
    SELECT COUNT(*) > 0 INTO IsRegistered
    FROM visit_table
    WHERE visit_table.user_id = userId AND visit_table.poi_id = poiId AND TIMESTAMPDIFF(HOUR,visit_table.timestamp,date_time) < 2;
    
    SET success = NOT(IsRegistered);
    IF success THEN
		INSERT INTO visit_table (user_id, poi_id, estimation, timestamp) VALUES (userId, poiId, estim, date_time);
    END IF;
    
    SELECT
    CASE WHEN success = '1' THEN
    TRUE
    ELSE FALSE
    END AS "success",
    CASE WHEN IsRegistered = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "IsRegistered";
	
    
END$
DELIMITER ;

-- CALL register_location(4, 'ChIJ_cM58sE3XhMRCHVgkJkjUeQ', 10, '2022-01-18 18:29:00');
