-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2024 at 02:42 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
  `other_pets` varchar(200) DEFAULT NULL,
  `adoption_status` varchar(255) NOT NULL,
  `home_environment_image_path` varchar(255) DEFAULT NULL,
  `service_option` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `mode_of_payment` varchar(255) DEFAULT NULL,
  `agriculture_product` varchar(255) DEFAULT NULL,
  `agriculture_product_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `user_id`, `rabbit_id`, `adoption_date`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `adoption_status`, `home_environment_image_path`, `service_option`, `delivery_status`, `comment`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES
('adoption153289', 'user186077', 'rabbit357444', '2024-01-14', '09154169252', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are a great pet', '', 'Declined', 'Tootsssss_QRCode.png', 'Deliver', NULL, NULL, -7, 'Cash', '', 0),
('adoption796392', 'user390405', 'rabbit357444', '2024-01-14', '09154169252', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits live a long time', '', 'Approved', 'Tootsssss_QRCode.png', 'Deliver', NULL, NULL, -7, 'Cash', '', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `breeding_pair`
--

INSERT INTO `breeding_pair` (`id`, `buck_id`, `doe_id`, `note`, `pairing_date`, `expected_due_date`) VALUES
('pair508155', 'rabbit101874', 'rabbit481631', 'Yocky and Lexie', '2024-01-15', '2024-02-16'),
('pair977431', 'rabbit166339', 'rabbit571815', 'Tan and Pancake', '2024-01-15', '2024-02-16');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `is_adopted` tinyint(1) NOT NULL,
  `date_added` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `breeding_pair_id`, `name`, `date_of_birth`, `sex`, `rabbit_type`, `color`, `breed_type`, `weight`, `image_path`, `rehome_status`, `price`, `is_adopted`, `date_added`) VALUES
('rabbit101874', NULL, 'Yocky', '2023-04-03', 'Male', 'Pet rabbit', 'Gray', 'Unkown', '1', 'yocky.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit113538', NULL, 'Buns', '2022-08-10', 'Male', 'Pet rabbit', 'White', 'Dutch', '4.8', 'buns.jpg', 'Rehome', 450, 0, '2024-01-15'),
('rabbit128373', NULL, 'Jojie and Hansel', '2023-07-02', 'Other', 'Pet rabbit', 'Other', 'Dutch', '3.4', 'jojie.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit224028', NULL, 'Bea', '2023-05-09', 'Female', 'Pet rabbit', 'Gray', 'Dutch', '3.1', 'bea.jpg', 'Rehome', 450, 0, '2024-01-15'),
('rabbit234859', NULL, 'Bonn', '2023-01-06', 'Male', 'Pet rabbit', 'Other', 'Unkown', '4.9', 'bon.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit238053', NULL, 'Melai', '2023-06-26', 'Female', 'Pet rabbit', 'White', 'Dutch', '3.2', 'melai.jpg', 'Rehome', 500, 0, '2024-01-15'),
('rabbit254871', NULL, 'Leo', '2023-08-29', 'Male', 'Pet rabbit', 'Brown', 'Dutch', '1.5', 'leo.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit263010', NULL, 'Jake', '2023-10-11', 'Male', 'Pet rabbit', 'Other', 'Californian', '4.9', 'jake.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit293170', NULL, 'Jojie', '2023-07-30', 'Male', 'Pet rabbit', 'Brown', 'Dutch', '2.5', 'jejie.jpg', 'Rehome', 500, 0, '2024-01-15'),
('rabbit333371', NULL, 'Dwel', '2023-06-21', 'Male', 'Pet rabbit', 'Black', 'Californian', '2.6', 'dwel.jpg', 'Rehome', 450, 0, '2024-01-15'),
('rabbit397085', NULL, 'Tristan', '2023-05-25', 'Male', 'Pet rabbit', 'White', 'Unkown', '1.1', 'tristan.jpg', 'Rehome', 500, 0, '2024-01-15'),
('rabbit417274', NULL, 'Pea', '2023-09-01', 'Female', 'Pet rabbit', 'Brown', 'Californian', '1.1', 'pea.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit437857', NULL, 'Cy', '2023-08-17', 'Female', 'Pet rabbit', 'Brown', 'Unkown', '2.1', 'cy.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit481631', NULL, 'Lexie', '2023-03-31', 'Female', 'Pet rabbit', 'Fawn', 'Dutch', '4.2', 'lexie.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit568965', NULL, 'Totoro', '2023-07-04', 'Male', 'Pet rabbit', 'Tan', 'New Zealand (Red, White, Black)', '1', 'totoro.jpg', 'Rehome', 450, 0, '2024-01-15'),
('rabbit586550', NULL, 'Harrold', '2023-09-06', 'Male', 'Pet rabbit', 'Gray', 'Unkown', '2.4', 'harrold.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit643070', NULL, 'James', '2022-12-07', 'Male', 'Pet rabbit', 'White', 'Unkown', '4.9', 'james.jpg', 'Rehome', 500, 0, '2024-01-15'),
('rabbit643674', NULL, 'Yogu', '2023-06-12', 'Male', 'Pet rabbit', 'Black', 'Californian', '3.8', 'jogu.jpg', 'Rehome', 350, 0, '2024-01-15'),
('rabbit662271', NULL, 'Clay', '2023-07-20', 'Male', 'Pet rabbit', 'White', 'Unkown', '2.2', 'clay.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit672691', NULL, 'Golden', '2023-09-05', 'Male', 'Pet rabbit', 'White', 'Dutch', '1.2', 'golden.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit674540', NULL, 'Bogs', '2022-10-04', 'Male', 'Pet rabbit', 'White', 'Unkown', '5', 'bogs.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit689240', NULL, 'Hannah', '2023-11-05', 'Female', 'Pet rabbit', 'White', 'Californian', '1', 'hanna.jpg', 'Rehome', 400, 0, '2024-01-15'),
('rabbit701277', NULL, 'James', '2023-01-02', 'Male', 'Pet rabbit', 'White', 'Californian', '4.1', 'james.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit715868', NULL, 'Mamot', '2023-09-05', 'Male', 'Pet rabbit', 'Gray', 'Californian', '1.9', 'mamot.jpg', 'Rehome', 350, 0, '2024-01-15'),
('rabbit744477', NULL, 'Charl', '2023-09-11', 'Male', 'Pet rabbit', 'Brown', 'Unkown', '2.6', 'charl.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit789762', NULL, 'Joe', '2023-10-31', 'Male', 'Pet rabbit', 'White', 'Californian', '1.1', 'joe.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit810616', NULL, 'Charley', '2022-10-21', 'Male', 'Pet rabbit', 'Other', 'Dutch', '4.8', 'charley.jpg', 'Rehome', 500, 0, '2024-01-15'),
('rabbit853417', NULL, 'Mar', '2023-04-30', 'Male', 'Pet rabbit', 'White', 'Dutch', '3.5', 'mar.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit951398', NULL, 'Jejie', '2022-10-03', 'Female', 'Pet rabbit', 'Brown', 'Dutch', '2.1', 'jejie.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit963752', NULL, 'Pancake', '2023-07-04', 'Male', 'Pet rabbit', 'White', 'Californian', '2.5', 'pancake.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit993205', NULL, 'Dutch', '2023-07-04', 'Male', 'Pet rabbit', 'White', 'Dutch', '2.3', 'dutch.jpg', NULL, 0, 0, '2024-01-15'),
('rabbit996678', NULL, 'Lea', '2023-04-12', 'Female', 'Pet rabbit', 'Black', 'Californian', '2.6', 'lea.jpg', NULL, 0, 0, '2024-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `adoption_id` varchar(255) NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  `proof_picture_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `otp` int(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `user_type`, `profile`, `otp`, `is_verified`) VALUES
('user115861', 'Leonardo Nogra', 'leonardonogra6@gmail.com', 'admin', 'admin', NULL, NULL, 0),
('user719207', 'Ivan Bengcolado', 'ivanbengcolado@gmail.com', '$2b$10$tpo4/yh9b64xy/EMmbme0u9W2ek8cgcHqRjhOqdx0RMTwzeFkLEKO', 'client', NULL, 981180, 1);

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
