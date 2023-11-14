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
-- Table structure for table `adoption`
--

DROP TABLE IF EXISTS `adoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoption` (
  `id` varchar(255) NOT NULL,
  `rabbit_id` varchar(255) NOT NULL,
  `adoption_date` date NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `reason_for_adoption` varchar(200) NOT NULL,
  `other_pets` varchar(200) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `transaction_status` varchar(255) NOT NULL,
  `home_environment_image_path` varchar(255) DEFAULT NULL,
  `service_option` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `price` double DEFAULT '0',
  `mode_of_payment` varchar(255) DEFAULT NULL,
  `agriculture_product` varchar(255) DEFAULT NULL,
  `agriculture_product_price` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption`
--

LOCK TABLES `adoption` WRITE;
/*!40000 ALTER TABLE `adoption` DISABLE KEYS */;
INSERT INTO `adoption` VALUES ('245648ae-02ce-403f-a581-49e4af563cdb','7a6f5ef6-a93c-422f-b5d7-6bef9f598939','2023-05-10','Cynthia Lorio','cynthialorio@gmail.com','09522505618','CAMARINES SUR','SIPOCOT','South Centro (Pob.)','Pet','','f75cbbc5-6479-4add-83e2-6ca52e93f882','Approved','santol.jpg','Deliver','Approved',NULL,NULL,NULL,NULL,NULL),('41a2d427-cd8b-423e-9d7b-806f2cc83571','0b8a9fb9-4be1-4768-baab-890555a82526','2023-11-10','Ivan Bengcolado','ivanpaglinawan0@gmail.com','0948','CAMARINES SUR','CABUSAO','Santa Cruz','Another','','6226702d-125e-4c1d-973b-994c76bf52a3','Declined','banana.jpg','Pick up',NULL,'incomplete requirements',NULL,NULL,NULL,NULL),('66d50eb1-5847-42ba-b090-1423bcfade50','a4d5559f-1031-4c2d-a610-1d503c4bc206','2023-08-10','Ivan Bengcolado','ivanpaglinawan0@gmail.com','09482048756','CAMARINES SUR','CABUSAO','Santa Cruz','Pet','','6226702d-125e-4c1d-973b-994c76bf52a3','Approved','santol.jpg','Deliver',NULL,NULL,NULL,NULL,NULL,NULL),('83579447-13ac-42d1-a928-0a8b937e61de','754328cd-f03d-43ed-93a0-176f849ca1b9','2023-10-14','Pancake','','09876543212','CAMARINES SUR','CABUSAO','Santa Lutgarda (Pob.)','Rabbits live a long time','i like it','6226702d-125e-4c1d-973b-994c76bf52a3','Pending','home.jpg','Pick up',NULL,NULL,200,'Agriculture','chicken',250),('8b5ed4bc-04ff-45e0-b00b-984e8145c394','754328cd-f03d-43ed-93a0-176f849ca1b9','2023-11-10','Francis Bawag','francisbawag@gmail.com','09815808362','CAMARINES SUR','SIPOCOT','Impig','Pet','','f0a9b912-a774-4219-badd-c0a9c5317d5d','Pending','santol.jpg','Deliver',NULL,NULL,50,NULL,NULL,NULL),('9e6657c2-0a02-47e0-bf0d-475299cffbc3','0b8a9fb9-4be1-4768-baab-890555a82526','2023-08-10','Cynthia Lorio','cynthialorio@gmail.com','09485521044','CAMARINES SUR','SIPOCOT','South Centro (Pob.)','Pet','','f75cbbc5-6479-4add-83e2-6ca52e93f882','Pending','santol.jpg','Deliver',NULL,NULL,NULL,NULL,NULL,NULL),('cb13a3c5-434a-488e-a211-c638a2be4b93','7a6f5ef6-a93c-422f-b5d7-6bef9f598939','2023-11-10','Francis Bawag','francisbawag@gmail.com','09252886320','CAMARINES SUR','SIPOCOT','Impig','Pet','','f0a9b912-a774-4219-badd-c0a9c5317d5d','Approved','banana.jpg','Deliver',NULL,NULL,NULL,NULL,NULL,NULL),('d415fdda-4b4c-49e2-a1fe-3ae86e9e9608','a2061718-3ca6-469e-b75b-a80c9a6d2241','2023-11-10','Ivan Bengcolado','ivanpaglinawan0@gmail.com','09482048756','CAMARINES SUR','CABUSAO','Santa Cruz','Pet','','6226702d-125e-4c1d-973b-994c76bf52a3','Pending','banana.jpg','Deliver',NULL,NULL,NULL,NULL,NULL,NULL),('d844155e-859c-4057-946a-77ceaea099dd','0f73b598-e88e-424b-9ec3-3e491ec34d6a','2023-11-14','Totoro','','09876543212','CAMARINES SUR','CANAMAN','Mangayawan','Rabbits are inexpensive','ooo','6226702d-125e-4c1d-973b-994c76bf52a3','Pending','home.jpg','Deliver',NULL,NULL,100,'Agriculture','horse',120);
/*!40000 ALTER TABLE `adoption` ENABLE KEYS */;
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
