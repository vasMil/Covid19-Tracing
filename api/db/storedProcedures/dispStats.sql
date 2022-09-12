DROP PROCEDURE IF EXISTS dispStats;
DELIMITER $
CREATE PROCEDURE dispStats()
BEGIN
	DECLARE timeNow DATETIME;

	SELECT COUNT(visit_table.id) AS totalVisits FROM visit_table;
    
    SELECT COUNT(covid_case_table.id) AS totalCovidCases FROM covid_case_table;
    
    SELECT COUNT(visit_table.id) AS totalVisitsFromCases FROM visit_table
	INNER JOIN covid_case_table ON visit_table.user_id = covid_case_table.user_id
	WHERE DATEDIFF(CAST(visit_table.timestamp as DATE), covid_case_table.date) <= 7 AND 
		  DATEDIFF(CAST(visit_table.timestamp as DATE), covid_case_table.date) >= -14;
          
	-- SELECT totalVisits, totalCovidCases, totalVisitsFromCases;
    
    SELECT pt.type AS typeOfPOI, COUNT(*) AS amountOfVisits FROM visit_table AS vt
    INNER JOIN poi_type AS pt ON vt.poi_id = pt.poi_id 
    GROUP BY pt.type;
    
    SELECT pt.type AS typeOfPOI, COUNT(*) AS amountOfVisits FROM visit_table AS vt
    INNER JOIN poi_type AS pt ON vt.poi_id = pt.poi_id
    INNER JOIN covid_case_table AS cct ON vt.user_id = cct.user_id
    WHERE DATEDIFF(CAST(vt.timestamp as DATE), cct.date) >= -7 AND 
		  DATEDIFF(CAST(vt.timestamp as DATE), cct.date) <= 14
	GROUP BY pt.type
END $
DELIMITER ;

CALL dispStats();
