DROP PROCEDURE IF EXISTS covidVisitsPerDay;
DELIMITER $
CREATE PROCEDURE covidVisitsPerDay(IN firstDate DATE, IN endDate DATE)
BEGIN
	SELECT DATE_FORMAT(DATE(visit_table.timestamp), '%Y-%m-%d') AS day, COUNT(*) AS numOfVisits FROM visit_table
    INNER JOIN covid_case_table ON visit_table.user_id = covid_case_table.user_id
    WHERE DATEDIFF(CAST(visit_table.timestamp AS DATE), firstDate) >= 0 AND DATEDIFF(CAST(visit_table.timestamp AS DATE), endDate) <= 0 
	  AND DATEDIFF(CAST(visit_table.timestamp AS DATE), covid_case_table.date) < 14 AND DATEDIFF(CAST(visit_table.timestamp AS DATE), covid_case_table.date) > 0
    GROUP BY day ORDER BY day;
END $
DELIMITER ;

-- CALL covidVisitsPerDay("2022-08-01", "2022-09-13");