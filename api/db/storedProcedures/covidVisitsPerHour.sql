DROP PROCEDURE IF EXISTS covidVisitsPerHour;
DELIMITER $
CREATE PROCEDURE covidVisitsPerHour(IN Date_ DATE)
BEGIN
	SELECT TIME_FORMAT(TIME(visit_table.timestamp), '%H:00') AS hour, COUNT(*) AS numOfVisits FROM visit_table
    INNER JOIN covid_case_table ON visit_table.user_id = covid_case_table.user_id
    WHERE CAST(visit_table.timestamp AS DATE) = Date_ AND DATEDIFF(CAST(visit_table.timestamp AS DATE), covid_case_table.date) < 14 AND DATEDIFF(CAST(visit_table.timestamp AS DATE), covid_case_table.date) > 0
    GROUP BY hour
    ORDER BY hour;
END $
DELIMITER ;

-- CALL covidVisitsPerHour("2022-09-04");