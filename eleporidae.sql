-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 02:18 AM
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
  `delivery_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `rabbit_id`, `adoption_date`, `fullname`, `email`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `user_id`, `transaction_status`, `home_environment_image_path`, `service_option`, `delivery_status`) VALUES
('245648ae-02ce-403f-a581-49e4af563cdb', '7a6f5ef6-a93c-422f-b5d7-6bef9f598939', '2023-05-10', 'Cynthia Lorio', 'cynthialorio@gmail.com', '09522505618', 'CAMARINES SUR', 'SIPOCOT', 'South Centro (Pob.)', 'Pet', '', 'f75cbbc5-6479-4add-83e2-6ca52e93f882', 'Approved', 'santol.jpg', 'Deliver', NULL),
('41a2d427-cd8b-423e-9d7b-806f2cc83571', '0b8a9fb9-4be1-4768-baab-890555a82526', '2023-11-10', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '0948', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Another', '', '6226702d-125e-4c1d-973b-994c76bf52a3', 'Pending', 'banana.jpg', 'Pick up', NULL),
('66d50eb1-5847-42ba-b090-1423bcfade50', 'a4d5559f-1031-4c2d-a610-1d503c4bc206', '2023-08-10', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Pet', '', '6226702d-125e-4c1d-973b-994c76bf52a3', 'Approved', 'santol.jpg', 'Deliver', NULL),
('8b5ed4bc-04ff-45e0-b00b-984e8145c394', '754328cd-f03d-43ed-93a0-176f849ca1b9', '2023-11-10', 'Francis Bawag', 'francisbawag@gmail.com', '09815808362', 'CAMARINES SUR', 'SIPOCOT', 'Impig', 'Pet', '', 'f0a9b912-a774-4219-badd-c0a9c5317d5d', 'Pending', 'santol.jpg', 'Deliver', NULL),
('9e6657c2-0a02-47e0-bf0d-475299cffbc3', '0b8a9fb9-4be1-4768-baab-890555a82526', '2023-08-10', 'Cynthia Lorio', 'cynthialorio@gmail.com', '09485521044', 'CAMARINES SUR', 'SIPOCOT', 'South Centro (Pob.)', 'Pet', '', 'f75cbbc5-6479-4add-83e2-6ca52e93f882', 'Pending', 'santol.jpg', 'Deliver', NULL),
('cb13a3c5-434a-488e-a211-c638a2be4b93', '7a6f5ef6-a93c-422f-b5d7-6bef9f598939', '2023-11-10', 'Francis Bawag', 'francisbawag@gmail.com', '09252886320', 'CAMARINES SUR', 'SIPOCOT', 'Impig', 'Pet', '', 'f0a9b912-a774-4219-badd-c0a9c5317d5d', 'Approved', 'banana.jpg', 'Deliver', NULL),
('d415fdda-4b4c-49e2-a1fe-3ae86e9e9608', 'a2061718-3ca6-469e-b75b-a80c9a6d2241', '2023-11-10', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Pet', '', '6226702d-125e-4c1d-973b-994c76bf52a3', 'Pending', 'banana.jpg', 'Deliver', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `breeding_pair`
--

CREATE TABLE `breeding_pair` (
  `id` int(11) NOT NULL,
  `buck_id` varchar(255) NOT NULL,
  `doe_id` varchar(255) NOT NULL,
  `pairing_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `date_of_birth` date NOT NULL,
  `sex` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `name`, `date_of_birth`, `sex`, `weight`, `image_path`, `rehome_status`) VALUES
('0b8a9fb9-4be1-4768-baab-890555a82526', 'Leo', '2023-11-09', 'Male', '2.0', 'leo.jpg', 'Rehome'),
('0f73b598-e88e-424b-9ec3-3e491ec34d6a', 'Totoro', '2022-11-24', 'Male', '1.9', 'totoro.jpg', 'Rehome'),
('683c2003-b553-47f1-9bc1-db8186035acb', 'Petter', '2023-10-05', 'Male', '2.3', 'petter.jpg', NULL),
('754328cd-f03d-43ed-93a0-176f849ca1b9', 'Pancake', '2000-12-05', 'Female', '2.3', 'Pancake.jpg', 'Rehome'),
('7a6f5ef6-a93c-422f-b5d7-6bef9f598939', 'Lea', '2023-10-11', 'Male', '2.1', 'Lea.jpg', 'Rehome'),
('9a0f5e9c-84ff-4c7c-b9cc-fc652ec08f83', 'Loki', '1999-05-26', 'Male', '3', 'Loki.jpg', NULL),
('a2061718-3ca6-469e-b75b-a80c9a6d2241', 'Harrold', '2023-11-09', 'Male', '2.2', 'harold.jpg', 'Rehome'),
('a4d5559f-1031-4c2d-a610-1d503c4bc206', 'Gerald', '2022-10-12', 'Male', '2.4', 'Gerald.jpg', 'Rehome'),
('b042ac6c-a6de-4be4-b81e-05b6ea1aed18', 'George', '2023-10-31', 'Male', '2.1', 'george.jpg', 'Rehome');

-- --------------------------------------------------------

--
-- Table structure for table `rabbit_sales`
--

CREATE TABLE `rabbit_sales` (
  `id` int(11) NOT NULL,
  `amount` int(255) NOT NULL,
  `transaction_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit_sales`
--

INSERT INTO `rabbit_sales` (`id`, `amount`, `transaction_date`) VALUES
(1, 300, '2023-11-08'),
(2, 350, '2023-11-08'),
(3, 250, '2023-11-09'),
(4, 320, '2023-11-09'),
(5, 300, '2023-11-10'),
(6, 350, '2023-11-10'),
(7, 280, '2023-11-10'),
(8, 300, '2023-11-10'),
(9, 280, '2023-07-10'),
(10, 300, '2023-07-10'),
(11, 280, '2023-08-10'),
(12, 280, '2023-09-10');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `adoption_id` varchar(255) NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_status` varchar(255) NOT NULL,
  `transaction_fee` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('6226702d-125e-4c1d-973b-994c76bf52a3', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '1234', 'client'),
('d09a9d2d-0984-4fda-8476-52a56a6cf484', 'Leonardo Nogra', 'leonardo@gmail.com', 'admin', 'admin'),
('f0a9b912-a774-4219-badd-c0a9c5317d5d', 'Francis Bawag', 'francisbawag@gmail.com', '1234', 'client'),
('f75cbbc5-6479-4add-83e2-6ca52e93f882', 'Cynthia Lorio', 'cynthialorio@gmail.com', '1234', 'client');

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
-- Indexes for table `rabbit_sales`
--
ALTER TABLE `rabbit_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rabbit_sales`
--
ALTER TABLE `rabbit_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
