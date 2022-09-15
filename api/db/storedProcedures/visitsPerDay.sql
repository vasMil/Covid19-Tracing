DROP PROCEDURE IF EXISTS visitsPerDay;
DELIMITER $
CREATE PROCEDURE visitsPerDay(IN firstDate DATE, IN endDate DATE)
BEGIN
	SELECT CAST(visit_table.timestamp AS DATE) AS theDay, COUNT(*) AS totalVisits FROM visit_table 
    WHERE CAST(visit_table.timestamp AS DATE) >= firstDate AND CAST(visit_table.timestamp AS DATE) <= endDate
    GROUP BY theDay ORDER BY theDay;
END $
DELIMITER ;

-- CALL visitsPerDay("2022-08-01", "2022-09-13");