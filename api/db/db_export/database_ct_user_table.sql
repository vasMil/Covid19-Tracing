-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: database_ct
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'admin','admin@admin.com','$2a$04$chq0zRMXDOuQJ1./tXVpO.W4W83QuVRr8QoTuyLFOkS4Wj6TKCNsa'),(2,'mg','@mail','$2a$04$3jNJI/YsnhkLLirSXnxND.oSJ8rAnmUDwPoL3fmDGjYQ/lhdj3RHS'),(3,'test','test@test.com','$2a$04$YoxIt8eQm2.CPFDCBK15JOBJp4s22eKFdaNKn6OhlM49lkHbU3q4G'),(4,'temp','temp@temp.com','$2a$04$4OMqhjfu.eCGzFUcyp14AubLrXjw5fbOH8bP2mAWgYAxcm9ztFp3C'),(5,'test2','test2@test2.com','$2a$10$snLEZN6hSOMj8wo7KoSG2uHy8b06d9UhJfsgbpAQojXI54Hx.M1zq'),(6,'User6','User6@mail.com','$2a$10$LabbTC0Pa4su..EZkklUzulOlfIUly/L/pxnnNRyhjd/JPdHi4.hm'),(7,'User7','User7@mail.com','$2a$10$Kk46rY.GnKTU1Ma3fDdVFuNwGopExWCVziwF6st2/oD5mnDvXdGha'),(8,'User8','User8@mail.com','$2a$10$JowNJuZ6azGHT2W6BYWG7.W5/u2DTt5YvjlQKL8Rl7t3uERNOPni.'),(9,'User9','User9@mail.com','$2a$10$0Scj.FC1jHnlYXKlYm.BK.oY894Rmrv2GzZCFXzedxGz3HQN0Daii'),(10,'User10','User10@mail.com','$2a$10$.E.zB5ICN385Bo0JAsxjoOzRMkWNtXzUcUyACWNxsBZfCAh9jnzx6');
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-18 23:10:50
