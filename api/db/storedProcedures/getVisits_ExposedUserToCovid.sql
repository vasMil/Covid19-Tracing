DROP PROCEDURE IF EXISTS getVisits_ExposedUserToCovid;
DELIMITER $
CREATE PROCEDURE getVisits_ExposedUserToCovid(IN id INT)
BEGIN
	SELECT poi.name AS poiName, poi.address AS poiAddress, poi.latitude AS poiLat, poi.longitude AS poiLng, visit.timestamp AS visitTimestamp
    FROM visit_table as visit
    INNER JOIN (SELECT covidVisit.poi_id AS covidPoiId, covidVisit.timestamp AS covidVisitTimestamp
                FROM visit_table AS covidVisit
                INNER JOIN covid_case_table AS covidCase ON covidCase.user_id = covidVisit.user_id
                WHERE ABS(DATEDIFF(covidCase.date, covidVisit.timestamp)) <= 7
                AND covidVisit.user_id != id) AS covidPois ON covidPois.covidPoiId = visit.poi_id
	INNER JOIN poi_table AS poi ON poi.id = visit.poi_id
    WHERE visit.user_id = id
    AND DATEDIFF(NOW(), visit.timestamp) <= 7 
    AND ABS(TIMESTAMPDIFF(minute, covidPois.covidVisitTimestamp, visit.timestamp)) <= 2*60
    GROUP BY poi.id;
END $
DELIMITER ;

-- Test
-- CALL getVisits_ExposedUserToCovid(3);


-- 	SELECT poi.name AS poiName, poi.address AS poiAddress, poi.latitude AS poiLat, poi.longitude AS poiLng, visit.timestamp AS visitTimestamp
--     FROM poi_table AS poi
--     INNER JOIN visit_table AS visit ON visit.poi_id = poi.id
--     WHERE visit.user_id = id AND TIMESTAMPDIFF(day, now, visit.timestamp) <= 7;
--     
--     SELECT visit.poi_id, visit.timestamp
--     FROM visit_table AS visit
--     INNER JOIN covid_case_table AS covid_case ON covid_case.user_id = visit.user_id
--     WHERE DATEDIFF(covid_case.date, CAST(visit.timestamp AS DATE)) <= 7;