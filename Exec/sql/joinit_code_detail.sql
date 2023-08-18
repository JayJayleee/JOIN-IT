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
-- Table structure for table `code_detail`
--

DROP TABLE IF EXISTS `code_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_detail` (
  `code_type_id` varchar(1) NOT NULL,
  `code_detail` varchar(3) NOT NULL,
  `code_detail_name` varchar(30) NOT NULL,
  PRIMARY KEY (`code_type_id`,`code_detail`),
  CONSTRAINT `FK_Code_TO_Code_Detail_1` FOREIGN KEY (`code_type_id`) REFERENCES `code` (`code_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_detail`
--

LOCK TABLES `code_detail` WRITE;
/*!40000 ALTER TABLE `code_detail` DISABLE KEYS */;
INSERT INTO `code_detail` VALUES ('C','01','#A86254'),('C','02','#A854A8'),('C','03','#6754A8'),('C','04','#D1B480'),('C','05','#D4992C'),('C','06','#591F14'),('C','07','#591459'),('C','08','#231459'),('C','09','#24D4C5'),('C','10','#A8927E'),('C','11','#A7A07D'),('C','12','#D64552'),('C','13','#D4858D'),('C','14','#93A37C'),('C','15','#5C422A'),('C','16','#5C542A'),('C','17','#475C2A'),('C','18','#7045D6'),('C','19','#9D85D4'),('C','20','#24D4C5'),('D','01','고혈압'),('D','02','간경화증'),('D','03','뇌졸중'),('D','04','당뇨'),('D','05','백혈병'),('D','06','심근경색'),('D','07','심장판막증'),('D','08','암'),('D','09','에이즈'),('D','10','협심증'),('M','01','일반환자'),('M','02','유예환자'),('M','03','비활성환자'),('M','04','승인치료사'),('M','05','미승인치료사'),('M','06','유예치료사'),('M','07','비활성치료사'),('S','01','일반'),('S','02','네이버'),('S','03','카카오'),('S','04','구글');
/*!40000 ALTER TABLE `code_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:27:34
