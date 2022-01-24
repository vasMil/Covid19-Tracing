DROP PROCEDURE IF EXISTS registerCovidCase;
DELIMITER $
CREATE PROCEDURE registerCovidCase(IN id VARCHAR(45), IN d DATE)
BEGIN
	DECLARE flag BOOL DEFAULT FALSE;
    SELECT COUNT(date) > 0 INTO flag FROM covid_case_table WHERE user_id = id AND DATEDIFF(d, date) <= 14;
    IF NOT flag THEN
		 INSERT INTO covid_case_table (date, user_id) VALUES (d, id);
	END IF;
	SELECT TRUE AS success, CASE WHEN flag = 1 THEN TRUE ELSE FALSE END AS alreadyRegistered;
END $
DELIMITER ;

-- Test
-- CALL registerCovidCase(2,'2022-01-19');