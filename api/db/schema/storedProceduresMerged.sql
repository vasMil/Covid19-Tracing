-- GetLastModifiedDate
DROP PROCEDURE IF EXISTS getLastModifiedDate;
DELIMITER $
CREATE PROCEDURE getLastModifiedDate(IN filename VARCHAR(100))
BEGIN
	DECLARE last_del_id INT;
	SELECT id INTO last_del_id
    FROM admin_changes_table
    WHERE type = "DELETE"
    ORDER BY id DESC LIMIT 1;
    
    SELECT id, file_last_mod
    FROM admin_changes_table
    WHERE (type = "INSERT" OR type = "UPDATE") AND id > last_del_id AND success = 1 AND file_name_used = filename
    ORDER BY id DESC LIMIT 1;
END $
DELIMITER ;

-- GetPois
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
WHERE poi.poi_type LIKE CONCAT('%', type, '%')
	AND poi.latitude >= min_lat AND poi.longitude >= min_lng
	AND poi.latitude <= max_lat AND poi.longitude <= max_lng
	AND pt.day = curDay
	AND pt.hour <= curHour + hourOffset AND pt.hour >= curHour
GROUP BY poi.id
ORDER BY estimation ASC;
END $
DELIMITER ;

-- getProfileInfo
DROP PROCEDURE IF EXISTS getProfileInfo;
DELIMITER $
CREATE PROCEDURE getProfileInfo(IN user_id INT)
BEGIN

	SELECT email FROM user_table WHERE user_table.user_id = user_id;
    
    SELECT vt.poi_id, vt.timestamp, pt.name, pt.address, pt.poi_type
    FROM visit_table as vt
    LEFT JOIN poi_table as pt ON pt.id = vt.poi_id
    WHERE vt.user_id = user_id;
    
    SELECT cct.date FROM covid_case_table AS cct WHERE cct.user_id = user_id;
    
END $
DELIMITER ;

-- getVisits_ExposedUserToCovid
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

-- register_location
DROP PROCEDURE IF EXISTS register_location;
DELIMITER $
CREATE PROCEDURE register_location (IN userId INT, IN poiName VARCHAR(100), IN poiAddress VARCHAR(100), IN estim INT, IN date_time DATETIME)
BEGIN
	
    DECLARE IsRegistered VARCHAR(45) DEFAULT FALSE;
    DECLARE success BOOL DEFAULT FALSE;
    DECLARE poiId VARCHAR(30);
    
    SELECT poi_table.id INTO poiId FROM poi_table WHERE poi_table.address = poiAddress AND poi_table.name = poiName;
    
    SELECT COUNT(*) > 0 INTO IsRegistered
    FROM visit_table
    WHERE visit_table.user_id = userId AND visit_table.poi_id = poiId AND ABS(TIMESTAMPDIFF(HOUR,visit_table.timestamp,date_time)) < 2;
    
    SET success = NOT(IsRegistered);
    IF success THEN
		INSERT INTO visit_table (user_id, poi_id, estimation, timestamp) VALUES (userId, poiId, estim, date_time);
    END IF;
    
    SELECT
    CASE WHEN success = '1' THEN
    TRUE
    ELSE FALSE
    END AS "success",
    CASE WHEN IsRegistered = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "IsRegistered";
	
    
END$
DELIMITER ;

-- register_user
DROP PROCEDURE IF EXISTS register_user;
DELIMITER $
CREATE PROCEDURE register_user (IN username VARCHAR(45), IN email VARCHAR(45), IN password VARCHAR(70))
BEGIN
	
    DECLARE usernameUsed VARCHAR(45) DEFAULT FALSE;
    DECLARE emailUsed VARCHAR(45) DEFAULT FALSE;
    DECLARE success BOOL DEFAULT FALSE;
    
    SELECT COUNT(*) > 0 INTO usernameUsed
    FROM user_table
    WHERE user_table.username = username;
    
    SELECT COUNT(*) > 0 INTO emailUsed
    FROM user_table
    WHERE user_table.email = email;
    
    SET success = NOT (usernameUsed OR emailUsed);
    IF success THEN
		INSERT INTO user_table (user_table.username, user_table.email, user_table.password) VALUES (username, email, password);
    END IF;
    
    SELECT
    CASE WHEN success = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "success",
	CASE WHEN usernameUsed = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "usernameUsed",
	CASE WHEN emailUsed = '1' THEN
    TRUE 
    ELSE FALSE 
    END AS "emailUsed";
    
END$
DELIMITER ;

-- registerCovidCase
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

-- retrieve_userData
DROP PROCEDURE IF EXISTS retrieve_userData;
DELIMITER $
CREATE PROCEDURE retrieve_userData (IN username VARCHAR(45))
BEGIN
	DECLARE userId INT DEFAULT NULL;
    DECLARE hashedPass VARCHAR(70) DEFAULT NULL;
    DECLARE isAdmin BOOL DEFAULT FALSE;
    
	SELECT user_table.user_id, user_table.password INTO userId, hashedPass
    FROM user_table
    WHERE user_table.username = username AND user_table.password = password;
	
    SELECT COUNT(*) > 0 INTO isAdmin
    FROM admin_table
    WHERE admin_table.admin_id = userId;
    
    IF userId IS NOT NULL THEN
		SELECT userId AS "id", 
        CASE WHEN isAdmin = '1' 
        THEN TRUE 
        ELSE FALSE 
        END AS "isAdmin",
        username AS "username",
        hashedPass AS "hashedPass";
    END IF;
END $
DELIMITER ;

-- update_username_password
DROP PROCEDURE IF EXISTS update_username_password;
DELIMITER $
CREATE PROCEDURE update_username_password(IN user_id INT, IN new_username VARCHAR(45), IN new_password VARCHAR(70))
BEGIN
	DECLARE usernameUsed BOOL DEFAULT FALSE;
    DECLARE success_username BOOL DEFAULT FALSE;
    DECLARE success_password BOOL DEFAULT FALSE;
   	
    IF new_username IS NOT NULL AND new_password IS NOT NULL THEN
		-- Update both password and username
		SELECT COUNT(*) > 0 INTO usernameUsed
		FROM user_table
		WHERE user_table.username = new_username;
        
        IF NOT usernameUsed THEN
			UPDATE user_table AS users
            SET users.username = new_username,
				users.password = new_password
            WHERE users.user_id = user_id;
            
            SET success_username = TRUE;
            SET success_password = TRUE;
		ELSE
			UPDATE user_table AS users
            SET users.password = new_password
            WHERE users.user_id = user_id;
            
            SET success_password = TRUE;
		END IF;
        
    ELSEIF new_username IS NOT NULL THEN
		-- Update only the username
		SELECT COUNT(*) > 0 INTO usernameUsed
		FROM user_table
		WHERE user_table.username = new_username;
        
		IF NOT usernameUsed THEN
			UPDATE user_table AS users
            SET users.username = new_username
            WHERE users.user_id = user_id;
            
            SET success_username = TRUE;
		END IF;
        
	ELSEIF new_password IS NOT NULL THEN
		-- Update only the password
		UPDATE user_table AS users
		SET users.password = new_password
		WHERE users.user_id = user_id;
        
        SET success_password = TRUE;
    END IF;
    
	SELECT success_username, success_password, usernameUsed;
END $
DELIMITER ;
