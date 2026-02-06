USE project1_db;

CREATE SCHEMA IF NOT EXISTS `project1_db` ;


CREATE TABLE `project1_db`.`departments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);
  
 CREATE TABLE `project1_db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE);
  
  
  CREATE TABLE `project1_db`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `department_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `hire_date` DATE NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  
  CONSTRAINT fk_department
        FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_role
        FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE RESTRICT
);

CREATE TABLE `project1_db`.`time_off_requests` (
  `request_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `request_type` ENUM('vacation', 'sick', 'personal') NOT NULL,
  `status` ENUM('pending', 'approved', 'denied') NOT NULL,
  `reason` VARCHAR(100) NULL,
  PRIMARY KEY (`request_id`),
  
  CONSTRAINT fk_time_off_employee
        FOREIGN KEY (employee_id) REFERENCES employees(id)
        ON DELETE CASCADE
);



CREATE INDEX idx_employee_department ON employees(department_id);
CREATE INDEX idx_employee_role ON employees(role_id);
CREATE INDEX idx_timeoff_employee ON time_off_requests(employee_id);

INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Software Development');
INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Quality Assurance');
INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Customer Support');
INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Sales');
INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Human Resources');
INSERT INTO `project1_db`.`departments` (`name`) VALUES ('Marketing');

INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Senior Developer');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Junior Developer');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Developer');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('QA Engineer');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Support Specialist');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Sales Manager');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('HR Manager');
INSERT INTO `project1_db`.`roles` (`title`) VALUES ('Marketing Coordinator');




	INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('John Smith', 'john.smith@moderntech.com', 1, 1, '1985-03-15', '2015-06-01');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Sarah Johnson', 'sarah.johnson@moderntech.com', 2, 2, '1990-07-22', '2018-03-15');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Michael Brown', 'michael.brown@moderntech.com', 3, 3, '1988-11-08', '2016-09-10');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Emily Davis', 'emily.davis@moderntech.com', 1, 4, '1995-05-30', '2020-01-20');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('David Wilson', 'david.wilson@moderntech.com', 4, 5, '1987-09-12', '2017-04-05');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Lisa Anderson', 'lisa.anderson@moderntech.com', 5, 6, '1986-12-25', '2014-08-15');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Robert Taylor', 'robert.taylor@moderntech.com', 6, 7, '1992-02-14', '2019-07-01');
INSERT IGNORE INTO `project1_db`.`employees` (`name`, `email`, `department_id`, `role_id`, `date_of_birth`, `hire_date`) VALUES ('Jennifer Martinez', 'jennifer.martinez@moderntech.com', 1, 8, '1991-08-03', '2018-11-12');
  
  
INSERT INTO time_off_requests
(employee_id, start_date, end_date, request_type, status, reason)
VALUES
(1, '2024-12-20', '2024-12-22', 'vacation', 'pending', 'Family vacation'),
(2, '2024-12-18', '2024-12-18', 'sick', 'approved', 'Medical appointment'),
(3, '2024-12-25', '2024-12-27', 'vacation', 'approved', 'Holiday break'),
(4, '2024-12-19', '2024-12-19', 'personal', 'denied', 'Personal matters'),
(5, '2024-12-23', '2024-12-24', 'vacation', 'pending', 'Christmas holiday');
