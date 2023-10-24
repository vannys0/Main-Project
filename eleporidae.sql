-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 07:40 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eleporidae`
--

-- --------------------------------------------------------

--
-- Table structure for table `adoption`
--

CREATE TABLE `adoption` (
  `id` varchar(255) NOT NULL,
  `rabbit_id` varchar(255) NOT NULL,
  `adoption_date` text NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `reason_for_adoption` varchar(200) NOT NULL,
  `other_pets` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_status` varchar(255) NOT NULL,
  `home_environment_image_path` varchar(255) DEFAULT NULL,
  `service_option` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `rabbit_id`, `adoption_date`, `fullname`, `email`, `phone`, `province`, `city`, `barangay`, `postal_code`, `reason_for_adoption`, `other_pets`, `user_id`, `transaction_status`, `home_environment_image_path`, `service_option`) VALUES
('62', '0', '10/24/2023', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', 2147483647, 'Camarines Sur', 'Cabusao', 'Sta. Cruz', 4406, 'Pet', 'none', 0, 'Approved', 'received_435216483919816.jpeg', 'Deliver'),
('b100cf78-89ca-4f6d-9ac8-519db19e3b68', '0', '10/24/2023', 'Francis Bawag', 'bawagfrancis@gmail.com', 2147483647, 'Camarines Sur', 'Cabusao', 'Sta. Cruz', 4406, 'Pet', 'none', 92611, 'Pending', 'received_3558326954240573.jpeg', 'Deliver'),
('cdccb8e2-b83e-424f-9911-8d076492d1f9', 'e66938f5-bf97-4370-bc1a-761005ea0621', '10/24/2023', 'Arjay Manlangit', 'manlangitarjay@gmail.com', 2147483647, 'Camarines Sur', 'Pasacao', 'Balogo', 4407, 'Pet', 'none', 1, 'Pending', 'received_3558326954240573.jpeg', 'Deliver');

-- --------------------------------------------------------

--
-- Table structure for table `breeding_pair`
--

CREATE TABLE `breeding_pair` (
  `id` int(11) NOT NULL,
  `buck_id` int(11) NOT NULL,
  `doe_id` int(11) NOT NULL,
  `pairing_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `breeding_pair`
--

INSERT INTO `breeding_pair` (`id`, `buck_id`, `doe_id`, `pairing_date`) VALUES
(1, 23, 52, '2023-10-16'),
(2, 2, 5, '2023-10-16'),
(3, 1, 2, '2023-10-16'),
(4, 1, 2, '2023-10-16'),
(5, 1, 2, '2023-10-16'),
(6, 1, 2, '2023-10-16');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `message`, `user_id`, `type`) VALUES
(1, 'hello world', 1, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `rabbit`
--

CREATE TABLE `rabbit` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `name`, `age`, `sex`, `weight`, `image_path`, `rehome`) VALUES
('0a3907d1-862d-44d9-811b-f1421d31014f', 'Luna', '9', 'Female', '2.2', '380406889_991333761947340_5705480706998434077_n.jpg', NULL),
('21f765fa-d21a-4e63-9356-af7e1cf079b3', 'Loki and Gina', '9', 'Other', '2.1', '380049148_1714769638992092_5184204807976145661_n.jpg', 'Rehome'),
('5c868551-825b-4e0b-899f-dd00ee9d0819', 'Daisy', '7', 'Female', '1.9', '380502373_1061951088297453_6379436113640909426_n.jpg', NULL),
('6d250a50-c52d-451e-819c-05308733d11f', 'Willow', '7', 'Female', '2.3', '384568249_1039028950558601_930443351806386619_n.jpg', NULL),
('b5aa0eac-7a18-4476-bdf2-05ea99beddba', 'Clover', '10', 'Male', '3', '386866419_866182368415166_824641735645251020_n.jpg', 'Rehome'),
('d0cef2ac-4577-421a-bbb8-a00639111993', 'George', '10', 'Male', '2', '385510364_996745374876198_1520617944626592398_n.jpg', 'Rehome'),
('e33ed0d0-eaac-430e-beb7-b9470b0b27f5', 'Pancake', '10', 'Female', '3.2', '385398170_2818302821642629_5674628126964585107_n.jpg', NULL),
('e66938f5-bf97-4370-bc1a-761005ea0621', 'Totoro', '8', 'Male', '2', '384567738_860532318967961_3155797217690923076_n.jpg', 'Rehome');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `user_type`) VALUES
('1a0df3ed-65f7-4b39-af7b-bc09c48cdc4b', 'Jose Beqiuo', 'josebeqiou@gmail.com', 'jose', 'client'),
('1b4277c9-3d30-4c9f-8561-63eeecf0cb69', 'Arjay Manlangit', 'manlangitarjay@gmail.com', 'arjay', 'client'),
('92611b67-b1be-4d00-bfcd-b4a893504962', 'Francis Bawag', 'bawagfrancis@gmail.com', '1234', 'client'),
('b38b90b3-9ea1-4337-842b-0e95c8086d67', 'Darren Mulleda', 'darrenmulleda@gmail.com', 'mulleda', 'client'),
('d239ef1a-721e-11ee-b403-94de80265f1f', 'Leonardo Nogra', 'leonardo@gmail.com', 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoption`
--
ALTER TABLE `adoption`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding_pair`
--
ALTER TABLE `breeding_pair`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rabbit`
--
ALTER TABLE `rabbit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `breeding_pair`
--
ALTER TABLE `breeding_pair`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
