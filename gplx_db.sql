-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2024 at 03:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gplx_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chapter`
--

CREATE TABLE `tbl_chapter` (
  `id` varchar(36) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tbl_chapter`
--

INSERT INTO `tbl_chapter` (`id`, `code`, `name`, `description`, `quantity`) VALUES
('abaa731e-c0cf-4bbc-99ca-ef2cd7b76ac1', '29atSXkK', 'Khái niệm và quy tắc giao thông 2', '1', 12);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exam`
--

CREATE TABLE `tbl_exam` (
  `id` varchar(36) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_exam_question`
--

CREATE TABLE `tbl_exam_question` (
  `id` varchar(36) NOT NULL,
  `examId` varchar(36) DEFAULT NULL,
  `questionId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_question`
--

CREATE TABLE `tbl_question` (
  `id` varchar(36) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `questionImage` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `chapterId` varchar(36) DEFAULT NULL,
  `option_1` text DEFAULT NULL,
  `option_2` text DEFAULT NULL,
  `option_3` text DEFAULT NULL,
  `option_4` text DEFAULT NULL,
  `trueanswer` int(1) DEFAULT NULL,
  `isDanger` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` varchar(36) NOT NULL,
  `avatar` blob DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_exam`
--

CREATE TABLE `tbl_user_exam` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `examId` varchar(36) DEFAULT NULL,
  `doneDate` date DEFAULT NULL,
  `point` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_wrong_question`
--

CREATE TABLE `tbl_user_wrong_question` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `examId` varchar(36) DEFAULT NULL,
  `questionId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_chapter`
--
ALTER TABLE `tbl_chapter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_exam`
--
ALTER TABLE `tbl_exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_exam_question`
--
ALTER TABLE `tbl_exam_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examId` (`examId`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tbl_question`
--
ALTER TABLE `tbl_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapterId` (`chapterId`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user_exam`
--
ALTER TABLE `tbl_user_exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `examId` (`examId`);

--
-- Indexes for table `tbl_user_wrong_question`
--
ALTER TABLE `tbl_user_wrong_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `examId` (`examId`),
  ADD KEY `questionId` (`questionId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_exam_question`
--
ALTER TABLE `tbl_exam_question`
  ADD CONSTRAINT `tbl_exam_question_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `tbl_exam` (`id`),
  ADD CONSTRAINT `tbl_exam_question_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `tbl_question` (`id`);

--
-- Constraints for table `tbl_question`
--
ALTER TABLE `tbl_question`
  ADD CONSTRAINT `tbl_question_ibfk_1` FOREIGN KEY (`chapterId`) REFERENCES `tbl_chapter` (`id`);

--
-- Constraints for table `tbl_user_exam`
--
ALTER TABLE `tbl_user_exam`
  ADD CONSTRAINT `tbl_user_exam_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `tbl_user_exam_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `tbl_exam` (`id`);

--
-- Constraints for table `tbl_user_wrong_question`
--
ALTER TABLE `tbl_user_wrong_question`
  ADD CONSTRAINT `tbl_user_wrong_question_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `tbl_user_wrong_question_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `tbl_exam` (`id`),
  ADD CONSTRAINT `tbl_user_wrong_question_ibfk_3` FOREIGN KEY (`questionId`) REFERENCES `tbl_question` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
