-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2024 at 03:11 PM
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
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `sno` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `slug` varchar(25) NOT NULL,
  `img_file` varchar(12) NOT NULL,
  `tagline` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`sno`, `title`, `content`, `date`, `slug`, `img_file`, `tagline`) VALUES
(1, 'Explicabo Earum sed', 'Dolor sit quibusdam', '2024-05-12 15:39:34', 'Debitis quia lorem q', 'Sed ea est a', 'Ea praesent'),
(2, 'The Noob Programmer’s Guide...', 'All right, there are probably 1000+ reasons to do this. The reality is that you should find them by yourself. Keep in mind that this is a long-term process. The learning curve is hard. You will encounter several problems and most likely you will be tempted to quit (it’s normal). When you are in a marathon and you get real tired, the only thing that will keep you going is to keep running. The energy will come back.\r\n\r\nI’m positive that programming is not for everybody but everybody can learn. The', '2024-05-11 22:52:29', 'abhay', 'about-bg.jpg', 'abhaytest'),
(3, 'Abhay Test', 'Hello Tests', '2024-05-12 15:35:01', 'aaaaaaaaaaaaaaaaa', 'abhay.png', '#Abhay #Cha'),
(4, 'Asperiores aut autem', 'Minim dolore dicta i', '2024-05-12 15:40:08', 'Tenetur rerum necess', 'Officia nost', 'Soluta atqu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
