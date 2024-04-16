-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 16, 2024 at 02:00 PM
-- Server version: 5.7.27-0ubuntu0.16.04.1
-- PHP Version: 5.6.40-5+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `blacklisted` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `user_uuid`, `type`, `expires`, `blacklisted`, `created_at`, `updated_at`) VALUES
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjQ1MDgsImV4cCI6MTcxNTg1NjUwOCwidHlwZSI6InJlZnJlc2gifQ.V1fa_mUBJWQCGV297DOY5qvwZstzgDwD7b-5c6F0Sj8', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 10:48:28', 0, '2024-04-16 10:48:28', '2024-04-16 10:48:28'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjY1OTUsImV4cCI6MTcxNTg1ODU5NSwidHlwZSI6InJlZnJlc2gifQ.QkWzm9h6nkvC9NcWCLnyoy-nBNiWnIRjWVQ0yoU3SLw', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 11:23:15', 0, '2024-04-16 11:23:15', '2024-04-16 11:23:15'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjY2MDUsImV4cCI6MTcxNTg1ODYwNSwidHlwZSI6InJlZnJlc2gifQ.JHYMizS_Y46ipbDmVJlNW1Irdo3_CnJvqQwjeCpK8DU', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 11:23:25', 0, '2024-04-16 11:23:25', '2024-04-16 11:23:25'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjY2NjYsImV4cCI6MTcxNTg1ODY2NiwidHlwZSI6InJlZnJlc2gifQ.VGipvvqkJ7hzqaaKWlmcBlYmWsF55xFySlnHdFtF_u0', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 11:24:26', 0, '2024-04-16 11:24:26', '2024-04-16 11:24:26'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjk4MzQsImV4cCI6MTcxNTg2MTgzNCwidHlwZSI6InJlZnJlc2gifQ.VqyNzxOjDU5Ej2B75hrP9071VizRczUyEsz3ovou5b4', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 12:17:14', 0, '2024-04-16 12:17:14', '2024-04-16 12:17:14'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNjk4MzcsImV4cCI6MTcxNTg2MTgzNywidHlwZSI6InJlZnJlc2gifQ.J_JjmcYyYn-mM0QOrlaBCmqXVNb9odNYV6XbGAoutH4', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 12:17:17', 0, '2024-04-16 12:17:17', '2024-04-16 12:17:17'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNzA3OTYsImV4cCI6MTcxNTg2Mjc5NiwidHlwZSI6InJlZnJlc2gifQ.We8yoChqCBu7uycfFESNYvS3rTnJY6bDqruAQbarstc', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 12:33:16', 0, '2024-04-16 12:33:16', '2024-04-16 12:33:16'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNzE0MTgsImV4cCI6MTcxNTg2MzQxOCwidHlwZSI6InJlZnJlc2gifQ.KyScrPNXuXeEkXy0_PeUBjVWVe2QeaxCWiET8bTgzfc', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 12:43:38', 0, '2024-04-16 12:43:38', '2024-04-16 12:43:38'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNzI2NTQsImV4cCI6MTcxNTg2NDY1NCwidHlwZSI6InJlZnJlc2gifQ.Z2NNyRMvV70fJ2kYeKWx_VzDDA4d5r03MdYO6pwwpdo', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 13:04:14', 0, '2024-04-16 13:04:14', '2024-04-16 13:04:14'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDhiNjA4Ny0wNWE3LTQxM2QtOTFlZi1jNjIzNWQ3ZTY4YWQiLCJpYXQiOjE3MTMyNzUyMjQsImV4cCI6MTcxNTg2NzIyNCwidHlwZSI6InJlZnJlc2gifQ.zXr-5AD5SOsA-MuyesapPZOWo3rijJJNM1IXgITsdkw', '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'refresh', '2024-05-16 13:47:04', 0, '2024-04-16 13:47:04', '2024-04-16 13:47:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email_verified` int(11) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `first_name`, `last_name`, `email`, `password`, `email_verified`, `phone_number`, `username`, `createdAt`, `updatedAt`) VALUES
(1, '6d8b6087-05a7-413d-91ef-c6235d7e68ad', 'joseph', 'doe', 'fumu@mailinator.com', '$2a$08$f9TUl9i8fBUNDucUccBngOkJkoDyISB8bMZ50KOkMpAEjjrciFTD6', 0, '0543535646', 'fumu', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `userTodos`
--

CREATE TABLE `userTodos` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `todo_text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userTodos`
--
ALTER TABLE `userTodos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userTodos_user_Id_foreign_idx` (`user_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `userTodos`
--
ALTER TABLE `userTodos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `userTodos`
--
ALTER TABLE `userTodos`
  ADD CONSTRAINT `userTodos_user_Id_foreign_idx` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
