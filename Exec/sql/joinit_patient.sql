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
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `user_id` varchar(20) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `etc` text DEFAULT NULL,
  `past_accident_details` text DEFAULT NULL,
  `significant` text DEFAULT NULL,
  `profile_color_code` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_User_TO_Patient_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('P0000000004','송병훈남',200,80,'M','1996-08-14 00:00:00','등등등등등010101','사고경력01사고경력01','특이사항01특이사항01특이사항01','C5'),('P0000000009','웅성웅성',168,60,'W','1999-09-16 00:00:00',NULL,'최근 후방 추돌 사고','특이사항 없음','C8'),('P0000000020','700지원',165,55,'W','1998-08-25 00:00:00','','교통사고 이력 존재, 발목 부상','보유 질환은 없지만 사고 경력 주의','C12'),('P0000000021','부여퀸',159,55,'W','1962-06-08 00:00:00','','사고 경력 무','당뇨 유','C16'),('P0000000022','계수나무',180,70,'M','1960-01-02 00:00:00','','사고 경력 무','고혈압 약 복용 중','C2'),('P0000000023','발표왕김팀장',179,70,'M','1994-05-05 00:00:00','','축구 중 인대 끊어짐 발생','특이 사항 무','C4'),('P0000000024','오다히짱',162,54,'W','1999-05-21 00:00:00','','계단에서 넘어져서 발목 인대 파열 사고 경험 있음','자주 발목을 삠','C9'),('P0000000025','zi희곤듀',170,52,'W','1999-04-01 00:00:00','','습관성 어깨 탈골','무게가 높은 운동을 못함','C4'),('P0000000026','채리마루',155,40,'W','2000-12-24 00:00:00','','사고 경력 무','왼쪽 어깨 통증으로 왼쪽 어깨 운동은 잘 하지 못함','C11');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:27:43
