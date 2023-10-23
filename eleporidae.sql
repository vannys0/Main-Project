-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2023 at 01:12 PM
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
  `id` int(11) NOT NULL,
  `rabbit_id` int(11) NOT NULL,
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
(46, 3, '2023-10-10', 'Ivan Bengc', 'ivan@gmail.com', 9, 'Camarines Sur', 'sdgs', 'sdgsd', 5415, 'dsfvsdf', 'dsfsd', 13, 'Approved', 'Screenshot (91).png', 'Pick up'),
(47, 3, '2023-10-10', 'ivhasfd', 'gfv@gmail.com', 65465, 'Camarines Sur', 'dfg', 'asdfgasd', 85, 'dffd', 'dfbgdfv', 13, 'Pending', 'Screenshot (96).png', 'Deliver'),
(48, 68, '0000-00-00', 'fsdgh', 'sdfg@gmail.com', 6545, 'Camarines Sur', 'zxcz', 'zxc', 0, 'zxcz', 'zxczx', 13, 'Pending', 'Screenshot (83).png', 'Pick up'),
(49, 68, '0000-00-00', 'Ngunyan na', 'n@gmail.com', 5511, 'Camarines Sur', 'adaa', 'aaaaasd', 463, 'fgh', 'fghfg', 13, 'Approved', 'Screenshot (97).png', 'Deliver'),
(50, 3, '0000-00-00', 'Last', 'j@gmail.com', 6515, 'Camarines Sur', 'asas', 'asdfasd', 6, 'asd', 'asda', 13, 'Pending', 'Screenshot (90).png', 'Deliver'),
(51, 68, '', 'Pinak', 'jhb@gmail.com', 651251, 'Camarines Sur', 'dfgdf', 'dfgdf', 5324, 'fgh', 'fghf', 13, 'Pending', 'Screenshot (95).png', 'Deliver'),
(52, 68, '', 'iohnioasdisdilczsduifv', 'sdcf@gmail.com', 77, 'Camarines Sur', 'scvs', 'sdcs', 5463, 'fdghf', 'fghf', 13, 'Pending', 'Screenshot (98).png', 'Deliver'),
(53, 6, '2023-10-10', 'Snow', 's@gmail.com', 515415, 'Camarines Sur', 'fgbh', 'sdfgb', 0, 'deg', 'sdfg', 3, 'Pending', 'Screenshot (95).png', 'Deliver'),
(54, 6, '', 'adfgbasdf', 'd@gmail.com', 56165, 'Camarines Sur', 'dsfgvasd', 'sdfg', 0, 'fdhr', 'erehg', 3, 'Pending', 'Screenshot (94).png', 'Pick up'),
(56, 6, '10/23/2023', 'Now', 'now@gmail.com', 0, 'Camarines Sur', 'asdfcs', 'sdfws', 0, 'cfg', 'xfgnbxd', 3, 'Pending', 'Screenshot (94).png', 'Pick up'),
(57, 70, '10/23/2023', 'Cynthia Lorio', 'cynthia@gmail.com', 6312562, 'Camarines Sur', 'asdas', 'asda', 6556, 'asdas', 'ddd', 3, 'Pending', 'Screenshot (112).png', 'Deliver');

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
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `weight` int(11) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rehome` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rabbit`
--

INSERT INTO `rabbit` (`id`, `name`, `age`, `sex`, `weight`, `image_path`, `rehome`) VALUES
(3, 'Gerald', 8, 'female', 2, 'LoginRabbit.jpg', 'Rehome'),
(5, 'Nomi', 6, 'female', 3, 'rabbit-about.png', NULL),
(6, 'Snow', 9, 'Female', 1, '1234.png', 'Rehome'),
(68, 'daisy', 2, 'female', 10, 'daisy.jpg', 'Rehome'),
(69, 'daisyson', 3, 'female', 3, 'daisy.jpg', NULL),
(70, 'justin', 12, 'male', 4, 'Screenshot (84).png', 'Rehome'),
(71, 'Us', 12, 'male', 4, 'IMG_20190918_171113.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `upload`
--

CREATE TABLE `upload` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `upload`
--

INSERT INTO `upload` (`id`, `image`) VALUES
(1, '4321.png'),
(3, 'Screenshot 2023-07-29 161411.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `user_type`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin', 'admin'),
(2, 'Francis Bawag', 'bawag@gmail.com', '1', 'client'),
(3, 'Cynthia Lorio', 'cynthia@gmail.com', '1234', 'client'),
(4, 'Aeriel', 'aeriel@gmail.com', '1234', 'client'),
(5, 'Josh', 'josh@gmail.com', 'josh123', 'client'),
(6, 'Jopay', 'jopay@gmail.com', 'jopay123', 'client'),
(7, 'Cris', 'cris@gmail.com', '0000', 'client'),
(8, 'Francis Paglinawan', 'paglinawan@gmail.com', '1111', 'client'),
(9, 'Cynthia', 'cynthia1@gmail.com', '0000', 'client'),
(10, 'Cynthia', 'cynthia1@gmail.com', '0000', 'client'),
(11, 'Ivan', 'ivan0@gmail.com', '0000', 'client'),
(12, 'Me', 'me@gmail.com', 'meme', 'client'),
(13, 'Ivaaann', 'ivan@gmail.com', '1234', 'client'),
(14, 'Ivvvan', 'ivan@gmail.com', '12345', 'client'),
(15, 'ivan', 'ivan@gmail.com', '12343', 'client'),
(16, 'Chloe', 'ivan1@gmail.com', '1234', 'client'),
(17, 'Ivan Bengcolado', 'ivan000@gmail.com', '1234', 'client'),
(18, 'j', 'j@gmail.com', '1', 'client'),
(19, 'Maam', 'maam@gmail.com', '1234', 'client');

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
-- Indexes for table `upload`
--
ALTER TABLE `upload`
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
-- AUTO_INCREMENT for table `adoption`
--
ALTER TABLE `adoption`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `breeding_pair`
--
ALTER TABLE `breeding_pair`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rabbit`
--
ALTER TABLE `rabbit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
