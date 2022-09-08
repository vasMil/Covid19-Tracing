DROP PROCEDURE IF EXISTS getPoi_id;

DELIMITER $$
CREATE PROCEDURE getPoi_id(IN poiName VARCHAR(100), IN poiAddress VARCHAR(100), OUT poiId VARCHAR(30))
BEGIN
	SELECT poi_table.id INTO poiId FROM poi_table WHERE poi_table.address = poiAddress AND poi_table.name = poiName;
END$$

DELIMITER ;
