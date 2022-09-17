DROP PROCEDURE IF EXISTS visitsPerHour;
DELIMITER $
CREATE PROCEDURE visitsPerHour(IN date_ DATE)
BEGIN
	SELECT TIME_FORMAT(TIME(visit_table.timestamp), '%H:00') AS hour, COUNT(*) AS numOfVisits
    FROM visit_table 
    WHERE DATE(visit_table.timestamp) = date_
    GROUP BY hour
    ORDER BY hour ASC;
END $
DELIMITER ;

-- CALL visitsPerHour("2022-09-13");