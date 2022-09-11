DROP PROCEDURE IF EXISTS dispStats_a_c;
DELIMITER $
CREATE PROCEDURE dispStats_a_c()
BEGIN
	DECLARE totalVisits INT;
    DECLARE totalCovidCases INT;
    DECLARE totalVisitsFromCases INT;

	SELECT count(visit_table.id) INTO totalVisits FROM visit_table;
    
    SELECT count(covid_case_table.id) INTO totalCovidCases FROM covid_case_table;
    
    SELECT count(visit_table.id) INTO totalVisitsFromCases FROM visit_table
	INNER JOIN covid_case_table ON visit_table.user_id = covid_case_table.user_id
	WHERE DATEDIFF(CAST(visit_table.timestamp as DATE), covid_case_table.date) <= 7 AND 
		  DATEDIFF(CAST(visit_table.timestamp as DATE), covid_case_table.date) >= -14;
          
	SELECT totalVisits, totalCovidCases, totalVisitsFromCases;
END $
DELIMITER ;

CALL dispStats_a_c();
-- SELECT @tV, @tCC, @tVFC;