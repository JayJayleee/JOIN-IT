-- MariaDB dump 10.19  Distrib 10.6.14-MariaDB, for Win64 (AMD64)
--
-- Host: asrai-app-database.cwk2ukisdzzj.ap-northeast-2.rds.amazonaws.com    Database: joinit
-- ------------------------------------------------------
-- Server version	10.6.14-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `joint_training_type`
--

DROP TABLE IF EXISTS `joint_training_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joint_training_type` (
  `mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `training_type_id` int(11) NOT NULL,
  `joint_id` int(11) NOT NULL,
  `count` int(11) DEFAULT 1,
  PRIMARY KEY (`mapping_id`),
  KEY `FKh5ytlhn1ne2ekhbtfm6ee26on` (`joint_id`),
  KEY `FK5muc0nrqhwe9fy9lru26k05jj` (`training_type_id`),
  CONSTRAINT `FK5muc0nrqhwe9fy9lru26k05jj` FOREIGN KEY (`training_type_id`) REFERENCES `training_type` (`training_type_id`),
  CONSTRAINT `FKh5ytlhn1ne2ekhbtfm6ee26on` FOREIGN KEY (`joint_id`) REFERENCES `joint` (`joint_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joint_training_type`
--

LOCK TABLES `joint_training_type` WRITE;
/*!40000 ALTER TABLE `joint_training_type` DISABLE KEYS */;
INSERT INTO `joint_training_type` VALUES (1,1,1,4),(2,2,1,2),(3,3,1,0),(4,4,1,0),(5,1,2,6),(6,2,2,4),(7,3,2,2),(8,4,2,0),(10,1,3,0),(11,2,3,0),(12,3,3,2),(13,4,3,2),(14,1,4,0),(15,2,4,0),(16,3,4,0),(17,4,4,0),(18,1,5,0),(19,2,5,0),(20,3,5,0),(21,4,5,0),(22,1,6,0),(23,2,6,0),(24,3,6,0),(25,4,6,0),(26,1,7,0),(27,2,7,0),(28,3,7,0),(29,4,7,0);
/*!40000 ALTER TABLE `joint_training_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:27:42
