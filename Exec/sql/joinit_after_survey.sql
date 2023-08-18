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
-- Table structure for table `after_survey`
--

DROP TABLE IF EXISTS `after_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `after_survey` (
  `prescription_id` int(11) NOT NULL,
  `pain_degree` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `satisfaction` int(11) NOT NULL,
  `pain_relief` int(11) NOT NULL,
  `etc` text DEFAULT NULL,
  PRIMARY KEY (`prescription_id`),
  CONSTRAINT `FK_Prescription_TO_After_Survey_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `after_survey`
--

LOCK TABLES `after_survey` WRITE;
/*!40000 ALTER TABLE `after_survey` DISABLE KEYS */;
INSERT INTO `after_survey` VALUES (85,10,10,1,1,'너무 어려운 운동이여서 더 아파졌습니다. 실망입니다.'),(86,7,9,7,9,'만족스럽습니다.'),(88,10,5,8,7,'asdasd'),(94,8,7,3,5,'처음이라 그런지 너무 어려웠어요'),(95,7,6,4,5,'너무 힘들어요.. 저 다시 운동 할 수 있겠죠?'),(96,7,7,4,4,'오늘 운동 좀 힘들었어요 ㅠㅠ'),(97,3,2,8,8,'오늘 코칭 감사합니다! 어캐 거의 다 나은 것 같아요~'),(98,7,7,3,5,'너무 강도가 높은 것 같아요'),(100,6,6,5,5,'이제 조금씩 나아지는 것 같아요!'),(101,6,6,5,5,'오늘 운동 잘 된 것 같아요~'),(102,5,5,6,7,'익숙해 져서 그런지 회복도 더 빠른 것 같아요!'),(103,4,4,7,8,'이제 거의 다 회복 된 것 같아요!'),(271,8,5,10,10,'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ'),(284,3,5,2,6,'test');
/*!40000 ALTER TABLE `after_survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:27:44
