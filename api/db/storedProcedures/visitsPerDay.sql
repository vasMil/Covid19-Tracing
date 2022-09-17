DROP PROCEDURE IF EXISTS visitsPerDay;
DELIMITER $
CREATE PROCEDURE visitsPerDay(IN firstDate DATE, IN endDate DATE)
BEGIN
	SELECT DATE_FORMAT(DATE(visit_table.timestamp), '%Y-%m-%d')  AS day, COUNT(*) AS numOfVisits
    FROM visit_table
    WHERE DATE(visit_table.timestamp) >= firstDate AND DATE(visit_table.timestamp) <= endDate
    GROUP BY day
    ORDER BY day ASC;
END $
DELIMITER ;

-- CALL visitsPerDay("2022-08-01", "2022-09-13");