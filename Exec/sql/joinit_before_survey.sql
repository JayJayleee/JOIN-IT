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
-- Table structure for table `before_survey`
--

DROP TABLE IF EXISTS `before_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `before_survey` (
  `prescription_id` int(11) NOT NULL,
  `angle` double NOT NULL,
  `before_img_route` varchar(255) NOT NULL,
  PRIMARY KEY (`prescription_id`),
  CONSTRAINT `FK_Prescription_TO_Before_Survey_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `before_survey`
--

LOCK TABLES `before_survey` WRITE;
/*!40000 ALTER TABLE `before_survey` DISABLE KEYS */;
INSERT INTO `before_survey` VALUES (86,18.946797906166566,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/329cb613-f284-43b3-b7f5-0519494ea093-blobtofile.png'),(89,1.9008979204803893,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/b7741f98-1cc5-45c0-8e28-676e30128d2d-blobtofile.png'),(95,45,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/71366f53-057d-4c65-945d-348db7cb889e-blobtofile.png'),(96,45,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/966cf2f7-ecd8-4003-b279-a00da7e5a459-blobtofile.png'),(97,6.260100141304889,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/e769181a-ec43-47eb-8711-86c48f05387d-blobtofile.png'),(123,45,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/27f7f5aa-6edc-46d2-9741-cb749a3bc2e0-blobtofile.png'),(124,0,'https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/481f6e78-6225-4681-ba11-c182f7bcd817-197145d8-933d-4639-8f5f-19d533fa90ad-blobtofile.png');
/*!40000 ALTER TABLE `before_survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:27:38
