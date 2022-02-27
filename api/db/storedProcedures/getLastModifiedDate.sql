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

-- UPDATE poi_table SET name = "Σχολή Οδηγών - Δώρα Κ. Γιαννακοπούλου" WHERE id = "ChIJ_cM58sE3XhMRCHVgkJkjUeQ";

-- TEST
-- CALL getLastModifiedDate("starting_pois.json");