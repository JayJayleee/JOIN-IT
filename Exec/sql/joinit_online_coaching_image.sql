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
-- Table structure for table `online_coaching_image`
--

DROP TABLE IF EXISTS `online_coaching_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `online_coaching_image` (
  `sequence` int(11) NOT NULL,
  `prescription_id` int(11) NOT NULL,
  `img_route` varchar(255) NOT NULL,
  PRIMARY KEY (`sequence`,`prescription_id`),
  KEY `FK61paduhlhaq76nycog3gul9vt` (`prescription_id`),
  CONSTRAINT `FK61paduhlhaq76nycog3gul9vt` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `online_coaching_image`
--

LOCK TABLES `online_coaching_image` WRITE;
/*!40000 ALTER TABLE `online_coaching_image` DISABLE KEYS */;
INSERT INTO `online_coaching_image` VALUES (1,85,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/9f82bd87-e287-4ed1-ba73-19db52b3b5ed-blobtofile.png'),(1,86,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/7611a410-86e9-4124-b8a6-198d8ce158cf-blobtofile.png'),(2,85,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/8c3778e9-9bf8-4594-bc57-5b587393e8eb-blobtofile.png'),(2,86,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/20dbfb53-21ad-4ede-93fa-f5f32f334aec-blobtofile.png');
/*!40000 ALTER TABLE `online_coaching_image` ENABLE KEYS */;
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
