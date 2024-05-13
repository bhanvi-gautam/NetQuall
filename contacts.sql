-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thenoobcoder`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `sno` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_num` text NOT NULL,
  `mes` varchar(200) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`sno`, `name`, `email`, `phone_num`, `mes`, `date`) VALUES
(1, 'sdfs', 'amansingh77637@gmail.com', '3123123', '123123123', '2024-05-11 10:15:44'),
(2, 'Ajju bhai', 'abhaysingh6397@gmail.com', '3123123', 'asdas', '2024-05-11 10:32:11'),
(3, 'Ajju bhai', 'agent1@mailinator.com', '3123123', 'werkmekrmkerlk', '2024-05-11 16:59:43'),
(4, 'Ajju bhai', 'amansingh77637@gmail.com', '3123123', 'asddddddddddd', '2024-05-11 17:01:47'),
(5, 'qweqwe', 'abhay@netquall.com', 'qwe2234234', '234234234234234', '2024-05-11 17:03:24'),
(6, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123', 'Hello See', '2024-05-11 17:07:59'),
(7, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123333', 'Hello Abhay Bhai', '2024-05-11 17:15:30'),
(8, 'Ajju bhai', 'ytabhay207@gmail.com', 'qwe2234234', 'DWQE', '2024-05-11 17:16:55'),
(9, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123333', 'Hello How are you!!!', '2024-05-11 19:29:59'),
(10, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123', 'Hello How Are you Abhay!!!!!', '2024-05-11 19:34:37'),
(11, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123', 'se', '2024-05-11 19:35:23'),
(12, 'Ajju bhai', 'ytabhay207@gmail.com', '3123123333', 'Abay', '2024-05-11 19:49:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
