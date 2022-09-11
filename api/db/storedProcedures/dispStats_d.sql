DROP PROCEDURE IF EXISTS dispStats_d;
DELIMITER $
CREATE PROCEDURE dispStats_d()
BEGIN
	SELECT poi_type, count(*) as amountOfVisits FROM poi_table GROUP BY poi_type ORDER BY amountOfVisits DESC;
END $
DELIMITER ;