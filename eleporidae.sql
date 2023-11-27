-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 02:44 AM
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
  `transaction_status` varchar(255) NOT NULL,
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

INSERT INTO `adoption` (`id`, `user_id`, `rabbit_id`, `adoption_date`, `phone`, `province`, `city`, `barangay`, `reason_for_adoption`, `other_pets`, `transaction_status`, `home_environment_image_path`, `service_option`, `delivery_status`, `comment`, `price`, `mode_of_payment`, `agriculture_product`, `agriculture_product_price`) VALUES
('0a63e94d-c92b-435c-be19-c4c2daa387fe', 'f75cbbc5-6479-4add-83e2-6ca52e93f882', '05adc176-a5ec-4547-b1a4-8a9bead9cc62', '2023-11-27', '09123456789', 'CAMARINES SUR', 'SIPOCOT', 'South Centro (Pob.)', 'Adaptability to indoor living', '', 'Approved', 'Gantt chart - eLeporidae (2).png', 'Deliver', NULL, NULL, 350, 'Cash', '', 0),
('0e6485ad-5341-46b3-b516-cfe76b326e07', '6226702d-125e-4c1d-973b-994c76bf52a3', '3abe5868-49fe-49cc-a691-17e5dc0ffa15', '2023-11-27', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Quiet and gentle nature', '', 'Approved', 'Gantt chart - eLeporidae (2).png', 'Deliver', 'Approved', NULL, 0, 'Cash', '', 0),
('11aca217-d7aa-48a5-9474-c361109eca3e', 'f75cbbc5-6479-4add-83e2-6ca52e93f882', 'f8c9097c-5117-450e-bb69-760d3fb249dd', '2023-11-27', '09874561236', 'CAMARINES SUR', 'SIPOCOT', 'South Centro (Pob.)', 'Rabbits are a great pet', '', 'Approved', 'Gantt chart - eLeporidae (2).png', 'Deliver', NULL, NULL, 350, 'Cash', '', 0),
('2c80b670-6ee8-4dc7-8f7a-4725f20bb735', '6226702d-125e-4c1d-973b-994c76bf52a3', 'efe375f0-4e11-4265-9cd3-e1511cdfb4b7', '2023-11-27', '09482048756', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are a great pet', '', 'Pending', 'Gantt chart - eLeporidae (2).png', 'Pick up', NULL, NULL, 250, 'Cash', '', 0),
('96af9d55-2b13-4921-aba1-1a018bdd3f01', 'f0a9b912-a774-4219-badd-c0a9c5317d5d', '27e434e0-2763-4f11-ad74-1a97b362a75a', '2023-11-27', '09486571335', 'CAMARINES SUR', 'SIPOCOT', 'Impig', 'Quiet and gentle nature', 'none', 'Declined', 'Gantt chart - eLeporidae (2).png', 'Deliver', NULL, 'Incomplete', 300, 'Cash', '', 0),
('bc41d7f9-dc86-4d6c-8e48-eb00b0184f88', '6226702d-125e-4c1d-973b-994c76bf52a3', '4bde3adb-0370-4724-9b42-25be2c25a64b', '2023-11-27', '09815808362', 'CAMARINES SUR', 'CABUSAO', 'Santa Cruz', 'Rabbits are inexpensive', '', 'Pending', 'Gantt chart - eLeporidae (2).png', 'Deliver', NULL, NULL, 350, 'Agriculture', 'Palay', 300),
('fe8834c1-ca6b-48a5-84e4-791b1f40c815', 'f0a9b912-a774-4219-badd-c0a9c5317d5d', 'cc9d8b5f-d8dc-4928-a34c-698f44125a0e', '2023-11-27', '09810251123', 'CAMARINES SUR', 'SIPOCOT', 'Impig', 'Rabbits are a great pet', '', 'Pending', 'Gantt chart - eLeporidae (2).png', 'Deliver', NULL, NULL, 0, 'Agriculture', 'Palay', 348);

-- --------------------------------------------------------

--
-- Table structure for table `breeding_pair`
--

CREATE TABLE `breeding_pair` (
  `id` varchar(255) NOT NULL,
  `buck_id` varchar(255) NOT NULL,
  `doe_id` varchar(255) NOT NULL,
  `pairing_date` date DEFAULT NULL,
  `expected_due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `breeding_pair`
--

INSERT INTO `breeding_pair` (`id`, `buck_id`, `doe_id`, `pairing_date`, `expected_due_date`) VALUES
('0c3bb097-ad6a-40a3-a231-5743372a9142', 'a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', '2023-11-27', '2023-12-29'),
('1e018426-4985-4960-98f8-aff647c84ffe', 'a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', '2023-11-27', '2023-12-29'),
('66ac5077-d0ee-455c-85bc-e79ec28329c5', 'a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', '2023-11-26', '2023-12-26'),
('9cc29ecf-f319-4e4d-851c-3e5bfc354096', 'a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', '2023-11-27', '2023-12-29'),
('c17a8594-b453-464f-9b15-bfd7d89a9f9d', 'a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', '2023-11-26', '2023-12-28');

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
  `date_of_birth` date DEFAULT NULL,
  `sex` varchar(255) NOT NULL,
  `rabbit_type` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `breed_type` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome_status` varchar(255) DEFAULT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `name`, `date_of_birth`, `sex`, `rabbit_type`, `color`, `breed_type`, `weight`, `image_path`, `rehome_status`, `price`) VALUES
('05adc176-a5ec-4547-b1a4-8a9bead9cc62', 'Pancake and Harrold', '2023-06-01', 'Other', 'Pet rabbit', 'Tan', 'American', '2', 'Loki.jpg,Pancake.jpg,Gerald.jpg', 'Rehome', 350),
('27e434e0-2763-4f11-ad74-1a97b362a75a', 'Totoro', '2022-12-06', 'Male', 'Pet rabbit', 'Brown', 'Havana', '2', 'totoro.jpg', 'Rehome', 300),
('3abe5868-49fe-49cc-a691-17e5dc0ffa15', 'Trying', '2023-04-02', 'Male', 'Pet rabbit', 'Chinchilla', 'Britannia Petite', '2', 'Leo_QRCode.png', 'Rehome', 0),
('4bde3adb-0370-4724-9b42-25be2c25a64b', 'Lea', '2023-07-01', 'Female', 'Pet rabbit', 'Fawn', 'Flemish Giant', '2', 'Lea.jpg', 'Rehome', 350),
('a55a0de6-c9b7-4ebb-bba1-5ee445ba980c', 'Gerald', '2023-07-03', 'Male', 'Pet rabbit', 'Sooty', 'French Lop', '2', 'Gerald.jpg', 'Rehome', 300),
('cb9e8d58-2fd5-4921-9b75-bb47a7aa13fe', 'Georgia', '2023-07-01', 'Male', 'Pet rabbit', 'Black', 'Beveren', '1.7', 'george.jpg', 'Rehome', 300),
('cc9d8b5f-d8dc-4928-a34c-698f44125a0e', 'Pancake', '2023-07-02', 'Female', 'Pet rabbit', 'White', 'American', '1.6', 'Pancake.jpg', 'Rehome', 0),
('efe375f0-4e11-4265-9cd3-e1511cdfb4b7', 'Leo and Lea', '2023-05-23', 'Other', 'Pet rabbit', 'White', 'Beveren', '3.1', 'Lea.jpg,leo.jpg', 'Rehome', 250),
('f8c9097c-5117-450e-bb69-760d3fb249dd', 'Leo', '2023-07-09', 'Male', 'Pet rabbit', 'White', 'Beveren', '2', 'leo.jpg', 'Rehome', 350);

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
  `user_type` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `user_type`, `profile`) VALUES
('6226702d-125e-4c1d-973b-994c76bf52a3', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '1234', 'client', NULL),
('d09a9d2d-0984-4fda-8476-52a56a6cf484', 'Leonardo Nogra', 'leonardo@gmail.com', 'admin', 'admin', 'âPngtreeârabbit_3644555.png'),
('d68cd68d-887f-4896-a46c-88a639550cc7', 'Ivan Paglinawan', 'ivanbeng@gmail.com', '1234', 'admin', NULL),
('dc63f09f-f4c6-4bce-b73b-f83d64746ee1', 'Ivan', 'ivanpaglinawan00@gmail.com', 'zsdcas', 'client', NULL),
('f0a9b912-a774-4219-badd-c0a9c5317d5d', 'Francis Bawag', 'francisbawag@gmail.com', '1234', 'client', NULL),
('f75cbbc5-6479-4add-83e2-6ca52e93f882', 'Cynthia Lorio', 'cynthialorio@gmail.com', '1234', 'client', NULL);

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
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
