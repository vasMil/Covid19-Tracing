DROP PROCEDURE IF EXISTS visitsPerHour;
DELIMITER $
CREATE PROCEDURE visitsPerHour(IN Date_ DATE)
BEGIN
	SELECT visit_table.timestamp AS theHour, COUNT(*) AS totalVisits FROM visit_table 
    WHERE CAST(visit_table.timestamp AS DATE) = Date_
    GROUP BY theHour ORDER BY theHour;
END $
DELIMITER ;

CALL visitsPerHour("2022-09-04");