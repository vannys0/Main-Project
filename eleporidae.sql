-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2023 at 04:34 PM
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
  `user_id` varchar(255) NOT NULL,
  `rabbit_id` varchar(255) NOT NULL,
  `adoption_date` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `reason_for_adoption` varchar(200) NOT NULL,
  `other_pets` varchar(200) NOT NULL,
  `adoption_status` varchar(255) NOT NULL,
  `home_environment_image_path` varchar(255) DEFAULT NULL,
  `service_option` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `mode_of_payment` varchar(255) DEFAULT NULL,
  `agriculture_product` varchar(255) DEFAULT NULL,
  `agriculture_product_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `user_id`, `rabbit_id`, `adoption_date`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `adoption_status`, `home_environment_image_path`, `service_option`, `delivery_status`, `comment`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES
('a2147255-3da6-4249-a1b3-5c7cb64ee089', '6226702d-125e-4c1d-973b-994c76bf52a3', '5eee1b09-4841-45a9-bce2-ffc484436760', '2023-12-13', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are a great pet', '', 'Approved', 'Gantt chart - eLeporidae (3).png', 'Deliver', 'Approved', NULL, 350, 'Cash', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `breeding_pair`
--

CREATE TABLE `breeding_pair` (
  `id` varchar(255) NOT NULL,
  `buck_id` varchar(255) NOT NULL,
  `doe_id` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `pairing_date` date DEFAULT NULL,
  `expected_due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `breeding_pair`
--

INSERT INTO `breeding_pair` (`id`, `buck_id`, `doe_id`, `note`, `pairing_date`, `expected_due_date`) VALUES
('dbb32ecb-5a7a-4bbe-86d2-ecc52b820c68', '40f87a68-9c15-4d08-9164-225102ce652a', '4bde3adb-0370-4724-9b42-25be2c25a64b', 'L&Ch', '2023-12-13', '2024-01-14');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rabbit`
--

CREATE TABLE `rabbit` (
  `id` varchar(255) NOT NULL,
  `breeding_pair_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `sex` varchar(255) NOT NULL,
  `rabbit_type` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `breed_type` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome_status` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `is_adopted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `breeding_pair_id`, `name`, `date_of_birth`, `sex`, `rabbit_type`, `color`, `breed_type`, `weight`, `image_path`, `rehome_status`, `price`, `is_adopted`) VALUES
('40f87a68-9c15-4d08-9164-225102ce652a', NULL, 'Chingkong', '2023-12-08', 'Male', 'Pet rabbit', 'Black', 'American', '1.4', 'âPngtreeârabbit_3644555.png', NULL, 300, 0),
('4bde3adb-0370-4724-9b42-25be2c25a64b', NULL, 'Lea', '2023-06-29', 'Female', 'Meat rabbit', 'Tan', 'Flemish Giant', '2', 'Lea.jpg', NULL, 350, 0),
('5eee1b09-4841-45a9-bce2-ffc484436760', '5f858901-5391-4860-bd5c-06e7337ce8dc', 'AME-BEV', '2023-12-11', 'Male', 'Pet rabbit', 'Fawn', 'American-Beveren', '2', 'Lea.jpg', 'Rehome', 350, 1),
('982878d3-399d-41d9-95e8-5524e16a1393', '97f53b50-e34b-4011-a2b2-a382ee5e4db0', 'Akif', '2023-12-09', 'Male', 'Pet rabbit', 'Tan', 'French Lop-Flemish Giant', '1.2', 'harold.jpg', 'Rehome', 350, 0),
('a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', NULL, 'Gerald', '2023-07-02', 'Male', 'Pet rabbit', 'Sooty', 'French Lop', '2', 'Gerald.jpg', 'Rehome', 300, 0),
('cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', NULL, 'Georgia', '2023-06-27', 'Female', 'Pet rabbit', 'Black', 'Beveren', '1.7', 'george.jpg', 'Rehome', 300, 0),
('cc9d8b5f-d8dc-4928-a34c-698f44125a0e', NULL, 'Pancake', '2023-07-02', 'Female', 'Pet rabbit', 'White', 'American', '1.6', 'Pancake.jpg', 'Rehome', 400, 0),
('f8c9097c-5117-450e-bb69-760d3fb249dd', NULL, 'Leo', '2023-07-09', 'Male', 'Pet rabbit', 'White', 'Beveren', '2', 'leo.jpg', 'Rehome', 350, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `adoption_id` varchar(255) NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `adoption_id`, `transaction_date`, `transaction_status`) VALUES
('08dc8995-9df1-48f7-ba1b-c87285bd81d1', 'a2147255-3da6-4249-a1b3-5c7cb64ee089', '2023-12-13', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `otp` int(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `user_type`, `profile`, `otp`, `is_verified`) VALUES
('6226702d-125e-4c1d-973b-994c76bf52a3', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '1234', 'client', 'âPngtreeârabbit_3644555.png', 5420, 1),
('d09a9d2d-0984-4fda-8476-52a56a6cf484', 'Leonardo Nogra', 'leonardo@gmail.com', 'admin', 'admin', NULL, NULL, 0),
('dc63f09f-f4c6-4bce-b73b-f83d64746ee1', 'Ivan', 'ivanpaglinawan00@gmail.com', 'zsdcas', 'client', NULL, NULL, 0),
('effbe5b7-9757-4bfb-b6b9-2e5f170c6787', 'Cynthia Lorio', 'cynthialorio08@gmail.com', '1234', 'client', NULL, 7856, 1),
('f0a9b912-a774-4219-badd-c0a9c5317d5d', 'Francis Bawag', 'francisbawag@gmail.com', '1234', 'client', NULL, NULL, 1);

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
-- Indexes for table `rabbit`
--
ALTER TABLE `rabbit`
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
