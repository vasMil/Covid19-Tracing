DROP PROCEDURE IF EXISTS getProfileInfo;
DELIMITER $
CREATE PROCEDURE getProfileInfo(IN user_id INT)
BEGIN

	SELECT email FROM user_table WHERE user_table.user_id = user_id;
    
    SELECT vt.poi_id, vt.timestamp, pt.name, pt.address, pt.poi_type
    FROM visit_table as vt
    LEFT JOIN poi_table as pt ON pt.id = vt.poi_id
    WHERE vt.user_id = user_id;
    
    SELECT cct.date FROM covid_case_table AS cct WHERE cct.user_id = user_id;
    
END $
DELIMITER ;

-- TEST
-- CALL getProfileInfo(3); 