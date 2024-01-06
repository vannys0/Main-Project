-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 09:05 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `user_id`, `rabbit_id`, `adoption_date`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `adoption_status`, `home_environment_image_path`, `service_option`, `delivery_status`, `comment`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES
('adoption149377', 'user167491', 'rabbit119521', '2024-01-06', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are a great pet', '', 'Approved', 'Gantt chart - eLeporidae.jpeg', 'Deliver', 'Approved', NULL, 350, 'Cash', '', 0),
('adoption359704', 'user167491', 'rabbit375996', '2024-01-06', '09815808362', 'CAMARINES SUR', 'CABUSAO', 'Santa Lutgarda (Pob.)', 'Rabbits are inexpensive', '', 'Approved', 'Gantt chart - eLeporidae.jpeg', 'Deliver', 'Approved', NULL, 450, 'Cash', '', 0),
('adoption449436', 'user167491', 'rabbit441541', '2024-01-06', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits live a long time', '', 'Approved', 'Gantt chart - eLeporidae.jpeg', 'Deliver', 'Approved', NULL, 400, 'Cash', '', 0),
('adoption500411', 'user167491', 'rabbit332716', '2024-01-06', '09815808362', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are inexpensive', '', 'Approved', 'Gantt chart - eLeporidae.jpeg', 'Deliver', 'Approved', NULL, 450, 'Cash', '', 0),
('adoption589197', 'user167491', 'rabbit375996', '2024-01-06', '09815808362', 'CAMARINES SUR', 'CABUSAO', 'Santa Lutgarda (Pob.)', 'Rabbits are inexpensive', '', 'Approved', 'Gantt chart - eLeporidae.jpeg', 'Deliver', 'Approved', NULL, 450, 'Cash', '', 0);

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
('pair345236', 'rabbit441541', 'rabbit375996', 'Petter$Pancake', '2023-10-14', '2024-01-15'),
('pair529569', 'rabbit215324', 'rabbit320950', 'bbbbbb', '2024-01-06', '2024-02-07'),
('pair535312', 'rabbit346045', 'rabbit320950', 'Yes', '2024-01-06', '2024-02-07'),
('pair580280', 'rabbit441541', 'rabbit375996', 'gg', '2024-01-02', '2024-02-03'),
('pair878278', 'rabbit884171', 'rabbit470950', 'Lea$George', '2023-12-14', '2024-01-15'),
('pair988941', 'rabbit357444', 'rabbit375996', 'rftg', '2023-12-31', '2024-02-01');

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
('rabbit119521', NULL, 'Totoro', '2023-02-23', 'Male', 'Pet rabbit', 'Fawn', 'Beveren', '1.4', 'totoro.jpg', 'Rehome', 350, 1),
('rabbit149972', 'pair345236', 'French-Bev', '2023-12-22', 'Male', 'Pet rabbit', 'Tan', 'French Lop-Beveren', '1.5', 'Lea.jpg', 'Rehome', 400, 0),
('rabbit166339', NULL, 'Pancsssss', '2023-12-23', 'Female', 'Pet rabbit', 'Agouti', 'American', '1.1', 'Pancake.jpg', 'Rehome', 450, 0),
('rabbit215324', 'pair345236', 'Male', '2024-01-02', 'Male', 'Pet rabbit', 'Tan', 'French Lop-Beveren', '1', 'Loki.jpg', 'Rehome', 350, 0),
('rabbit320950', 'pair345236', 'Female', '2024-01-01', 'Female', 'Pet rabbit', 'Tan', 'French Lop-Beveren', '1', 'Lea.jpg', 'Rehome', 350, 0),
('rabbit332716', NULL, 'Harrold', '2022-12-07', 'Male', 'Pet rabbit', 'Brown', 'American', '1.3', 'harold.jpg', 'Rehome', 450, 1),
('rabbit335156', NULL, 'Lokkss', '2023-12-23', 'Male', 'Pet rabbit', 'Brown', 'Belgian Hare', '1', 'Loki.jpg', 'Rehome', 0, 0),
('rabbit346045', NULL, 'Loki', '2023-05-26', 'Male', 'Pet rabbit', 'Black', 'American', '1.5', 'Loki.jpg', 'Rehome', 400, 0),
('rabbit357444', NULL, 'Testsssssttttttttttttttttttt', '2023-12-13', 'Male', 'Pet rabbit', 'Brown', 'American', '2', 'Loki.jpg,Pancake.jpg,Gerald.jpg', NULL, 0, 0),
('rabbit360052', NULL, 'Gerald', '2023-01-04', 'Male', 'Pet rabbit', 'Fawn', 'Britannia Petite', '1.7', 'Gerald.jpg', 'Rehome', 350, 0),
('rabbit375996', NULL, 'Pancake', '2023-03-06', 'Female', 'Pet rabbit', 'Sooty', 'Beveren', '1.8', 'Pancake.jpg', 'Rehome', 450, 1),
('rabbit441541', NULL, 'Petter', '2023-03-15', 'Male', 'Pet rabbit', 'Agouti', 'French Lop', '1.2', 'petter.jpg', 'Rehome', 400, 1),
('rabbit470950', NULL, 'Lea', '2023-02-21', 'Female', 'Pet rabbit', 'Sooty', 'Havana', '1.5', 'Lea.jpg', 'Rehome', 400, 1),
('rabbit505640', NULL, 'Geregg', '2023-12-23', 'Male', 'Pet rabbit', 'Chinchilla', 'Belgian Hare', '1.2', 'Gerald.jpg', NULL, 0, 0),
('rabbit571815', NULL, 'Tootsssss', '2023-12-23', 'Male', 'Pet rabbit', 'Tan', 'Checkered Giant', '1.3', 'totoro.jpg', NULL, 0, 0),
('rabbit581715', NULL, 'Pettssss', '2023-12-23', 'Male', 'Pet rabbit', 'Tan', 'American', '1.2', 'petter.jpg', NULL, 0, 0),
('rabbit844637', NULL, 'Leo', '2023-06-21', 'Male', 'Pet rabbit', 'Tan', 'French Lop', '1.4', 'leo.jpg', 'Rehome', 400, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `adoption_id`, `transaction_date`, `transaction_status`, `proof_picture_path`) VALUES
('transaction200887', 'adoption359704', '2024-01-06', 'Completed', 'Part1.png'),
('transaction222204', 'adoption500411', '2024-01-06', 'Completed', NULL),
('transaction377043', 'adoption449436', '2024-01-06', 'Completed', NULL),
('transaction690299', 'adoption589197', '2024-01-06', 'Completed', 'e-Leporidae.jpeg'),
('transaction797750', 'adoption149377', '2024-01-06', 'Completed', NULL);

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
('user167491', 'Ivan Paglinawan', 'ivanpaglinawan0@gmail.com', '1234', 'client', 'Gantt chart - eLeporidae (3).png', 991957, 1),
('user635882', 'Leonardo Nogra', 'leonardo@gmail.com', 'admin', 'admin', 'âPngtreeârabbit_3644555.png', NULL, 1),
('user916124', 'Hash', 'hash@gmail.com', '$2b$10$EhWIKqSw3iLqQ', 'admin', NULL, NULL, 0);

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
