-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20230116.e2bda4fb48
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2023 at 01:45 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `master`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0-inactive, 1-active, 2-occupied, 3 - cancelled',
  `booked_by` int(16) NOT NULL,
  `booking_type` tinyint(1) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `emp_id`, `seat_id`, `date`, `shift_id`, `status`, `booked_by`, `booking_type`, `time_stamp`) VALUES
(1, 1, 1, '2022-12-14', 2, 1, 1, 0, '2022-12-13 12:45:43'),
(2, 1, 2, '2022-12-15', 1, 2, 1, 0, '2022-12-14 12:01:12'),
(4, 6, 1, '2022-12-15', 2, 1, 6, 0, '2022-12-14 11:00:18'),
(5, 1, 5, '2022-12-15', 2, 1, 1, 0, '2022-12-14 12:13:24'),
(6, 4, 3, '2022-12-15', 2, 1, 4, 0, '2022-12-14 12:13:51'),
(7, 1, 1, '2022-12-16', 2, 1, 1, 0, '2022-12-15 15:50:14'),
(8, 1, 1, '2022-12-17', 2, 1, 1, 0, '2022-12-16 15:34:56'),
(9, 1, 1, '2023-01-03', 1, 1, 1, 0, '2023-01-02 15:04:24'),
(10, 1, 15, '2023-01-07', 1, 1, 1, 0, '2023-01-06 12:11:14');

-- --------------------------------------------------------

--
-- Table structure for table `booking_rules`
--

CREATE TABLE `booking_rules` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `maximum_booking_time` int(11) NOT NULL,
  `minimum_booking_time` int(11) NOT NULL,
  `maximum_slot` tinyint(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_rules`
--

INSERT INTO `booking_rules` (`id`, `type`, `maximum_booking_time`, `minimum_booking_time`, `maximum_slot`) VALUES
(1, 'regular', 6, 48, NULL),
(3, 'advance', 168, 48, 3);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `table_id` int(11) DEFAULT NULL,
  `type` tinyint(4) NOT NULL COMMENT '0-Vaccant,1-Windows,2-MAC',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `booked_by` int(11) DEFAULT NULL,
  `booked_at` datetime DEFAULT NULL,
  `booked_status` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`id`, `name`, `table_id`, `type`, `created_by`, `created_at`, `booked_by`, `booked_at`, `booked_status`, `is_active`) VALUES
(1, 'ws-seat1', 1, 0, 1, NULL, NULL, NULL, NULL, 0),
(2, 'ws-seat2', 1, 0, 1, NULL, NULL, NULL, NULL, 0),
(3, 'ws-seat3', 2, 0, 1, NULL, NULL, NULL, NULL, 0),
(4, 'ws-seat4', 2, 0, 1, NULL, NULL, NULL, NULL, 0),
(5, 'ws-seat5', 3, 0, 1, NULL, NULL, NULL, NULL, 0),
(6, 'ws-seat6', 3, 0, 1, NULL, NULL, NULL, NULL, 0),
(7, 'ws-seat7', 3, 0, 1, NULL, NULL, NULL, NULL, 0),
(8, 'ws-seat8', 4, 0, 1, NULL, NULL, NULL, NULL, 0),
(9, 'ws-seat9', 4, 0, 1, NULL, NULL, NULL, NULL, 0),
(10, 'ws-seat10', 4, 0, 1, NULL, NULL, NULL, NULL, 0),
(11, 'ws-seat11', 5, 0, 1, NULL, NULL, NULL, NULL, 0),
(12, 'ws-seat12', 5, 0, 1, NULL, NULL, NULL, NULL, 0),
(13, 'ws-seat13', 5, 0, 1, NULL, NULL, NULL, NULL, 0),
(14, 'ws-seat14', 6, 0, 1, NULL, NULL, NULL, NULL, 0),
(15, 'ws-seat15', 6, 0, 1, NULL, NULL, NULL, NULL, 0),
(16, 'ws-seat16', 6, 0, 1, NULL, NULL, NULL, NULL, 0),
(17, 'ws-seat17', 6, 0, 1, NULL, NULL, NULL, NULL, 0),
(18, 'ws-seat18', 7, 0, 1, NULL, NULL, NULL, NULL, 0),
(19, 'ws-seat19', 7, 0, 1, NULL, NULL, NULL, NULL, 0),
(20, 'ws-seat20', 7, 0, 1, NULL, NULL, NULL, NULL, 0),
(21, 'ws-seat21', 7, 0, 1, NULL, NULL, NULL, NULL, 0),
(22, 'ws-seat22', 8, 0, 1, NULL, NULL, NULL, NULL, 0),
(23, 'ws-seat23', 8, 0, 1, NULL, NULL, NULL, NULL, 0),
(24, 'ws-seat24', 8, 0, 1, NULL, NULL, NULL, NULL, 0),
(25, 'ws-seat25', 8, 0, 1, NULL, NULL, NULL, NULL, 0),
(26, 'ws-seat26', 9, 0, 1, NULL, NULL, NULL, NULL, 0),
(27, 'ws-seat27', 9, 0, 1, NULL, NULL, NULL, NULL, 0),
(28, 'ws-seat28', 9, 0, 1, NULL, NULL, NULL, NULL, 0),
(29, 'ws-seat29', 9, 0, 1, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` int(11) NOT NULL,
  `shift_name` varchar(20) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id`, `shift_name`, `start_time`, `end_time`) VALUES
(1, 'APAC', '06:00:00', '14:30:00'),
(2, 'EMAC', '14:30:00', '23:00:00'),
(3, 'EMEA', '23:00:00', '07:00:00'),
(4, 'GMEA', '11:00:00', '06:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `wing_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `name`, `wing_id`, `created_by`, `created_at`, `is_active`) VALUES
(1, 'ws1', 1, 1, NULL, 0),
(2, 'ws2', 1, 1, NULL, 0),
(3, 'ws3', 2, 1, NULL, 0),
(4, 'ws4', 2, 1, NULL, 0),
(5, 'ws5', 2, 1, NULL, 0),
(6, 'ws6', 3, 1, NULL, 0),
(7, 'ws7', 3, 1, NULL, 0),
(8, 'ws8', 3, 1, NULL, 0),
(9, 'ws9', 3, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `table_settings`
--

CREATE TABLE `table_settings` (
  `id` int(11) NOT NULL,
  `table_seat_count` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0-Active,1-In Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(16) DEFAULT NULL,
  `employee_name` varchar(255) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `confirm_password` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `is_status` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emp_id`, `employee_name`, `email_id`, `password`, `confirm_password`, `created_by`, `created_at`, `is_status`, `updated_by`, `updated_at`) VALUES
(1, 'T10149', 'Jay', 'raj.m@hogarth.com', 'raj.m@hogarth.com', '$2a$08$hoYbkAo4dsj9mYM3/29lpOYFTG1tuftAmvqcI/eE5w9EwUm25Azuy', NULL, '2022-11-17 13:43:57', 1, NULL, '2022-11-17 13:43:57'),
(2, 'T10150', 'Raj', 'jayaraj.m@hogarth.com', 'jayaraj.m@hogarth.com', '$2a$08$GtFiyRfTCgZLpxQse7JU3u2hgQ7OKg42cYt9wye2ESkGHwQSnbplu', NULL, '2022-11-17 13:44:48', 1, NULL, '2022-11-17 13:44:48'),
(3, 'T10152', 'Bharathi', 'Bha.m@hogarth.com', 'Bha.m@hogarth.com', '$2a$08$MZEDzxBgdjMgErLQsbt0PeQBZsgJ.rdU/Fbpz2om45tVOISU6wrVC', NULL, '2022-10-17 19:58:04', 1, NULL, '2022-11-17 19:58:04'),
(4, 'T10153', 'Vijay', 'vijay@hogarth.com', 'vijay@hogarth.com', '$2a$08$eVxgD.vG8cGmQ8uptruCOuJMCU4lAWsRL9/Tx/wNkI6qOZ41P63Dm', NULL, '2022-10-17 19:58:27', 1, NULL, '2022-11-17 19:58:27'),
(5, 'T10154', 'John', 'John@hogarth.com', 'John@hogarth.com', '$2a$08$sDQLwAHubCykzKrGOtzWUO2dwdiCScL8B1VEpkVk9OJ6Lt7sO3CSe', NULL, '2022-01-17 19:58:48', 1, NULL, '2022-11-17 19:58:48'),
(6, 'T10160', 'Digu', 'Digu@hogarth.com', 'Digu@hogarth.com', '$2a$08$doNSNG3Zzxo6jKyogIv9UOnTmows3ukWlpph55FNKDLkvn0xwTBNy', NULL, '2022-02-17 20:01:30', 1, NULL, '2022-11-17 20:01:30'),
(7, 'T10170', 'Sekar', 'Sekar@hogarth.com', 'Sekar@hogarth.com', '$2a$08$w5LHdXd6NJqAOgxkCvjkVe/sBoMCKz2/pM4j3pjaw3M99uiujhXJG', NULL, '2022-03-17 20:01:53', 1, NULL, '2022-11-17 20:01:53'),
(8, 'T10180', 'Jey', 'Jey@hogarth.com', 'Jey@hogarth.com', '$2a$08$AEJdF8sqBwAVhIHojYK8TuV1u40R5SgfWTT2IQ1IpKKmu39J9pD6e', NULL, '2022-12-17 20:02:16', 1, NULL, '2022-11-17 20:02:16');

-- --------------------------------------------------------

--
-- Table structure for table `wings`
--

CREATE TABLE `wings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `total_tables` int(11) DEFAULT NULL,
  `total_seats` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wings`
--

INSERT INTO `wings` (`id`, `name`, `total_tables`, `total_seats`, `created_by`, `created_at`, `updated_by`, `updated_at`, `is_active`) VALUES
(1, 'Digital', 2, 2, 1, NULL, NULL, NULL, 0),
(2, 'HR', 3, 3, 1, NULL, NULL, NULL, 0),
(3, 'New', 4, 4, 1, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shift_name` (`shift_id`),
  ADD KEY `user_emp_id` (`emp_id`),
  ADD KEY `wing_seat_id` (`seat_id`),
  ADD KEY `booked_by_id` (`booked_by`);

--
-- Indexes for table `booking_rules`
--
ALTER TABLE `booking_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seat_table_id` (`table_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wing_table_id` (`wing_id`);

--
-- Indexes for table `table_settings`
--
ALTER TABLE `table_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wings`
--
ALTER TABLE `wings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wings_created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `booking_rules`
--
ALTER TABLE `booking_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `table_settings`
--
ALTER TABLE `table_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `wings`
--
ALTER TABLE `wings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booked_by_id` FOREIGN KEY (`booked_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `shift_name` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`id`),
  ADD CONSTRAINT `user_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wing_seat_id` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`);

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seat_table_id` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`);

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `wing_table_id` FOREIGN KEY (`wing_id`) REFERENCES `wings` (`id`);

--
-- Constraints for table `wings`
--
ALTER TABLE `wings`
  ADD CONSTRAINT `wings_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
