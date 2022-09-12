DROP PROCEDURE IF EXISTS getPois;
DELIMITER $
CREATE PROCEDURE getPois(
	IN min_lat DOUBLE, IN max_lat DOUBLE, IN min_lng DOUBLE, IN max_lng DOUBLE,
    IN type VARCHAR(50), IN curDay INT, IN curHour INT, IN hourOffset INT
    )
BEGIN
SELECT poi.id, poi.name, poi.address, poi.latitude, poi.longitude, AVG(pt.number_of_people) AS estimation, AVG(visit.estimation) AS approximation
FROM poi_table AS poi
INNER JOIN popular_times_table AS pt ON poi.id = pt.poi_id
LEFT JOIN visit_table AS visit ON poi.id = visit.poi_id
LEFT JOIN poi_type ON poi.id = poi_type.poi_id
WHERE poi_type.type LIKE CONCAT('%', type, '%')
	AND poi.latitude >= min_lat AND poi.longitude >= min_lng
	AND poi.latitude <= max_lat AND poi.longitude <= max_lng
	AND pt.day = curDay
	AND pt.hour <= curHour + hourOffset AND pt.hour >= curHour
GROUP BY poi.id
ORDER BY estimation ASC;
END $
DELIMITER ;

-- CALL getPois(0,1000,0,1000,'food',5,17,2);
-- CALL getPois(38.206067104937894, 38.269658736195126, 21.690052748915704, 21.771015023550795, "food", 5, 18, 2);