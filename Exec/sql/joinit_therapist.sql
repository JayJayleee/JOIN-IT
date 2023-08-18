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
-- Table structure for table `therapist`
--

DROP TABLE IF EXISTS `therapist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `therapist` (
  `user_id` varchar(20) NOT NULL,
  `birth` datetime DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `hospital_name` varchar(30) DEFAULT NULL,
  `hospital_number` varchar(30) DEFAULT NULL,
  `introduce` text DEFAULT NULL,
  `license_img_route` varchar(255) DEFAULT NULL,
  `img_route` varchar(255) DEFAULT NULL,
  `origin_name` varchar(255) DEFAULT NULL,
  `saved_name` varchar(255) DEFAULT NULL,
  `profile_img_route` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_User_TO_Therapist_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapist`
--

LOCK TABLES `therapist` WRITE;
/*!40000 ALTER TABLE `therapist` DISABLE KEYS */;
INSERT INTO `therapist` VALUES ('T0000000003','1996-08-14 00:00:00','M','치료사 병원명','0313046953','안녕하세요. 저는 치료사 병원명의 치료사입니다.','https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/6567145a-7dc5-4f87-8b3c-78dbba7578b5-webhook.png',NULL,NULL,NULL,NULL),('T0000000005','1999-09-27 00:00:00','W','대전센텀병원','0423357661','안녕하세요. 저는 대전센텀병원의 치료사입니다.','https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/abab80c0-6c79-445d-a1f7-57670716cdc3-blob',NULL,NULL,NULL,NULL),('T0000000006','1999-02-25 00:00:00','M','대전성모병원','0425432378','안녕하세요. 저는 대전성모병원의 치료사입니다.','https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/581e52cc-48aa-4e36-b6bd-34d0127485fb-blob',NULL,NULL,NULL,NULL),('T0000000007','1997-09-26 00:00:00','M','충북대학병원','0418549937','안녕하세요. 저는 충북대학병원의 치료사입니다.','https://asrai-bucket.s3.ap-northeast-2.amazonaws.com/20a977d5-8040-4be4-b064-7e86cf92ed9e-blob',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `therapist` ENABLE KEYS */;
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
