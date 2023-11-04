-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2023 at 05:09 AM
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
  `service_option` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adoption`
--

INSERT INTO `adoption` (`id`, `rabbit_id`, `adoption_date`, `fullname`, `email`, `phone`, `province`, `city`, `barangay`, `postal_code`, `reason_for_adoption`, `other_pets`, `user_id`, `transaction_status`, `home_environment_image_path`, `service_option`, `delivery_status`) VALUES
('49224e02-d8bd-41b8-b859-b7dce2c389bb', '31455020-63bd-4326-8029-2298da34b1a4', '11/4/2023', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', 2147483647, 'Camarines Sur', 'Cabusao', 'Sta. Cruz', 4406, 'Pet', '', 7, 'Declined', 'Screenshot (90).png', 'Deliver', 'Approved'),
('d7bc20a7-240e-4022-8a8e-9910fbe5409a', '3421c418-85de-40f2-b89f-7fb2edf3d421', '10/28/2023', 'Francis Bawag', 'francisbawag@gmail.com', 2147483647, 'Camarines Sur', 'Cabusao', 'Sta. Cruz', 4406, 'Pet', '', 3, 'Pending', 'banana.jpg', 'Deliver', 'Approved'),
('eab9b965-c45c-4004-b410-cf17684493ff', '9d4e8655-1004-4439-9b76-9ea683d1288e', '10/28/2023', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', 2147483647, 'Camarines Sur', 'Cabusao', 'Sta. Cruz', 4406, 'Pet', '', 7, 'Approved', 'santol.jpg', 'Deliver', 'Approved');

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
(14, 5, 1, '0000-00-00'),
(15, 0, 0, '0000-00-00');

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
('16e1dc74-9db0-480c-b8b9-3c598fc99f93', 'Juan', '2023-11-02', 'Male', '4', '380502373_1061951088297453_6379436113640909426_n.jpg', 'Rehome'),
('1bcc8334-70af-4e3e-814c-ee3ca920d15b', 'Jolly', '2023-10-30', 'Female', '3', '379941148_641139911470004_6475572836204101764_n.jpg', NULL),
('31455020-63bd-4326-8029-2298da34b1a4', 'Jos', '0000-00-00', 'Male', '3', '379941148_641139911470004_6475572836204101764_n.jpg', 'Rehome'),
('359ef3ea-3796-4182-a9d6-73275dd86dfb', 'Loki', '0000-00-00', 'Male', '4', '385398170_2818302821642629_5674628126964585107_n.jpg', NULL),
('487fed52-d55c-4d35-b760-c019ff3de303', 'Last', '2023-10-10', 'Male', '3', '379941148_641139911470004_6475572836204101764_n.jpg', NULL),
('49ec61fa-30b8-4d67-8578-fdf0feac59a8', 'Luna', '0000-00-00', 'Male', '3', '380502373_1061951088297453_6379436113640909426_n.jpg', NULL),
('872eb029-5c19-4cae-928f-6c7f9268662b', 'Gerrald', '2023-10-12', 'Male', '2', '379941148_641139911470004_6475572836204101764_n.jpg', NULL),
('9fff33d8-c18c-4d83-bb48-85448c5f9889', 'Mercy', '2023-11-01', 'Female', '3', '385510364_996745374876198_1520617944626592398_n.jpg', NULL),
('a14b6b57-e3b5-446f-baaf-434e6d0b3cb3', 'Pancake', '0000-00-00', 'Female', '3', '385510364_996745374876198_1520617944626592398_n.jpg', NULL),
('abb20abf-280a-4ec4-9e19-b63e8fa477f3', 'Lunox', '0000-00-00', 'Female', '3', '380502373_1061951088297453_6379436113640909426_n.jpg', NULL),
('ee49f7a6-df2c-4b0c-a86e-9c450d36fd3b', 'Multi', '2023-10-10', 'Male', '2', '385510364_996745374876198_1520617944626592398_n.jpg', NULL);

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
('3d81570f-bfb9-42ad-ac67-dcf2e102fa03', 'Cynthia Lorio', 'cynthialorio@gmail.com', '1234', 'client'),
('3ec3e8d7-aca4-49df-90d6-1c006f301017', 'Francis Bawag', 'francisbawag@gmail.com', '1234', 'client'),
('7d58256c-c816-47e9-becd-63662989249a', 'Ivan Bengcolado', 'ivanpaglinawan0@gmail.com', '1234', 'client'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
