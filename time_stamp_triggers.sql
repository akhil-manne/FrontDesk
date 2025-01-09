use clinic_db;

DELIMITER $$

CREATE TRIGGER update_queue_progress_to_complete
AFTER UPDATE ON Appointments
FOR EACH ROW
BEGIN
  IF NEW.app_status = 'completed' THEN
    UPDATE Queue
    SET queue_progress = 'complete'
    WHERE q_id = NEW.patient_id;
  END IF;
END$$

DELIMITER ;
