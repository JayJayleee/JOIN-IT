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
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment` (
  `treatment_id` int(11) NOT NULL AUTO_INCREMENT,
  `therapist_id` varchar(20) NOT NULL,
  `joint_id` int(11) NOT NULL,
  `joint_name` varchar(30) NOT NULL,
  `patient_id` varchar(20) DEFAULT NULL,
  `patient_name` varchar(30) NOT NULL,
  `patient_phone` varchar(30) NOT NULL,
  `accident_detail` text DEFAULT NULL,
  `treatment_significant` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `is_completed` varchar(1) NOT NULL DEFAULT 'N',
  `treatement_code` varchar(8) DEFAULT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`treatment_id`),
  KEY `FKjhti6btxyvb40rmp1kki3jlve` (`joint_id`),
  KEY `FKjpqauh9f08891a82no3i8aq7o` (`patient_id`),
  KEY `FKncg93jtb6uienmfcdfm28v96t` (`therapist_id`),
  CONSTRAINT `FKjhti6btxyvb40rmp1kki3jlve` FOREIGN KEY (`joint_id`) REFERENCES `joint` (`joint_id`),
  CONSTRAINT `FKjpqauh9f08891a82no3i8aq7o` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`user_id`),
  CONSTRAINT `FKncg93jtb6uienmfcdfm28v96t` FOREIGN KEY (`therapist_id`) REFERENCES `therapist` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment`
--

LOCK TABLES `treatment` WRITE;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` VALUES (65,'T0000000005',3,'손목','P0000000009','이은성','01073718022','손목 터널 증후군',NULL,'손목 터널 증후군으로 인해 지속적인 치료 중','N',NULL,'2023-08-14 00:00:00',NULL,NULL),(66,'T0000000006',3,'손목','P0000000004','송병훈','01084910814','컴퓨터 과다 사용으로 인한 손목 부상',NULL,'손목 저강도 고반복 재활 운동으로 치료 예정','N',NULL,'2023-08-15 00:00:00',NULL,NULL),(67,'T0000000005',2,'어깨','P0000000020','신지원','01024797338','헬스 중 미미한 어깨 탈골 발생','양쪽 어깨 치료 필요','어깨 탈골 발생, 스트레칭 처방 필요 및 차츰 늘려가기','Y',NULL,'2023-08-01 00:00:00',NULL,'2023-08-15 00:00:00'),(68,'T0000000007',1,'목','P0000000023','김영민','01066662309','목 디스크','목 근력 강화 운동 필요','목 디스크로 인한 치료 중 근력 강화 운동 처방','N',NULL,'2023-07-31 00:00:00',NULL,NULL),(69,'T0000000007',3,'손목','P0000000009','이은성','01073718022','손목 터널 증후군','손목 근력 강화 운동 필요','손목 터널 증후군으로 치료 중 근력 강화 운동 처방','Y',NULL,'2023-07-31 00:00:00',NULL,'2023-08-15 00:00:00'),(70,'T0000000007',1,'목','P0000000020','신지원','01024797338','거북목','거북목으로 인해 스트레칭 처방 필요','거북목으로 치료 중 회전 운동 처방','N',NULL,'2023-08-02 00:00:00',NULL,NULL),(71,'T0000000003',1,'목','P0000000023','김영민','01066662309','거북목','거북목으로 인해 스트레칭 처방 필요','거북목으로 치료 중 회전 운동 처방','Y',NULL,'2023-08-04 00:00:00',NULL,'2023-08-15 00:00:00'),(72,'T0000000003',3,'손목','P0000000024','오다희','01099560783','손목 터널 증후군','극심한 손목 터널 증후군으로 인한 회전 처방 필요','손목 터널 증후군 치료 중 회전 운동 처방','N',NULL,'2023-08-04 00:00:00',NULL,NULL),(73,'T0000000006',3,'손목','P0000000025','김지희','01037366357','손목 터널 증후군','극심한 손목 터널 증후군으로 인한 회전 처방 필요','손목 터널증후군 치료 중 회전 운동 처방','N',NULL,'2023-08-04 00:00:00',NULL,NULL),(74,'T0000000003',1,'목','P0000000025','김지희','01037366357','가벼운 접촉사고','가벼운 접촉사고로 인해 목 경직','목 경직으로 인한 회전 처방 필요','N',NULL,'2023-08-05 00:00:00',NULL,NULL),(75,'T0000000006',1,'목','P0000000024','오다희','01099560783','목 디스크','목 디스크로 인한 치료중','목 경직으로 인한 스트레칭 처방 필요','Y',NULL,'2023-08-06 00:00:00',NULL,'2023-08-15 00:00:00'),(76,'T0000000006',2,'어깨','P0000000004','송병훈','01084910814','라운드 숄더','라운드 숄더 치료중','심한 라운드 숄더로 인해 회전 및 스트레칭 처방 필요','N',NULL,'2023-08-06 00:00:00',NULL,NULL),(77,'T0000000007',2,'어깨','P0000000026','이채림','01055505682','라운드 숄더','라운드 숄더 치료중','심한 라운드 숄더로 인해 회전 및 스트레칭 처방 필요','N',NULL,'2023-08-06 00:00:00',NULL,NULL),(78,'T0000000006',1,'목','P0000000026','이채림','01055505682','뒷좌석 후방 추돌 사고','추돌 사고로 인한 목 경직','후방 추돌 사고로 인해 목 경직 발생, 회전 릴리즈 위주로 처방 필요','N',NULL,'2023-08-07 00:00:00',NULL,NULL),(79,'T0000000007',1,'목','P0000000023','김영민','01066662309','뒷좌석 탑승 중 후방 추돌 발생','어깨 쪽 치료도 동반되어야 할 수 있음','교통 사고로 인한 목 부상, 회전 처방 필요','N',NULL,'2023-08-10 00:00:00',NULL,NULL),(80,'T0000000007',2,'어깨','P0000000004','송병훈','01084910814','헬스 중 어깨 부상','목치료도 동반되어야 할 수 있음','어깨 부상으로 치료 중, 회전 및 스트레칭 처방 필요','N',NULL,'2023-08-10 00:00:00',NULL,NULL),(81,'T0000000007',3,'손목','P0000000024','오다희','01099560783','낙상 사고 발생 중 손으로 짚어 손목 부상','어깨 치료도 동반되어야 할 수 있음','손목 부상으로 인해 치료 중, 붓기 주의','N',NULL,'2023-08-12 00:00:00',NULL,NULL),(82,'T0000000007',1,'목','P0000000025','김지희','01037366357','거북목','어깨 치료(라운드 숄더)도 동반되어야 할 수 있음','거북목으로 치료 중 스트레칭 처방 필요','Y',NULL,'2023-07-25 00:00:00',NULL,'2023-08-15 00:00:00'),(83,'T0000000005',2,'어깨','P0000000009','이은성','01073718022','라운드 숄더','뒷목 쪽 치료도 동반되어야 할 수 있음','라운드 숄더 교정 중, 1일 1 운동 처방 필요','N',NULL,'2023-08-08 00:00:00',NULL,NULL),(84,'T0000000007',1,'목','P0000000009','이은성','01073718022','뒷좌석 탑승 중 후방 추돌 발생','어깨 쪽 치료도 동반되어야 할 수 있음','교통 사고로 인한 목 부상, 회전 처방 필요','N',NULL,'2023-08-08 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;
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
