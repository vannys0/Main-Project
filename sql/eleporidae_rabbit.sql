-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: eleporidae
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `rabbit`
--

DROP TABLE IF EXISTS `rabbit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rabbit` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `sex` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome_status` varchar(255) DEFAULT NULL,
  `byproduct` varchar(255) DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rabbit`
--

LOCK TABLES `rabbit` WRITE;
/*!40000 ALTER TABLE `rabbit` DISABLE KEYS */;
INSERT INTO `rabbit` VALUES ('0b8a9fb9-4be1-4768-baab-890555a82526','Leo','2023-11-09','Male','2.0','leo.jpg','Rehome',NULL,0),('0f73b598-e88e-424b-9ec3-3e491ec34d6a','Totoro','2022-11-24','Male','1.9','totoro.jpg','Rehome',NULL,100),('683c2003-b553-47f1-9bc1-db8186035acb','Petter','2023-10-05','Male','2.3','petter.jpg',NULL,NULL,0),('754328cd-f03d-43ed-93a0-176f849ca1b9','Pancake','2000-12-05','Female','2.3','Pancake.jpg','Rehome',NULL,200),('7a6f5ef6-a93c-422f-b5d7-6bef9f598939','Lea','2023-10-11','Male','2.1','Lea.jpg','Rehome',NULL,0),('9a0f5e9c-84ff-4c7c-b9cc-fc652ec08f83','Loki','1999-05-26','Male','3','Loki.jpg',NULL,NULL,0),('a2061718-3ca6-469e-b75b-a80c9a6d2241','Harrold','2023-11-09','Male','2.2','harold.jpg','Rehome',NULL,0),('a4d5559f-1031-4c2d-a610-1d503c4bc206','Gerald','2022-10-12','Male','2.4','Gerald.jpg','Rehome',NULL,0),('b042ac6c-a6de-4be4-b81e-05b6ea1aed18','George','2023-10-31','Male','2.1','george.jpg','Rehome',NULL,0);
/*!40000 ALTER TABLE `rabbit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-14 23:05:12
