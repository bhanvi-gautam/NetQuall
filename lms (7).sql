-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 09, 2024 at 12:25 PM
-- Server version: 5.7.27-0ubuntu0.16.04.1
-- PHP Version: 5.6.40-5+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `announcement_heading` varchar(255) DEFAULT NULL,
  `announcement_description` varchar(255) DEFAULT NULL,
  `available_for_student` tinyint(1) DEFAULT '0',
  `available_for_teachers` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `uuid`, `announcement_heading`, `announcement_description`, `available_for_student`, `available_for_teachers`, `createdAt`, `updatedAt`) VALUES
(7, 'e10068f2-4b59-46f1-bff4-81a54e1385d1', '“Upcoming Fest: Save the Date!”', 'Dear students, mark your calendars! Our annual college fest is just around the corner. Get ready for exciting events, workshops, and cultural performances. Stay tuned for more details!', 1, 0, '2024-04-29 12:54:00', '2024-04-30 07:57:02'),
(8, '8101261d-3b0a-4296-bec9-7495fd779e07', ' “Important Academic Deadline”', 'Attention faculty members! The submission deadline for final grades is approaching. Please ensure timely grading and submission to the e-learning platform. Your prompt action will help students receive their results on time', 0, 1, '2024-04-29 13:08:38', '2024-04-30 07:53:24'),
(9, 'ef5d859b-3661-4d25-bc57-55079c2c895d', '"New Course Announcement: Artificial Intelligence Fundamentals"', 'We’re thrilled to introduce a new course on Artificial Intelligence (AI). Whether you’re a student eager to explore AI or a teacher interested in incorporating it into your curriculum, this course covers the fundamentals. Enroll now and unlock the potenti', 1, 1, '2024-04-30 07:30:30', '2024-04-30 07:30:30'),
(10, 'd10de93e-0560-4cd0-b908-ce107ffe4997', '“Guest Lecture on Quantum Computing”', 'Join us for an enlightening guest lecture on Quantum Computing by Dr. Alice Bell. Whether you’re a student curious about cutting-edge technology or a teacher interested in expanding your knowledge, this session promises to be mind-boggling!', 1, 1, '2024-04-30 07:32:31', '2024-04-30 07:32:31'),
(11, 'f7c9fc49-3502-482b-8d71-5654404de72d', ' “Career Development Workshop”', 'Attention students! Enhance your employability skills with our upcoming workshop on resume building, interview techniques, and networking. Don’t miss this opportunity to prepare for your dream job.', 1, 0, '2024-04-30 07:32:58', '2024-04-30 07:32:58'),
(12, '3a5bdc19-fb87-4ed6-b4b7-06229b581e4d', '“Faculty Appreciation Week”', 'Dear professors, it’s time to celebrate you! Faculty Appreciation Week is here. Join us for special events, heartfelt messages from students, and a chance to unwind. Your dedication makes a difference!', 0, 1, '2024-04-30 07:33:33', '2024-04-30 07:33:33'),
(13, 'b9659f36-f433-4ee2-b00f-f7468873018f', '"Coding Challenge: Python Palooza"', 'Calling all code enthusiasts! Participate in Python Palooza, our coding challenge. Solve intriguing problems, showcase your skills, and win exciting prizes. Open to students and teachers alike!', 1, 1, '2024-04-30 07:34:00', '2024-05-03 04:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `quizOptions`
--

CREATE TABLE `quizOptions` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `option_text` tinytext,
  `is_correct` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `question_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quizOptions`
--

INSERT INTO `quizOptions` (`id`, `uuid`, `option_text`, `is_correct`, `createdAt`, `updatedAt`, `question_Id`) VALUES
(1, '1abe5488-f51f-483b-816f-3831d181fbd9', '118', 1, '2024-04-19 09:32:57', '2024-04-19 09:32:57', 2),
(2, 'fa1453bf-8256-4fde-b4ad-7c7e94b54331', '10,080', 1, '2024-04-19 09:32:57', '2024-04-19 09:32:57', 1),
(3, 'ad456fdf-7f82-4673-9504-e135967a0acc', '11,800', 0, '2024-04-19 09:32:57', '2024-04-19 09:32:57', 1),
(4, '0d19dcf1-0dff-43fc-954a-6ae22544b2fb', '120', 1, '2024-04-19 09:32:57', '2024-04-19 09:32:57', 2),
(5, '8932b758-8676-41fe-878d-12d5c13a1fe0', '175', 0, '2024-04-19 09:32:57', '2024-04-19 09:32:57', 2),
(6, '02e83e02-0e92-464a-9c88-4722cfa311ba', 'Ag', 0, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 3),
(7, '5bdb1438-59f8-43fc-9d14-0b8264e7babd', '2007', 1, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 5),
(8, 'fb1f8dbd-15f2-469e-a4c6-480d49ecaeec', '2005', 0, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 5),
(9, '9e40664b-1511-4d44-97ee-fd2f4d41997a', 'Au', 1, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 3),
(10, 'bc68252d-4dd6-4ed1-b8e4-ec0b5bd5714a', 'Punjab', 1, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 4),
(11, '82d35d97-a38c-4d4e-848e-769004795ffe', 'Harayana', 1, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 4),
(12, '41cd9068-8ead-4d0f-bdcb-6476dac1df05', '2008', 0, '2024-04-19 09:36:58', '2024-04-19 09:36:58', 5),
(20, 'becf0537-3ab1-4b3f-8f79-2fa823d2511f', 'India', 0, '2024-04-22 05:19:12', '2024-04-22 05:19:12', 9),
(21, 'c078d956-5615-44cf-80b6-b2e1210dab29', 'Hong Kong', 1, '2024-04-22 05:19:12', '2024-04-22 05:19:12', 9),
(26, '789abe93-cd9a-4bcd-aa7c-503a7b1b48c8', 'Jupiter', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 12),
(27, '67e26570-98bf-4424-a8b6-bf2d0aaa9cd3', 'Apollo', 1, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 14),
(28, '1adfa6d7-796c-4b85-85dc-7141c9541ef0', 'Mars', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 12),
(29, '93cf5a06-8562-4166-aa9d-9d1ec0d42d6b', 'Surya', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 14),
(30, '69dbb465-b47c-49df-8a22-87c1e784b71f', 'Saturn', 1, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 12),
(31, '98d59ccd-ff67-41f6-b761-38b34b10ad60', '3', 1, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 13),
(32, '906615d8-5a1c-45d1-a433-4705a10b377d', '4', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 13),
(33, '7e289adb-dd22-4065-8a9a-485f4eb2bed6', '5', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 13),
(34, '9ce79246-139e-4deb-a5d9-08337ba4d743', '1', 0, '2024-05-06 12:41:18', '2024-05-06 12:41:18', 13),
(35, 'f3923ae3-97f3-404a-8c07-bd4675fade0c', 'Safari', 1, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 15),
(36, '7801820d-e0c8-43e6-b3bb-e89922f14c87', 'Mozilla Firefox', 1, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 15),
(37, '81ffdc15-6cda-46da-9093-764a0a664ca8', 'None of the above', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 15),
(38, '12d0282f-0890-4482-b671-2b1692c15572', 'IE', 1, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 15),
(39, '63f1f030-90c8-49f0-8e99-34a2fb12078e', 'World Wacky Web', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 16),
(40, 'a65514aa-c3b2-4668-a7cf-d4c76bc6efed', 'Wide World Wumpus', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 16),
(41, '6d1e5a3e-e74f-4eae-997c-ef58729744bd', 'World Wide Web', 1, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 16),
(42, '3235556f-8427-4447-aeee-7905b1da579d', 'Wide World of Why', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 16),
(43, '3e43219b-dc66-4c5f-926c-5703fb56bc62', 'Netscape', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 17),
(44, 'e876c80c-cc97-44b9-957c-3c4208cb62ec', 'Java', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 17),
(45, 'cd0a6ecb-8db3-4117-9a13-2386d030d2e7', 'Altavista', 1, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 17),
(46, 'ab8c1f55-38b4-4239-9cad-19538b6086cc', 'Internet', 0, '2024-05-06 12:47:28', '2024-05-06 12:47:28', 17),
(49, '0fc2352f-4f02-4d77-81cf-b88b0b4e0c6c', 'Algorithms', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 19),
(50, 'd6bd4cd5-1620-44ca-bbc3-886a70c0a1e0', 'Translated into its machine code.', 1, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 20),
(51, '5dce0c89-f7c6-45a9-9ecb-80ef34682c93', 'Low Level Languages', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 19),
(52, '81975ad3-435f-4d16-af29-aa882f4843f1', 'Machine Code', 1, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 19),
(53, 'fe7beaed-6b92-43f1-b4c1-c6c8a89357b4', 'High Level Languages', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 19),
(54, 'f6022b97-c16c-48fb-9050-cf5853c0dd25', 'Translated into a low level language.', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 20),
(55, '09846a7e-37ee-4959-b21e-3cd3ec1a6472', 'Translated into a high level language.', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 20),
(56, '0ee4f6e5-c152-4a2a-9fac-7517abba9608', 'Computer Program', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 21),
(57, '0516793c-8f42-4d93-a873-3d6c294b2494', 'Algorithm', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 21),
(58, 'a27c3082-9be0-43c9-a836-c4d94a3a4077', 'Machine Code', 1, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 21),
(59, '7ae032cd-dd17-4148-84ba-10dbbf8c847e', 'Binary Code', 0, '2024-05-08 12:03:39', '2024-05-08 12:03:39', 21);

-- --------------------------------------------------------

--
-- Table structure for table `quizQuestions`
--

CREATE TABLE `quizQuestions` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `question` tinytext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quiz_Id` int(11) DEFAULT NULL,
  `question_marks` int(11) DEFAULT NULL,
  `question_type` tinyint(1) DEFAULT '0' COMMENT 'false = Single Answer, true = Multiple Answers'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quizQuestions`
--

INSERT INTO `quizQuestions` (`id`, `uuid`, `question`, `createdAt`, `updatedAt`, `quiz_Id`, `question_marks`, `question_type`) VALUES
(1, 'd57be273-794e-414c-8038-a2da388ded30', 'How many minutes are in a full week?', '2024-04-19 09:32:57', '2024-04-19 09:32:57', 3, 6, 0),
(2, 'b9ec6996-068e-459b-ae3f-7120fd2739fe', 'How many elements are in the periodic table?', '2024-04-19 09:32:57', '2024-04-19 09:32:57', 3, 3, 1),
(3, 'aa75090e-a675-4c48-ab9e-cd2dcbafb590', 'What is the chemical symbol for Gold?', '2024-04-19 09:36:58', '2024-04-19 09:36:58', 4, 3, 0),
(4, 'b8876b68-416d-4d18-bc69-8f968073f9f0', 'Which state has capital named "Chandigarh"?', '2024-04-19 09:36:58', '2024-04-19 09:36:58', 4, 16, 1),
(5, 'a58f8321-b693-4121-b44a-623dd94933f0', 'In what year was the first iPhone released?', '2024-04-19 09:36:58', '2024-04-19 09:36:58', 4, 4, 1),
(9, 'a0758b16-f751-4d7f-a706-e82fb87f9886', 'What country has the highest life expectancy?', '2024-04-22 05:19:12', '2024-04-22 05:19:12', 6, 3, 0),
(12, 'ea612d27-a043-47a2-903a-76d205e54a6a', 'Which planet has the most moons?', '2024-05-06 12:41:18', '2024-05-06 12:41:18', 9, 2, 0),
(13, '9926d179-5084-4b2e-a46b-5e1f39184e9c', 'How many bones do we have in an ear?', '2024-05-06 12:41:18', '2024-05-06 12:41:18', 9, 2, 0),
(14, '99aa3743-0d6b-4e6a-93d8-a9b89303b1f5', 'Who was the Ancient Greek God of the Sun? ', '2024-05-06 12:41:18', '2024-05-06 12:41:18', 9, 6, 1),
(15, 'ce32e365-2d53-4d18-ba53-da1184faef5f', 'Which of the following are "browsers"?', '2024-05-06 12:47:28', '2024-05-06 12:47:28', 10, 5, 1),
(16, 'f97bc7dd-65a8-42f2-9ba4-fe3a40981bd9', 'What does WWW stand for?', '2024-05-06 12:47:28', '2024-05-06 12:47:28', 10, 1, 0),
(17, 'a8aad3b0-3832-48c5-96d4-3241e361e561', 'Which one of the following is a search engine?', '2024-05-06 12:47:28', '2024-05-06 12:47:28', 10, 2, 0),
(19, '78ff212a-ab6d-4364-9d98-95846920e68a', 'What is the only thing that computers understand?', '2024-05-08 12:03:39', '2024-05-08 12:03:39', 12, 2, 0),
(20, 'f5c9a5ed-05fa-4f81-b015-cb3fd9e5d52b', 'Before a computer can understand a program it must be...', '2024-05-08 12:03:39', '2024-05-08 12:03:39', 12, 2, 0),
(21, '1e0cf81b-c3d3-4cf9-a419-1b5080a138e4', 'A list of instructions that enable a computer to perform a specific task is a...', '2024-05-08 12:03:39', '2024-05-08 12:03:39', 12, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `quizName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `subject_Id` int(11) DEFAULT NULL,
  `quiz_marks` int(11) DEFAULT NULL,
  `is_available` int(11) DEFAULT '0' COMMENT 'Availability status: 0 = Not Available, 1 = Available'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `uuid`, `quizName`, `createdAt`, `updatedAt`, `subject_Id`, `quiz_marks`, `is_available`) VALUES
(3, '856474e6-410c-461e-8d12-756be49acac8', 'Demo', '2024-04-19 09:32:57', '2024-04-19 09:32:57', 82, 9, 0),
(4, '42a666cf-6b95-4946-950a-0056dab03749', 'Demo1', '2024-04-19 09:36:58', '2024-05-06 10:10:30', 82, 23, 1),
(6, '4b98bbb4-22cf-4634-8c9c-5e044bfb43cd', 'Demo2', '2024-04-22 05:19:12', '2024-04-22 06:44:18', 82, 3, 1),
(9, 'd41c77e9-83cb-4c8b-a4fb-a432bf1f4fc1', 'Demo3', '2024-05-06 12:41:18', '2024-05-06 12:41:18', 82, 10, 0),
(10, '220d43a0-284b-4a52-9a2f-9af00c52eb08', 'Demo4', '2024-05-06 12:47:28', '2024-05-06 12:47:28', 82, 8, 0),
(12, 'be76b70d-e3e2-49f5-a978-7781c82264ab', 'Quiz for Beginners', '2024-05-08 12:03:39', '2024-05-08 12:03:39', 73, 6, 0);

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
(1130, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTI3MzIwNjYsImV4cCI6MTcxNTMyNDA2NiwidHlwZSI6InJlZnJlc2gifQ.AIqryyfo-RxRjNWdm26ON01KKyKTaaNKvm1QVoZ0yHw', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-10 06:54:26', 0, '2024-04-10 06:54:26', '2024-04-10 06:54:26'),
(1132, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTI3NDQ4NjksImV4cCI6MTcxNTMzNjg2OSwidHlwZSI6InJlZnJlc2gifQ.fk3lp7SVsR1CnOdAYriztltN6CSNFhMjRLUkzgx2hVk', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-10 10:27:49', 0, '2024-04-10 10:27:49', '2024-04-10 10:27:49'),
(1134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTI3NDk3MDAsImV4cCI6MTcxNTM0MTcwMCwidHlwZSI6InJlZnJlc2gifQ.Lbz2nHeQxrIcfkzCtHLf1_ij-o8PIZqe_DNvKWj8GJE', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-10 11:48:20', 0, '2024-04-10 11:48:20', '2024-04-10 11:48:20'),
(1136, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5M2JkNGQ4Zi01YzkzLTQzNzItYWJlYS1kNmUyODRhOTFiYjYiLCJpYXQiOjE3MTMxNTY3NTksImV4cCI6MTcxNTc0ODc1OSwidHlwZSI6InJlZnJlc2gifQ.Qy9VrNpuLCRBg5gUSfPRHx2HhIZVcGd7UYtDPUOMgJg', '93bd4d8f-5c93-4372-abea-d6e284a91bb6', 'refresh', '2024-05-15 04:52:39', 0, '2024-04-15 04:52:39', '2024-04-15 04:52:39'),
(1138, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTMxNTk2NTIsImV4cCI6MTcxNTc1MTY1MiwidHlwZSI6InJlZnJlc2gifQ.ydJn4iC3HOd3eKfy4eVLxUDXQ9BP4GxxwMDhGoVHmgw', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-15 05:40:52', 0, '2024-04-15 05:40:52', '2024-04-15 05:40:52'),
(1140, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTMxODI2ODcsImV4cCI6MTcxNTc3NDY4NywidHlwZSI6InJlZnJlc2gifQ.CL_-QiRkYQ39K_Gofd77uBnSA_aUdctp3v-5hxyZ19k', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-05-15 12:04:47', 0, '2024-04-15 12:04:47', '2024-04-15 12:04:47'),
(1142, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTMxODI3OTUsImV4cCI6MTcxNTc3NDc5NSwidHlwZSI6InJlZnJlc2gifQ.TsOW2c5XM6bGC3owacJgzpR7PdJf8_VMUfTv9MySVdY', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-15 12:06:35', 0, '2024-04-15 12:06:35', '2024-04-15 12:06:35'),
(1144, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTMxODI4ODYsImV4cCI6MTcxNTc3NDg4NiwidHlwZSI6InJlZnJlc2gifQ.tCIfugEXPIcU47rwDX8WzOXc3KtmrB4dyGqAGCfrnLU', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-15 12:08:06', 0, '2024-04-15 12:08:06', '2024-04-15 12:08:06'),
(1146, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTM0NDA5MjksImV4cCI6MTcxNjAzMjkyOSwidHlwZSI6InJlZnJlc2gifQ.aNq_iZ_I1A5LiVjhqP1iIW0iScV1xRZJfgg7vBEKzl0', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-18 11:48:49', 0, '2024-04-18 11:48:49', '2024-04-18 11:48:49'),
(1148, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM1MTkwNTUsImV4cCI6MTcxNjExMTA1NSwidHlwZSI6InJlZnJlc2gifQ._hp2GnWQAIZYAsl5cyGzMv0KBRsq_qmNQeSYhPpViQY', NULL, 'refresh', '2024-05-19 09:30:55', 0, '2024-04-19 09:30:55', '2024-04-19 09:30:55'),
(1150, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM1MTkxNzcsImV4cCI6MTcxNjExMTE3NywidHlwZSI6InJlZnJlc2gifQ.BViK3O9UQULLjaO5kMYjZZ7Eesfn9ZoPh-teC0i1P34', NULL, 'refresh', '2024-05-19 09:32:57', 0, '2024-04-19 09:32:57', '2024-04-19 09:32:57'),
(1152, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM1MTk0MTgsImV4cCI6MTcxNjExMTQxOCwidHlwZSI6InJlZnJlc2gifQ.LbPerl82uqIHZCnnKq85o0r8-DCz09RSfUWVLa2vbDk', NULL, 'refresh', '2024-05-19 09:36:58', 0, '2024-04-19 09:36:58', '2024-04-19 09:36:58'),
(1154, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM1MTk2MTUsImV4cCI6MTcxNjExMTYxNSwidHlwZSI6InJlZnJlc2gifQ.ou2PkQhSLOktCPBZjaOlGtWwmtN3qiav12I5eIW0Jys', NULL, 'refresh', '2024-05-19 09:40:15', 0, '2024-04-19 09:40:15', '2024-04-19 09:40:15'),
(1156, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTM3ODcwNTIsImV4cCI6MTcxNjM3OTA1MiwidHlwZSI6InJlZnJlc2gifQ.uyiGyPg8ftlY40WMBP-a1UwVEtb1sDORchPElTy4vJ8', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-22 11:57:32', 0, '2024-04-22 11:57:32', '2024-04-22 11:57:32'),
(1158, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTM3OTA0NDAsImV4cCI6MTcxNjM4MjQ0MCwidHlwZSI6InJlZnJlc2gifQ.5WwRmenyOg07FBxHtedjD8I4Nr98Rq5tji-wzlTIMcE', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-22 12:54:00', 0, '2024-04-22 12:54:00', '2024-04-22 12:54:00'),
(1160, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQwMjAyOTUsImV4cCI6MTcxNjYxMjI5NSwidHlwZSI6InJlZnJlc2gifQ.-ONAZ4KpD-35ImoE51dvTVRnJVnVUPmJQhwmuhSAnIA', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-25 04:44:55', 0, '2024-04-25 04:44:55', '2024-04-25 04:44:55'),
(1162, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQwMzc0NzcsImV4cCI6MTcxNjYyOTQ3NywidHlwZSI6InJlZnJlc2gifQ.hO6TshAZ_aZwQaTeGQKNUPtiWcOj0y6wmixyokJrSgM', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-25 09:31:17', 0, '2024-04-25 09:31:17', '2024-04-25 09:31:17'),
(1164, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQwMzc1MTAsImV4cCI6MTcxNjYyOTUxMCwidHlwZSI6InJlZnJlc2gifQ.SNed31nAcosjrtD7Dj-USyC0RNH7OrMtTXIjnCJYBnc', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-25 09:31:50', 0, '2024-04-25 09:31:50', '2024-04-25 09:31:50'),
(1166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQxMTUwNDQsImV4cCI6MTcxNjcwNzA0NCwidHlwZSI6InJlZnJlc2gifQ.gfbNpGEcnxEnjaQgqGmHnpmCrA9jeKgaK39gnSZdryk', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-26 07:04:04', 0, '2024-04-26 07:04:04', '2024-04-26 07:04:04'),
(1168, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQxMTg1MjQsImV4cCI6MTcxNjcxMDUyNCwidHlwZSI6InJlZnJlc2gifQ.AIHq3TDMu6uxHnCogiHhTxii1bhqGtjjc7_ZHYU8mwI', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-05-26 08:02:04', 0, '2024-04-26 08:02:04', '2024-04-26 08:02:04'),
(1170, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ0NjE4OTQsImV4cCI6MTcxNzA1Mzg5NCwidHlwZSI6InJlZnJlc2gifQ.mxNaMFW9E66BW5GrAYykEJqCpdfwHi_EG4U9tLMY2ZU', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-30 07:24:54', 0, '2024-04-30 07:24:54', '2024-04-30 07:24:54'),
(1172, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ0NjE5MDIsImV4cCI6MTcxNzA1MzkwMiwidHlwZSI6InJlZnJlc2gifQ.6in8ctgrpXZpteEYhaq37B-eW2M-r257jCBixWQsgGk', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-30 07:25:02', 0, '2024-04-30 07:25:02', '2024-04-30 07:25:02'),
(1174, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ0NjE5MjQsImV4cCI6MTcxNzA1MzkyNCwidHlwZSI6InJlZnJlc2gifQ.GlmRlJl-USFabIjHOuf_RKRhSOFbwCPCkpVpqt_yZE0', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-30 07:25:24', 0, '2024-04-30 07:25:24', '2024-04-30 07:25:24'),
(1176, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQ0NjE5NTEsImV4cCI6MTcxNzA1Mzk1MSwidHlwZSI6InJlZnJlc2gifQ.KUSy8NZo8raRvpt9YBlWDgdpBqfA8Y7ckpU2gtzMX-0', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-05-30 07:25:51', 0, '2024-04-30 07:25:51', '2024-04-30 07:25:51'),
(1178, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ0Njc2NTksImV4cCI6MTcxNzA1OTY1OSwidHlwZSI6InJlZnJlc2gifQ.7_-9PbTgTO6OPS5f6k8XUOU-Z5Aa7IjYdKo2ETrlBkk', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-30 09:00:59', 0, '2024-04-30 09:00:59', '2024-04-30 09:00:59'),
(1180, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ0Njk5MTUsImV4cCI6MTcxNzA2MTkxNSwidHlwZSI6InJlZnJlc2gifQ.pmgdqgW1h168v4C1BTHHPcBuGToxTzulitPYSr9Igog', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-30 09:38:35', 0, '2024-04-30 09:38:35', '2024-04-30 09:38:35'),
(1182, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ0NzAxMTksImV4cCI6MTcxNzA2MjExOSwidHlwZSI6InJlZnJlc2gifQ.MpjeP_MPggq-XTSeXl2jE74QQZlW5OkB75MXr7NQUhY', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-30 09:41:59', 0, '2024-04-30 09:41:59', '2024-04-30 09:41:59'),
(1184, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ0NzAxMzUsImV4cCI6MTcxNzA2MjEzNSwidHlwZSI6InJlZnJlc2gifQ.eKI4ASX74LvCXCtF-ajEpDPSKZogztTZNSR6mbLTHP0', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-05-30 09:42:15', 0, '2024-04-30 09:42:15', '2024-04-30 09:42:15'),
(1186, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ0NzY4NzMsImV4cCI6MTcxNzA2ODg3MywidHlwZSI6InJlZnJlc2gifQ.WFeZaLwG6m1wbbsHAPDWGs6HRqusp7nikfoG3SyyODk', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-05-30 11:34:33', 0, '2024-04-30 11:34:33', '2024-04-30 11:34:33'),
(1188, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQ1NDQwNDcsImV4cCI6MTcxNzEzNjA0NywidHlwZSI6InJlZnJlc2gifQ.7tfW7RG_Ow4fHW1gCadOSwHwaahfdK9PnIi7yvoroFc', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-05-31 06:14:07', 0, '2024-05-01 06:14:07', '2024-05-01 06:14:07'),
(1190, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ3MTE2NjEsImV4cCI6MTcxNzMwMzY2MSwidHlwZSI6InJlZnJlc2gifQ.pxuHAQlatllQzxPLpSh9cHR_Hy-Q0FHcRLovCoJ-xYQ', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-02 04:47:41', 0, '2024-05-03 04:47:41', '2024-05-03 04:47:41'),
(1192, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ3MTE3MDAsImV4cCI6MTcxNzMwMzcwMCwidHlwZSI6InJlZnJlc2gifQ.E3w0XePC3SKX-kVOGRT7Cl3xUoBqVb9WuDqJnI3GEWA', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-02 04:48:20', 0, '2024-05-03 04:48:20', '2024-05-03 04:48:20'),
(1194, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQ3MTE3MjQsImV4cCI6MTcxNzMwMzcyNCwidHlwZSI6InJlZnJlc2gifQ.eRsB9IJZ1VdhUGF2I3mllhiLcUIx30EWyFjKk5Yu8OA', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-02 04:48:44', 0, '2024-05-03 04:48:44', '2024-05-03 04:48:44'),
(1196, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMjE1MmY0MC0xN2MyLTQ2NTItOTEyMS02N2ZjMzliNGFmZTEiLCJpYXQiOjE3MTQ3MTMyMTUsImV4cCI6MTcxNzMwNTIxNSwidHlwZSI6InJlZnJlc2gifQ.UT0mVpp5ekdRRwijr9rNsL4xxTXIXxLlBSlaKiNik5E', 'd2152f40-17c2-4652-9121-67fc39b4afe1', 'refresh', '2024-06-02 05:13:35', 0, '2024-05-03 05:13:35', '2024-05-03 05:13:35'),
(1198, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTc4NjllNS1hMzk3LTQ1ZjAtOGY5OC02NDBiNmY0MjY2YmEiLCJpYXQiOjE3MTQ3MTMyNTYsImV4cCI6MTcxNzMwNTI1NiwidHlwZSI6InJlZnJlc2gifQ.dwwOwklAQzg0EGNxxd7KzdPqaYWuoyKX42xnLccOLO8', '157869e5-a397-45f0-8f98-640b6f4266ba', 'refresh', '2024-06-02 05:14:16', 0, '2024-05-03 05:14:16', '2024-05-03 05:14:16'),
(1200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ODIxZDYwMC0xNzJiLTRmMGQtOGYzNi1mMjc1NzUzNjgzZTYiLCJpYXQiOjE3MTQ3MTMyODEsImV4cCI6MTcxNzMwNTI4MSwidHlwZSI6InJlZnJlc2gifQ._Qy4oUeMnVm14jUYlgcm9Q6dDYgR8Fa9XztTDqLrCTA', '7821d600-172b-4f0d-8f36-f275753683e6', 'refresh', '2024-06-02 05:14:41', 0, '2024-05-03 05:14:41', '2024-05-03 05:14:41'),
(1202, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZGE5OTJkMy0yOGE4LTQ0ODYtYTE4Mi05ODQwNmU2ZGY2YzEiLCJpYXQiOjE3MTQ3MTMzMTcsImV4cCI6MTcxNzMwNTMxNywidHlwZSI6InJlZnJlc2gifQ.iEfewh9IQXBsdayywJRzVaHonZGM-GWMiCgRukJ5zaE', '7da992d3-28a8-4486-a182-98406e6df6c1', 'refresh', '2024-06-02 05:15:17', 0, '2024-05-03 05:15:17', '2024-05-03 05:15:17'),
(1204, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGE0MzRiMS02MTU4LTRmMjUtODVmMS1hMGZjN2IwYTNlNzYiLCJpYXQiOjE3MTQ3MTMzNDEsImV4cCI6MTcxNzMwNTM0MSwidHlwZSI6InJlZnJlc2gifQ.C5qDQ2SjE04NzQbRUev24YFNykuO0BkUC7sZTBC_fMY', '0da434b1-6158-4f25-85f1-a0fc7b0a3e76', 'refresh', '2024-06-02 05:15:41', 0, '2024-05-03 05:15:41', '2024-05-03 05:15:41'),
(1206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQ3MTMzNDcsImV4cCI6MTcxNzMwNTM0NywidHlwZSI6InJlZnJlc2gifQ.Qw11I3uME3nNvT0i0spCGUoLMYKWMBD1KtRLnNKyAjI', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-02 05:15:47', 0, '2024-05-03 05:15:47', '2024-05-03 05:15:47'),
(1208, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZmUyMmRhNC0wMzQzLTRjZDQtOGQ4Zi1kM2ZkMzI1OGMyNTMiLCJpYXQiOjE3MTQ3MTM2MzEsImV4cCI6MTcxNzMwNTYzMSwidHlwZSI6InJlZnJlc2gifQ.nDNfuz0czCIUBMxyPXQI5JMLN5IlegLv6Ra_KOrElN8', 'cfe22da4-0343-4cd4-8d8f-d3fd3258c253', 'refresh', '2024-06-02 05:20:31', 0, '2024-05-03 05:20:31', '2024-05-03 05:20:31'),
(1210, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTQ3MTM2MzgsImV4cCI6MTcxNzMwNTYzOCwidHlwZSI6InJlZnJlc2gifQ.zlfu0uNgHU1np7ipehnDx5Jc69WN7fsiUoBllpSenpE', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-02 05:20:38', 0, '2024-05-03 05:20:38', '2024-05-03 05:20:38'),
(1212, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ5NzE4NTMsImV4cCI6MTcxNzU2Mzg1MywidHlwZSI6InJlZnJlc2gifQ.mSSrGXMgZdJmDe950b_r7HDI0rZCEtUL5ESZFUtqoH4', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-05 05:04:13', 0, '2024-05-06 05:04:13', '2024-05-06 05:04:13'),
(1214, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ5ODk3MTYsImV4cCI6MTcxNzU4MTcxNiwidHlwZSI6InJlZnJlc2gifQ.Yms0jgHnIMJIYgddbGMjkBOaotCPQGerJ8fOD_6DBrc', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-05 10:01:56', 0, '2024-05-06 10:01:56', '2024-05-06 10:01:56'),
(1216, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ5OTAyNDMsImV4cCI6MTcxNzU4MjI0MywidHlwZSI6InJlZnJlc2gifQ.tgmizB6oLl_IMLN69Bqe0yH2E-988agvJfKKU9TB5uc', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-05 10:10:43', 0, '2024-05-06 10:10:43', '2024-05-06 10:10:43'),
(1218, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTQ5OTM5MjIsImV4cCI6MTcxNzU4NTkyMiwidHlwZSI6InJlZnJlc2gifQ.Gm_AD6oBpwuxBO95nlDuJLQS9iItbQJnASdzAaqPUAA', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-05 11:12:02', 0, '2024-05-06 11:12:02', '2024-05-06 11:12:02'),
(1220, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTQ5OTk3ODksImV4cCI6MTcxNzU5MTc4OSwidHlwZSI6InJlZnJlc2gifQ.BihHGM0_yleCPqLZmiuxRoadGJ8KtnZRTESMQopCB-U', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-05 12:49:49', 0, '2024-05-06 12:49:49', '2024-05-06 12:49:49'),
(1222, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTUxNTgzNzMsImV4cCI6MTcxNzc1MDM3MywidHlwZSI6InJlZnJlc2gifQ.OwDCHSADvbeAgGP_td1eIG1pyFS6SF37MhzbcMoO4HE', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-07 08:52:53', 0, '2024-05-08 08:52:53', '2024-05-08 08:52:53'),
(1224, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUxNjI5MTYsImV4cCI6MTcxNzc1NDkxNiwidHlwZSI6InJlZnJlc2gifQ.YF5lUwQgo-mswIgQeiuIBulxBnW41SY7QQQ-8SL7-Vw', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-07 10:08:36', 0, '2024-05-08 10:08:36', '2024-05-08 10:08:36'),
(1226, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTUxNjg2MjIsImV4cCI6MTcxNzc2MDYyMiwidHlwZSI6InJlZnJlc2gifQ.zKEoXMQe_Daoqwgzy39KfBhsodrrLov69pQGcz3yTeI', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-07 11:43:42', 0, '2024-05-08 11:43:42', '2024-05-08 11:43:42'),
(1228, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUxNjg5NjAsImV4cCI6MTcxNzc2MDk2MCwidHlwZSI6InJlZnJlc2gifQ.ntz-9YXWow_cNuuKi43Skjr_GmefKkKGo1lKcBh4nno', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-07 11:49:20', 0, '2024-05-08 11:49:20', '2024-05-08 11:49:20'),
(1230, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTUxNjkzMDUsImV4cCI6MTcxNzc2MTMwNSwidHlwZSI6InJlZnJlc2gifQ.y6oqxx6o8YhxmjvtVga3nqfUpaK6ODsj2VfyHy0Iy6I', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-07 11:55:05', 0, '2024-05-08 11:55:06', '2024-05-08 11:55:06'),
(1232, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWExN2YwNy05MDk2LTQ1YWEtYjc3Zi0xNmNmN2I3Yzk0OTUiLCJpYXQiOjE3MTUxNjkzOTQsImV4cCI6MTcxNzc2MTM5NCwidHlwZSI6InJlZnJlc2gifQ.AvU-kmLgZZ2fiFUIb8hRyMRQujmAvQV2ETl8YEWz8aM', '2ea17f07-9096-45aa-b77f-16cf7b7c9495', 'refresh', '2024-06-07 11:56:34', 0, '2024-05-08 11:56:34', '2024-05-08 11:56:34'),
(1234, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYzJjZjA4Yi01YTIxLTQwMDctYTlhMC04ZTZlMjc3MDE3ZGIiLCJpYXQiOjE3MTUxNjk5NTQsImV4cCI6MTcxNzc2MTk1NCwidHlwZSI6InJlZnJlc2gifQ.Nxrwl6TwnSK11zDy7LEV4EYN1kHb7SFAA6i7jCIvuOQ', 'ec2cf08b-5a21-4007-a9a0-8e6e277017db', 'refresh', '2024-06-07 12:05:54', 0, '2024-05-08 12:05:54', '2024-05-08 12:05:54'),
(1236, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTUxNjk5NjksImV4cCI6MTcxNzc2MTk2OSwidHlwZSI6InJlZnJlc2gifQ.ulXxxPNyoQysT9MxPmjwoML9E_xd9yRfD_ysT68paOM', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-07 12:06:09', 0, '2024-05-08 12:06:09', '2024-05-08 12:06:09'),
(1238, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWExN2YwNy05MDk2LTQ1YWEtYjc3Zi0xNmNmN2I3Yzk0OTUiLCJpYXQiOjE3MTUxNzAwNjAsImV4cCI6MTcxNzc2MjA2MCwidHlwZSI6InJlZnJlc2gifQ.9CByZBRWI4vur0DbAPDlcmxpUHXrsX1nJyirK7WF0K4', '2ea17f07-9096-45aa-b77f-16cf7b7c9495', 'refresh', '2024-06-07 12:07:40', 0, '2024-05-08 12:07:40', '2024-05-08 12:07:40'),
(1240, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTUxNzE5MzYsImV4cCI6MTcxNzc2MzkzNiwidHlwZSI6InJlZnJlc2gifQ.edN6rqWauDDUrS1tUxCGbEDf419aIGvdZr9jBQKLqqg', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-07 12:38:56', 0, '2024-05-08 12:38:56', '2024-05-08 12:38:56'),
(1242, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUxNzE5NTksImV4cCI6MTcxNzc2Mzk1OSwidHlwZSI6InJlZnJlc2gifQ.6rg-94VoMXrgcLBMJYHkSrVsOXvODXgFTynzO9Jkkk4', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-07 12:39:19', 0, '2024-05-08 12:39:19', '2024-05-08 12:39:19'),
(1244, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjI5OTQzZS1kYmZkLTRmZmItOTA3Mi01ODhmMTA4NDViNzQiLCJpYXQiOjE3MTUyMzExMjIsImV4cCI6MTcxNzgyMzEyMiwidHlwZSI6InJlZnJlc2gifQ.fm4j-W0LBgNVuuXV8YcZExpk7n-EGv7_4Y_AHkbwWcQ', 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'refresh', '2024-06-08 05:05:22', 0, '2024-05-09 05:05:22', '2024-05-09 05:05:22'),
(1246, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUyMzEzNjUsImV4cCI6MTcxNzgyMzM2NSwidHlwZSI6InJlZnJlc2gifQ.L5khVftATFX4IivJRFCrBHxn5jUQyazH42cwapCM0iA', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-08 05:09:25', 0, '2024-05-09 05:09:25', '2024-05-09 05:09:25'),
(1247, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTUyNDAxMDgsImV4cCI6MTcxNTI3NjEwOCwidHlwZSI6ImFjY2VzcyJ9.hP03B4I2gVwtCgLYVhpiM12Hq5kTnfjPxxfUb2kG8Z8', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'access', '2024-05-09 17:35:08', 0, '2024-05-09 07:35:08', '2024-05-09 07:35:08'),
(1248, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTUyNDAxMDgsImV4cCI6MTcxNzgzMjEwOCwidHlwZSI6InJlZnJlc2gifQ.e8aeyL70faTwrMah9IeracZK9aNo3NJvdfB8XYUVaZA', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-08 07:35:08', 0, '2024-05-09 07:35:08', '2024-05-09 07:35:08'),
(1249, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUyNDAxNjUsImV4cCI6MTcxNTI3NjE2NSwidHlwZSI6ImFjY2VzcyJ9.7cneVAfwZZO6-W2xv0kdHqdKKP50DE07gafLp55S19U', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'access', '2024-05-09 17:36:05', 0, '2024-05-09 07:36:05', '2024-05-09 07:36:05'),
(1250, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUyNDAxNjUsImV4cCI6MTcxNzgzMjE2NSwidHlwZSI6InJlZnJlc2gifQ.y2I65gRFcyzLGzdfLRXQY5D7GgH1SNrH3gr6umpV-g8', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-08 07:36:05', 0, '2024-05-09 07:36:05', '2024-05-09 07:36:05'),
(1251, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTUyNDg1NjgsImV4cCI6MTcxNTI4NDU2OCwidHlwZSI6ImFjY2VzcyJ9.RVQrD0FmdegkmZ06zR9VLCtZhKEJXkF9raoaJctUog0', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'access', '2024-05-09 19:56:08', 0, '2024-05-09 09:56:08', '2024-05-09 09:56:08'),
(1252, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTVkMGQ3MC02NDlkLTRlMTMtYjRmYS1jY2JjNmVkZjUyMGYiLCJpYXQiOjE3MTUyNDg1NjgsImV4cCI6MTcxNzg0MDU2OCwidHlwZSI6InJlZnJlc2gifQ.Uy4hC0MYHa6XG4A8c3AIqBPM4H4jH1r19nSGlmtxN3E', '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'refresh', '2024-06-08 09:56:08', 0, '2024-05-09 09:56:08', '2024-05-09 09:56:08'),
(1253, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUyNTExMzUsImV4cCI6MTcxNTI4NzEzNSwidHlwZSI6ImFjY2VzcyJ9.yuH_WaFp6PJBiGIC-gq3jI8FzHD1VNx3_nDV4OXg2uY', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'access', '2024-05-09 20:38:55', 0, '2024-05-09 10:38:55', '2024-05-09 10:38:55'),
(1254, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYzVjYzA0MC1iNTFiLTRlYjAtOWFhMi00MTM2MTkzZTgyNDMiLCJpYXQiOjE3MTUyNTExMzUsImV4cCI6MTcxNzg0MzEzNSwidHlwZSI6InJlZnJlc2gifQ.LFxE1lsOoWAZQTN6S35tyo88tF84uXAfENUklzGpqyA', '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'refresh', '2024-06-08 10:38:55', 0, '2024-05-09 10:38:55', '2024-05-09 10:38:55');

-- --------------------------------------------------------

--
-- Table structure for table `userAssignDetails`
--

CREATE TABLE `userAssignDetails` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `AssignName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fileName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userAssignDetails`
--

INSERT INTO `userAssignDetails` (`id`, `uuid`, `AssignName`, `createdAt`, `updatedAt`, `fileName`) VALUES
(5, '2934dbc7-6c9e-46f5-bd32-328e6128209e', 'Fertilizers', '2024-04-03 11:56:27', '2024-04-03 11:56:27', 'file-eaf96970-d470-4ac9-a2aa-32dc494a0b74.pdf'),
(6, '5838189f-97f9-457d-89e4-039d1b303a81', 'Pesticides', '2024-04-03 12:02:47', '2024-04-03 12:02:47', 'file-3cbf8c91-d0e1-4cf8-886c-140d24fa79c5.pdf'),
(7, 'a0026f3d-8bc2-4408-af80-3763c66871b5', 'Pesticides2', '2024-04-03 12:04:11', '2024-04-03 12:04:11', 'file-6fbde5b3-9ea6-40b2-b16a-71c81416ff4b.pdf'),
(8, '63b199c0-81e2-4811-94fa-e87f51353353', 'Pesticides3', '2024-04-03 12:05:45', '2024-04-03 12:05:45', 'file-88261f0e-fb1d-4ed6-88eb-0bfaad9467f2.pdf'),
(9, '54a8597f-ce32-48fa-847c-dda6c8a623ac', 'Pesticides3', '2024-04-03 12:09:44', '2024-04-03 12:09:44', 'file-13a77aed-1a95-43c3-8a73-cf8ae85f7ce8.pdf'),
(10, 'ea07c615-a3f6-4106-bc0a-12e9cebbc592', 'Pesticides4', '2024-04-03 12:10:59', '2024-04-03 12:10:59', 'file-d64947d6-4e50-4529-a3d4-3f798edfe3d8.pdf'),
(12, 'df1976af-b268-4378-aa1e-d5aeb9a3a113', 'Seeds1', '2024-04-05 12:28:49', '2024-04-05 12:28:49', 'file-a7141d85-c434-474e-afbd-195947d4c3d1.pdf'),
(13, '7fa14a9c-19bc-496d-8921-b31f7af7bcad', 'dsaas', '2024-04-25 09:31:03', '2024-04-25 09:31:03', 'file-4895b11f-ddac-4da3-8dba-e87fa00da9a7.pdf'),
(14, 'c44f5354-fca0-4dbd-8354-91ca4b902087', 'Fertilizers3', '2024-05-08 12:40:52', '2024-05-08 12:40:52', 'file-286415b1-9d79-4f6c-93fe-92867e04fb2a.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `userAssignments`
--

CREATE TABLE `userAssignments` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `assignment` varchar(255) DEFAULT NULL,
  `deadlineDate` datetime DEFAULT NULL,
  `deadlineTime` time DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT 'status: 0 = By Teacher, 1 = By Student',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_Id` int(11) DEFAULT NULL,
  `userSubject_Id` int(11) DEFAULT NULL,
  `assign_Id` int(11) DEFAULT NULL,
  `submission` tinyint(1) DEFAULT '0' COMMENT 'submission: 0 = not submitted, 1 = submitted',
  `marks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userAssignments`
--

INSERT INTO `userAssignments` (`id`, `uuid`, `assignment`, `deadlineDate`, `deadlineTime`, `status`, `createdAt`, `updatedAt`, `user_Id`, `userSubject_Id`, `assign_Id`, `submission`, `marks`) VALUES
(2, '59cbebad-88aa-431e-b763-ee9a22d618ee', 'file-eaf96970-d470-4ac9-a2aa-32dc494a0b74.pdf', '2024-04-05 00:00:00', '17:20:00', 0, '2024-04-03 11:56:27', '2024-04-03 11:56:27', 163, 82, 5, 0, NULL),
(3, '418ca8d4-92db-4d20-a442-d24a8cbabad6', 'file-3cbf8c91-d0e1-4cf8-886c-140d24fa79c5.pdf', '2024-04-07 00:00:00', '05:32:00', 0, '2024-04-03 12:02:47', '2024-04-03 12:02:47', 163, 82, 6, 0, NULL),
(4, 'e2cf4622-70e8-40ba-9e7f-6e742eb604ba', 'file-6fbde5b3-9ea6-40b2-b16a-71c81416ff4b.pdf', '2024-04-07 00:00:00', '05:32:00', 0, '2024-04-03 12:04:11', '2024-04-03 12:04:11', 163, 82, 7, 0, NULL),
(5, 'b79bc46a-f2e0-4a2f-b4e6-5a20e884557c', 'file-88261f0e-fb1d-4ed6-88eb-0bfaad9467f2.pdf', '2024-04-07 00:00:00', '05:32:00', 0, '2024-04-03 12:05:45', '2024-04-03 12:05:45', 163, 82, 8, 0, NULL),
(6, 'dc786c30-0654-4c07-92f8-2599c9656d49', 'file-13a77aed-1a95-43c3-8a73-cf8ae85f7ce8.pdf', '2024-04-07 00:00:00', '05:32:00', 0, '2024-04-03 12:09:44', '2024-04-03 12:09:44', 163, 82, 9, 0, NULL),
(7, 'b136ae1f-e9a9-43d4-a3d6-d2b0978006eb', 'file-d64947d6-4e50-4529-a3d4-3f798edfe3d8.pdf', '2024-04-07 00:00:00', '05:32:00', 0, '2024-04-03 12:10:59', '2024-04-03 12:10:59', 163, 82, 10, 0, NULL),
(9, '183df3ef-83d4-4f24-b1db-9da92ef362b1', 'file-06c61d0d-b270-4724-9ca4-0dc8fab996a5.pdf', '2024-04-05 00:00:00', '12:36:57', 1, '2024-04-05 07:06:57', '2024-04-05 08:34:30', 160, 82, 5, 1, 30),
(10, '5ed1c9af-23b0-4a54-b3b6-09f91206ebe1', 'file-22fae334-4a59-4ce0-aa3e-add95329a2e8.pdf', '2024-04-05 00:00:00', '12:38:13', 1, '2024-04-05 07:08:13', '2024-05-06 11:26:27', 160, 82, 6, 1, 32),
(11, '258544ed-0287-4cbf-b090-e3bf7de4796a', 'file-753a17a5-634c-47ac-a4d6-9f33c9850cc6.pdf', '2024-04-05 00:00:00', '12:38:37', 1, '2024-04-05 07:08:37', '2024-04-05 08:39:44', 160, 82, 10, 1, 33),
(12, 'd0e940ca-8428-4bda-80e0-d3da21dacceb', 'file-a7141d85-c434-474e-afbd-195947d4c3d1.pdf', '2024-04-13 00:00:00', '17:58:00', 0, '2024-04-05 12:28:49', '2024-04-05 12:28:49', 163, 82, 12, 0, NULL),
(13, '015b049b-1a3e-4a43-96f7-f80d9d0e21ac', 'file-24511e1f-1223-4870-885f-33f410bc1a1b.pdf', '2024-04-05 00:00:00', '18:02:55', 1, '2024-04-05 12:32:55', '2024-04-05 12:32:55', 160, 82, 7, 0, NULL),
(14, '83a9b102-fef3-42ee-b310-42440b5db588', 'file-4248f122-242e-4fab-bd73-ee5624aafd4c.pdf', '2024-04-10 00:00:00', '15:52:12', 1, '2024-04-10 10:22:12', '2024-04-10 10:22:12', 160, 82, 8, 0, NULL),
(15, '77c68c55-693b-457b-a8a6-d1de7179f9f2', 'file-80369b04-56f5-4fb3-a260-e781d3622108.pdf', '2024-04-10 00:00:00', '16:00:15', 1, '2024-04-10 10:30:15', '2024-04-10 10:30:15', 163, 82, 9, 0, NULL),
(16, '532895b9-0758-4d78-8d24-0ef5bb3c7218', 'file-4895b11f-ddac-4da3-8dba-e87fa00da9a7.pdf', '2024-04-27 00:00:00', '03:00:00', 0, '2024-04-25 09:31:03', '2024-04-25 09:31:03', 163, 82, 13, 0, NULL),
(17, 'f1e81ea9-9cd8-4850-bc2b-b4a4ff5ba495', 'file-5f75f3fb-c994-4a43-835e-3b9e3535a154.pdf', '2024-04-25 00:00:00', '15:01:39', 1, '2024-04-25 09:31:39', '2024-04-25 09:31:39', 160, 82, 13, 0, NULL),
(18, 'b1c26c4c-62d1-4a36-a05b-fbe5f0db6750', 'file-286415b1-9d79-4f6c-93fe-92867e04fb2a.pdf', '2024-05-10 00:00:00', '18:10:00', 0, '2024-05-08 12:40:52', '2024-05-08 12:40:52', 163, 82, 14, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userCourses`
--

CREATE TABLE `userCourses` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `is_available` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userCourses`
--

INSERT INTO `userCourses` (`id`, `uuid`, `courseName`, `is_available`, `createdAt`, `updatedAt`) VALUES
(50, 'b22f45f1-c06e-4ce5-b4f7-73841146e4ff', 'B.tech', 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22'),
(51, '1f0f5fce-f81d-4fe4-876e-b92e8e43f79a', 'BCA', 0, '2024-04-01 10:53:06', '2024-04-01 10:53:06'),
(52, 'd325aaad-139e-4916-a7f8-f5fd666db2f9', 'Agriculture and Veterinary Medicine', 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02'),
(53, '0439fb13-902b-471b-8d75-1b3a4d413147', 'Applied and Pure Sciences', 0, '2024-04-01 11:04:39', '2024-04-01 11:04:39'),
(56, 'fed3022b-dfce-49e0-a75c-4480a4f69386', 'Business and Management', 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45'),
(57, '4ad62290-9f31-4a6b-8dde-fe6a13ac3866', 'Creative Arts and Design', 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58'),
(62, '92d21616-7683-4def-b049-f9298bf02680', 'B.Comm', 0, '2024-04-01 12:55:40', '2024-04-03 07:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `userMigrations`
--

CREATE TABLE `userMigrations` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `old_course_name` varchar(255) DEFAULT NULL,
  `new_course_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_first_name` varchar(255) DEFAULT NULL,
  `student_last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userMigrations`
--

INSERT INTO `userMigrations` (`id`, `uuid`, `old_course_name`, `new_course_name`, `createdAt`, `updatedAt`, `student_first_name`, `student_last_name`) VALUES
(1, '120b53c2-6ba8-4ece-8f36-beb8e2f71915', 'Creative Arts and Design', 'BCA', '2024-05-09 05:05:54', '2024-05-09 05:05:54', 'anastasia ', 'sharpe'),
(2, '92c62c67-17af-4237-a7b1-a125ed09d0b4', 'BCA', 'Creative Arts and Design', '2024-05-09 05:06:50', '2024-05-09 05:06:50', 'anastasia ', 'sharpe');

-- --------------------------------------------------------

--
-- Table structure for table `userQuizDetails`
--

CREATE TABLE `userQuizDetails` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `score` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quiz_Id` int(11) DEFAULT NULL,
  `user_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userQuizDetails`
--

INSERT INTO `userQuizDetails` (`uuid`, `score`, `createdAt`, `updatedAt`, `quiz_Id`, `user_Id`) VALUES
('15a47f0b-64e3-4969-bf4b-3ae7696a4650', '3.00', '2024-05-09 10:02:06', '2024-05-09 10:02:06', 6, 160);

-- --------------------------------------------------------

--
-- Table structure for table `userRoles`
--

CREATE TABLE `userRoles` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userRoles`
--

INSERT INTO `userRoles` (`id`, `uuid`, `createdAt`, `updatedAt`, `role_name`) VALUES
(2, 'dfafdcaer453bdfdh77869', '2024-02-29 05:22:24', '2024-03-01 11:24:29', 'Teacher'),
(3, '19bf6af8-d6eb-11ee-80c5-484d7eedc66e', '2024-02-29 15:39:40', '2024-03-01 08:23:26', 'Student'),
(4, 'ecab1de6-e064-11ee-80c5-484d7eedc66e', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Admin');

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
  `status` int(11) DEFAULT NULL COMMENT 'status: 0 = No subject, 1 = Subject Available',
  `email_verified` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `is_available` int(11) DEFAULT '0' COMMENT 'Availability status: 0 = Not Available, 1 = Available',
  `is_deleted` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `otp_generated` varchar(255) DEFAULT '0',
  `course_Id` int(11) DEFAULT NULL,
  `role_Id` int(11) DEFAULT NULL,
  `migration_Id` int(11) DEFAULT NULL,
  `about` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `first_name`, `last_name`, `email`, `password`, `status`, `email_verified`, `address`, `phone_number`, `is_available`, `is_deleted`, `createdAt`, `updatedAt`, `profile`, `otp_generated`, `course_Id`, `role_Id`, `migration_Id`, `about`) VALUES
(71, 'ff29943e-dbfd-4ffb-9072-588f10845b74', 'Bhanvi', 'gautam', 'bhanvigautam19@gmail.com', '$2a$08$Daut6ek5r9VAMSgNb/.2VumjWosiLhukXfGIWbvJa5wCIQS5ASDAq', 1, 0, 'https://www.naukri.com/code360/library/managerial-round-interview-questions', 2147483647, 1, 0, '2024-02-19 06:49:57', '2024-04-29 08:19:17', '', 'z8c69r', 0, 4, NULL, NULL),
(149, '18a17d40-2f4c-45b1-b21b-d03bf42341cb', 'ciara', 'ingram', 'lutuji@mailinator.com', '$2a$08$fT6pS5TSmVTRUZWdbfjnxOKMjfKqLYMdDofL6nTjLW6HI3JXe8sfO', 1, 0, 'https://github.com/sudheerj/reactjs-interview-questions', 2147483647, 1, 0, '2024-04-02 05:18:51', '2024-04-04 12:19:07', '', '0', 57, 3, NULL, NULL),
(160, '7a5d0d70-649d-4e13-b4fa-ccbc6edf520f', 'william', 'yates', 'xyvagom@mailinator.com', '$2a$08$KceWbBI4qY0G6Kf//ZCkOOusJSSTKAdJtQ7jMq/VIg4C.EIwNY59.', 1, 0, 'sit sequi dicta nece', 2147483647, 1, 0, '2024-04-02 11:33:42', '2024-05-03 04:47:28', '', '0', 52, 3, NULL, NULL),
(161, '20893fc6-c7c9-45ce-9f00-90d2b8ee39b6', 'fuller', 'donovan', 'sivin@mailinator.com', '$2a$08$k7qAD2q/NJeqWZU0DD8k6O84Zl01nN1Lc1qB.hUhI5Cj7BldU.Meq', 1, 0, 'minima sunt saepe te', 2147483647, 1, 0, '2024-04-02 11:34:20', '2024-05-08 12:39:06', 'file-48a3a81e-9d26-42bd-9620-9807bfdaa517.png', '0', 52, 3, NULL, NULL),
(162, '2ea17f07-9096-45aa-b77f-16cf7b7c9495', 'olga', 'fletcher', 'soqevyw@mailinator.com', '$2a$08$0NAlczNTq03uCBfKdLfRX.ZowEuECQ6XV.LR54r7xXHbuloMNJ0Pm', 1, 0, 'dolore praesentium t', 1986458636, 1, 0, '2024-04-02 11:34:57', '2024-05-08 11:56:39', 'file-1735e146-f49c-4f66-ab75-57feac3e5b29.png', '0', 50, 2, NULL, NULL),
(163, '1c5cc040-b51b-4eb0-9aa2-4136193e8243', 'sydney', 'higgins', 'fumu@mailinator.com', '$2a$08$FTI4H/vb3HCkU6U0iPSc/uMqm.sujnIQl2AfnNuFKo2MgbrsLUKhu', 1, 0, 'aut quis repellendus', 33614238, 1, 0, '2024-04-02 11:35:24', '2024-04-09 10:12:52', 'file-49743950-326d-4265-912c-671a2c22b9c7.png', '0', 52, 2, NULL, 'i am a teacher'),
(164, '649bdb34-b5ea-4bdd-a197-2a7725d72e99', 'violet', 'petty', 'fyfes@mailinator.com', '$2a$08$Zvgs1oriowykQVCJOMaWJu99T3.3df9Qq3.mW3Cl7p/hEDJMWG4ki', 1, 0, 'harum aspernatur in ', 2147483647, 0, 0, '2024-04-02 11:37:25', '2024-04-02 11:37:25', '', '0', 52, 2, NULL, NULL),
(165, '93bd4d8f-5c93-4372-abea-d6e284a91bb6', 'sydnee', 'hudson', 'wepoc@mailinator.com', '$2a$08$kLU3CHWj2BqHMwjFCfx4hei14fCeG1XNDBaumWGcKQjFzh8wLFS1e', 1, 0, 'enim odit voluptates', 2147483647, 1, 0, '2024-04-15 04:52:39', '2024-05-08 12:07:21', 'file-9ed50a8f-529e-44cb-bb41-8d1f24db735f.png', '0', 50, 3, NULL, ''),
(166, 'd2152f40-17c2-4652-9121-67fc39b4afe1', 'gay', 'callahan', 'nezijeqy@mailinator.com', '$2a$08$/WxJPuT8QPK0FkzCINYKRuZ1VaaudwW60RsFhRr5aXihkpPY.NwXO', 1, 0, 'aliqua corrupti ex', 2147483647, 0, 0, '2024-05-03 05:13:35', '2024-05-06 04:55:06', 'file-0b9ba620-7fa2-4a9a-bad0-4f136f123ea6.png', '0', 51, 3, NULL, ''),
(167, '157869e5-a397-45f0-8f98-640b6f4266ba', 'anastasia', 'sharpe', 'muzeqo@mailinator.com', '$2a$08$0BRxob.yiwRnMBfhPIbaHusB3NCM4ONsW3cbOPGIcTUuMgCgHuHo2', 1, 0, 'sequi saepe veniam ', 2147483647, 0, 0, '2024-05-03 05:14:16', '2024-05-09 05:06:50', 'file-3a7a3dfa-b21f-4a2d-856a-575c33569f9d.png', '0', 57, 3, 2, ''),
(168, '7821d600-172b-4f0d-8f36-f275753683e6', 'gil', 'parrish', 'goky@mailinator.com', '$2a$08$7sFDs5HzKVnizKf4lQxJiOxq5H8Af3uKpfBkTEJmPqT2c8sp704F.', 1, 0, 'soluta rem fuga sin', 2147483647, 0, 0, '2024-05-03 05:14:41', '2024-05-03 05:14:41', 'file-62b16a7f-10a5-45dd-a88b-51402d4aa1a6.png', '0', 62, 3, NULL, ''),
(169, '7da992d3-28a8-4486-a182-98406e6df6c1', 'shelley', 'hahn', 'xagil@mailinator.com', '$2a$08$GyhFPX.iolhY5FdrHcB1d.6uNF1kvjHCDK4oPejtOn74zb/pe5d1W', 1, 0, 'et odio quis consequ', 584932638, 0, 0, '2024-05-03 05:15:17', '2024-05-03 05:15:17', 'file-f0210eee-7f25-4656-9a41-b4285a1bca70.png', '0', 56, 3, NULL, ''),
(170, '0da434b1-6158-4f25-85f1-a0fc7b0a3e76', 'irma', 'perez', 'puhedetuda@mailinator.com', '$2a$08$FpLKPjGPhaUYfzSsRFyd2OGZfBceo6KB8NpUOLJ72UEw.f9wkyxRS', 1, 0, 'id nostrud ut incid', 658018331, 0, 0, '2024-05-03 05:15:41', '2024-05-03 05:22:38', 'file-effd8cba-c152-4e1d-acd3-ed24e23d3ba7.png', '0', 53, 3, NULL, ''),
(171, 'cfe22da4-0343-4cd4-8d8f-d3fd3258c253', 'yoshi', 'ayala', 'dycun@mailinator.com', '$2a$08$hbei/KWaL/IWT7xp.nVYT.GLKMY35vQfLRmri8M2H0H4Q5AC8rfNa', 1, 0, 'magna non aliqua au', 2147483647, 1, 0, '2024-05-03 05:20:31', '2024-05-08 12:07:30', 'file-411aeb0c-9f11-40a7-9e8a-490234b03193.png', '0', 56, 3, NULL, ''),
(172, 'ec2cf08b-5a21-4007-a9a0-8e6e277017db', 'anthony', 'robles', 'potuxarix@mailinator.com', '$2a$08$zboJs86VXxoAhDYff2SeNOvCQUg1enps/EDPphG6Du2rNYP7Lnzeu', 1, 0, 'nisi omnis voluptatu', 48537332, 1, 0, '2024-05-08 12:05:53', '2024-05-08 12:07:01', 'file-f637b815-bd82-47a8-bb1e-48115092e99d.png', '0', 50, 3, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `userSemesters`
--

CREATE TABLE `userSemesters` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `semesterNo` int(11) DEFAULT NULL,
  `is_available` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `course_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userSemesters`
--

INSERT INTO `userSemesters` (`id`, `uuid`, `semesterNo`, `is_available`, `createdAt`, `updatedAt`, `course_Id`) VALUES
(39, 'b22f45f1-c06e-4ce5-b4f7-73841146e4ff', 2, 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 50),
(40, 'b22f45f1-c06e-4ce5-b4f7-73841146e4ff', 3, 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 50),
(41, '1f0f5fce-f81d-4fe4-876e-b92e8e43f79a', 1, 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 51),
(42, '1f0f5fce-f81d-4fe4-876e-b92e8e43f79a', 2, 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 51),
(43, 'd325aaad-139e-4916-a7f8-f5fd666db2f9', 1, 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02', 52),
(44, 'd325aaad-139e-4916-a7f8-f5fd666db2f9', 2, 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02', 52),
(45, '0439fb13-902b-471b-8d75-1b3a4d413147', 1, 0, '2024-04-01 11:04:39', '2024-04-01 11:04:39', 53),
(49, 'fed3022b-dfce-49e0-a75c-4480a4f69386', 1, 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 56),
(50, 'fed3022b-dfce-49e0-a75c-4480a4f69386', 2, 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 56),
(51, '4ad62290-9f31-4a6b-8dde-fe6a13ac3866', 2, 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 57),
(52, '4ad62290-9f31-4a6b-8dde-fe6a13ac3866', 3, 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 57),
(58, '92d21616-7683-4def-b049-f9298bf02680', 2, 0, '2024-04-01 12:55:40', '2024-04-03 07:55:07', 62);

-- --------------------------------------------------------

--
-- Table structure for table `userSubjects`
--

CREATE TABLE `userSubjects` (
  `id` int(11) NOT NULL,
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `is_available` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `semester_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userSubjects`
--

INSERT INTO `userSubjects` (`id`, `uuid`, `subjectName`, `is_available`, `createdAt`, `updatedAt`, `semester_Id`) VALUES
(73, '3e42c50c-3139-4bb9-9cd3-6aa56394ebf7', 'Computer Programming', 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 39),
(74, '50d48cd6-0687-4751-9d95-071a03a22ad4', 'Energy and Environment', 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 39),
(75, '8191e832-4e26-4ec4-b66d-0bd9653f1247', 'Object Oriented Programming', 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 40),
(76, '62e1027b-3874-45e6-a2c9-f5ba59361029', 'Manufacturing Techniques', 0, '2024-04-01 10:37:29', '2024-04-03 07:58:22', 40),
(77, '3de1d91b-a9d5-4067-b202-f232dc6cd89b', 'Data Structures', 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 41),
(78, '93efa85a-ae00-44cc-8a9a-20ef5ff8630c', 'System Design', 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 41),
(79, 'b0904a83-d95d-4722-8318-26e5e443673e', 'Practical Computing', 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 42),
(80, 'e5139fd1-a1a8-43b5-88f7-36c1272556c0', 'Computer Architecture', 0, '2024-04-01 10:53:07', '2024-04-01 10:53:07', 42),
(81, '522c0320-5be1-4e98-a850-3dd1df5f40c2', 'Agriculture', 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02', 43),
(82, 'e33d79ea-b256-47d5-a4af-1d15607a6c24', 'Farm Management', 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02', 43),
(83, '85a0f707-c440-49cf-b489-bc7557571525', 'Horticulture', 0, '2024-04-01 10:56:02', '2024-04-01 10:56:02', 44),
(84, '1e4047ce-d3bc-48b6-bbc9-b1417b9d0fd9', 'Astronomy', 0, '2024-04-01 11:04:39', '2024-04-01 11:04:39', 45),
(85, '7146dd28-fb16-4593-a96b-3daedbf6cc2c', 'Physics', 0, '2024-04-01 11:04:39', '2024-04-01 11:04:39', 45),
(91, 'b6dd39eb-b268-4515-a940-855059689a6a', 'Accounting', 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 49),
(92, '9bef2376-9c20-4fbf-a100-279e443ddd1c', 'Entrepreneurship', 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 49),
(93, '36339683-da6c-481d-abb6-e3f2a608af6c', 'Business Studies', 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 50),
(94, '710705d3-27bc-4d3e-992c-9a60b0d03409', 'Finance', 0, '2024-04-01 11:46:45', '2024-04-01 11:46:45', 50),
(95, 'a3ed7f98-4d82-44d9-8024-11550c0f74d2', 'Art', 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 51),
(96, 'eda3f971-5404-4e62-85da-feccbee7f8d7', 'Industrial Design', 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 51),
(97, 'd7b677a0-9f7e-4c5e-b3a8-6b46da54ccdc', 'Crafts', 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 52),
(98, '5419fa54-1311-499e-9020-f4c2daf78381', 'Non-Industrial Design', 0, '2024-04-01 11:47:48', '2024-04-03 07:57:58', 52),
(105, '24d47ea5-5331-4480-b601-cf379f2ae84b', 'Accounts', 0, '2024-04-01 12:55:40', '2024-04-03 07:55:07', 58),
(106, 'cac4177e-5669-4260-bb30-837e5c42089b', 'Macro-Economics', 0, '2024-04-01 12:55:40', '2024-04-03 07:55:07', 58);

-- --------------------------------------------------------

--
-- Table structure for table `userTeacherDetails`
--

CREATE TABLE `userTeacherDetails` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `teacher_Id` int(11) DEFAULT NULL,
  `subject_Id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `userSubjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userTeacherDetails`
--

INSERT INTO `userTeacherDetails` (`uuid`, `teacher_Id`, `subject_Id`, `createdAt`, `updatedAt`, `userId`, `userSubjectId`) VALUES
('941749e5-9862-44eb-9137-3e22a14bbbb4', 143, 77, '2024-04-02 05:01:30', '2024-04-02 05:01:30', 143, 77),
('905a43d9-3fac-46c7-922e-d6e4b93c5fcd', 143, 79, '2024-04-02 05:01:30', '2024-04-02 05:01:30', 143, 79),
('1e106399-f4c4-4780-963f-167c0bfebc24', 144, 85, '2024-04-02 05:02:08', '2024-04-02 05:02:08', 144, 85),
('855a2272-391c-4c63-865b-187a8b6cdc6d', 145, 95, '2024-04-02 05:03:04', '2024-04-02 05:03:04', 145, 95),
('5e88843a-1df7-4fb0-95c2-aec8976aa0ec', 150, 92, '2024-04-02 05:35:14', '2024-04-02 05:35:14', 150, 92),
('e913392e-e92b-4c97-98ea-6d8d55c250e0', 150, 94, '2024-04-02 05:35:14', '2024-04-02 05:35:14', 150, 94),
('6829a8e6-d5e3-4634-9814-ff8f172ef92d', 151, 82, '2024-04-02 05:38:03', '2024-04-02 05:38:03', 151, 82),
('e61f1190-7d6b-4d88-9e4f-b5b232d169b9', 153, 77, '2024-04-02 05:42:16', '2024-04-02 05:42:16', 153, 77),
('de384241-c6e7-4c1d-8349-b715320e23c8', 162, 73, '2024-04-02 11:34:57', '2024-04-02 11:34:57', 162, 73),
('6340657f-a39d-4ce8-9698-d2f87dc5c89f', 162, 75, '2024-04-02 11:34:57', '2024-04-02 11:34:57', 162, 75),
('1de2ef70-0e2c-40f1-9fa4-a7442ac96c0a', 163, 82, '2024-04-02 11:35:24', '2024-04-02 11:35:24', 163, 82),
('7d54c72c-f601-4b27-87b7-2da604f4def3', 164, 82, '2024-04-02 11:37:25', '2024-04-02 11:37:25', 164, 82);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quizOptions`
--
ALTER TABLE `quizOptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_Id` (`question_Id`);

--
-- Indexes for table `quizQuestions`
--
ALTER TABLE `quizQuestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_Id` (`quiz_Id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_Id` (`subject_Id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userAssignDetails`
--
ALTER TABLE `userAssignDetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userAssignments`
--
ALTER TABLE `userAssignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_Id` (`user_Id`),
  ADD KEY `userSubject_Id` (`userSubject_Id`),
  ADD KEY `assign_Id` (`assign_Id`);

--
-- Indexes for table `userCourses`
--
ALTER TABLE `userCourses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userMigrations`
--
ALTER TABLE `userMigrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userQuizDetails`
--
ALTER TABLE `userQuizDetails`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `quiz_Id` (`quiz_Id`),
  ADD KEY `user_Id` (`user_Id`);

--
-- Indexes for table `userRoles`
--
ALTER TABLE `userRoles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_Id` (`course_Id`),
  ADD KEY `role_Id` (`role_Id`),
  ADD KEY `migration_Id` (`migration_Id`);

--
-- Indexes for table `userSemesters`
--
ALTER TABLE `userSemesters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_Id` (`course_Id`);

--
-- Indexes for table `userSubjects`
--
ALTER TABLE `userSubjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester_Id` (`semester_Id`);

--
-- Indexes for table `userTeacherDetails`
--
ALTER TABLE `userTeacherDetails`
  ADD PRIMARY KEY (`userId`,`userSubjectId`),
  ADD KEY `userSubjectId` (`userSubjectId`),
  ADD KEY `teacher_Id` (`teacher_Id`),
  ADD KEY `subject_Id` (`subject_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `quizOptions`
--
ALTER TABLE `quizOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `quizQuestions`
--
ALTER TABLE `quizQuestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1255;
--
-- AUTO_INCREMENT for table `userAssignDetails`
--
ALTER TABLE `userAssignDetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `userAssignments`
--
ALTER TABLE `userAssignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `userCourses`
--
ALTER TABLE `userCourses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `userMigrations`
--
ALTER TABLE `userMigrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `userRoles`
--
ALTER TABLE `userRoles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;
--
-- AUTO_INCREMENT for table `userSemesters`
--
ALTER TABLE `userSemesters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `userSubjects`
--
ALTER TABLE `userSubjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `quizOptions`
--
ALTER TABLE `quizOptions`
  ADD CONSTRAINT `quizOptions_ibfk_1` FOREIGN KEY (`question_Id`) REFERENCES `quizQuestions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `quizQuestions`
--
ALTER TABLE `quizQuestions`
  ADD CONSTRAINT `quizQuestions_ibfk_1` FOREIGN KEY (`quiz_Id`) REFERENCES `quizzes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`subject_Id`) REFERENCES `userSubjects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userAssignments`
--
ALTER TABLE `userAssignments`
  ADD CONSTRAINT `userAssignments_ibfk_162` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userAssignments_ibfk_163` FOREIGN KEY (`userSubject_Id`) REFERENCES `userSubjects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userAssignments_ibfk_164` FOREIGN KEY (`assign_Id`) REFERENCES `userAssignDetails` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userQuizDetails`
--
ALTER TABLE `userQuizDetails`
  ADD CONSTRAINT `userQuizDetails_ibfk_3` FOREIGN KEY (`quiz_Id`) REFERENCES `quizzes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userQuizDetails_ibfk_4` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_347` FOREIGN KEY (`course_Id`) REFERENCES `userCourses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_348` FOREIGN KEY (`role_Id`) REFERENCES `userRoles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_349` FOREIGN KEY (`migration_Id`) REFERENCES `userMigrations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userSemesters`
--
ALTER TABLE `userSemesters`
  ADD CONSTRAINT `userSemesters_ibfk_1` FOREIGN KEY (`course_Id`) REFERENCES `userCourses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userSubjects`
--
ALTER TABLE `userSubjects`
  ADD CONSTRAINT `userSubjects_ibfk_1` FOREIGN KEY (`semester_Id`) REFERENCES `userSemesters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userTeacherDetails`
--
ALTER TABLE `userTeacherDetails`
  ADD CONSTRAINT `userTeacherDetails_ibfk_127` FOREIGN KEY (`teacher_Id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userTeacherDetails_ibfk_128` FOREIGN KEY (`subject_Id`) REFERENCES `userSubjects` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
