-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 08:03 PM
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
-- Database: `ecomwebsite`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `a_id` int(11) NOT NULL,
  `a_username` varchar(50) NOT NULL,
  `a_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`a_id`, `a_username`, `a_password`) VALUES
(1, 'admin', 'password123');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `c_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`c_id`, `product_id`) VALUES
(266, 78),
(267, 79),
(270, 89),
(271, 90);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `o_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`o_id`, `product_id`, `date`, `price`, `status`) VALUES
(112, 78, '2024-02-22', 8999, 'paid'),
(113, 91, '2024-02-22', 7999, 'paid'),
(114, 90, '2024-02-22', 8999, 'paid'),
(115, 89, '2024-02-22', 7999, 'paid'),
(116, 102, '2024-02-22', 5999, 'paid'),
(117, 103, '2024-02-22', 6999, 'paid'),
(118, 104, '2024-02-22', 8999, 'paid'),
(119, 116, '2024-02-22', 1999, 'paid'),
(120, 121, '2024-02-22', 1999, 'paid'),
(121, 123, '2024-02-22', 1999, 'paid'),
(122, 130, '2024-02-22', 4999, 'paid'),
(123, 78, '2024-02-23', 8999, 'paid'),
(124, 90, '2024-02-23', 8999, 'paid'),
(125, 92, '2024-02-23', 5999, 'paid'),
(126, 94, '2024-02-23', 2999, 'paid'),
(127, 90, '2024-02-23', 8999, 'paid'),
(128, 97, '2024-02-23', 2599, 'paid'),
(129, 98, '2024-02-23', 2999, 'paid'),
(130, 100, '2024-02-23', 5999, 'paid'),
(131, 101, '2024-02-23', 5999, 'paid'),
(132, 105, '2024-02-23', 8999, 'paid'),
(133, 104, '2024-02-23', 8999, 'paid'),
(134, 116, '2024-02-23', 1999, 'paid'),
(135, 117, '2024-02-23', 3999, 'paid'),
(136, 118, '2024-02-23', 2999, 'paid'),
(137, 133, '2024-02-23', 2999, 'paid'),
(138, 132, '2024-02-24', 2999, 'paid'),
(139, 128, '2024-02-24', 3999, 'paid'),
(140, 129, '2024-02-24', 3999, 'paid'),
(141, 126, '2024-02-24', 3999, 'paid'),
(142, 118, '2024-02-24', 2999, 'paid'),
(143, 103, '2024-02-24', 6999, 'paid'),
(144, 104, '2024-02-24', 8999, 'paid'),
(145, 105, '2024-02-24', 8999, 'paid'),
(146, 102, '2024-02-24', 5999, 'paid'),
(147, 83, '2024-02-24', 3999, 'paid'),
(148, 84, '2024-02-24', 3999, 'paid'),
(149, 86, '2024-02-24', 2299, 'paid'),
(150, 88, '2024-02-24', 7999, 'paid'),
(151, 89, '2024-02-25', 7999, 'paid'),
(152, 90, '2024-02-25', 8999, 'paid'),
(153, 91, '2024-02-25', 7999, 'paid'),
(154, 92, '2024-02-25', 5999, 'paid'),
(155, 94, '2024-02-25', 2999, 'paid'),
(156, 102, '2024-02-25', 5999, 'paid'),
(157, 103, '2024-02-25', 6999, 'paid'),
(158, 104, '2024-02-25', 8999, 'paid'),
(159, 105, '2024-02-25', 8999, 'paid'),
(160, 115, '2024-02-25', 9999, 'paid'),
(161, 114, '2024-02-25', 4999, 'paid'),
(162, 116, '2024-02-25', 1999, 'paid'),
(163, 117, '2024-02-25', 3999, 'paid'),
(164, 118, '2024-02-25', 2999, 'paid'),
(165, 119, '2024-02-25', 1999, 'paid'),
(166, 133, '2024-02-26', 2999, 'paid'),
(167, 132, '2024-02-26', 2999, 'paid'),
(168, 128, '2024-02-26', 3999, 'paid'),
(169, 129, '2024-02-26', 3999, 'paid'),
(170, 130, '2024-02-26', 4999, 'paid'),
(171, 131, '2024-02-26', 2299, 'paid'),
(172, 115, '2024-02-26', 9999, 'paid'),
(173, 114, '2024-02-26', 4999, 'paid'),
(174, 110, '2024-02-26', 5999, 'paid'),
(175, 111, '2024-02-26', 2599, 'paid'),
(176, 112, '2024-02-26', 3599, 'paid'),
(177, 113, '2024-02-26', 3599, 'paid'),
(178, 109, '2024-02-26', 9999, 'paid'),
(179, 108, '2024-02-26', 7999, 'paid'),
(180, 94, '2024-02-26', 2999, 'paid'),
(181, 93, '2024-02-26', 2599, 'paid'),
(182, 91, '2024-02-26', 7999, 'paid'),
(183, 90, '2024-02-26', 8999, 'paid'),
(184, 89, '2024-02-26', 7999, 'paid'),
(185, 78, '2024-02-27', 8999, 'paid'),
(186, 79, '2024-02-27', 3999, 'paid'),
(187, 81, '2024-02-27', 2999, 'paid'),
(188, 82, '2024-02-27', 2999, 'paid'),
(189, 0, '2024-02-27', 3999, 'paid'),
(190, 84, '2024-02-27', 3999, 'paid'),
(191, 86, '2024-02-27', 2299, 'paid'),
(192, 97, '2024-02-27', 2599, 'paid'),
(193, 98, '2024-02-27', 2999, 'paid'),
(194, 100, '2024-02-27', 5999, 'paid'),
(195, 101, '2024-02-27', 5999, 'paid'),
(196, 116, '2024-02-27', 1999, 'paid'),
(197, 117, '2024-02-27', 3999, 'paid'),
(198, 118, '2024-02-27', 2999, 'paid'),
(199, 119, '2024-02-27', 1999, 'paid'),
(200, 121, '2024-02-27', 1999, 'paid'),
(201, 125, '2024-02-27', 1999, 'paid'),
(204, 79, '2024-02-28', 3999, 'paid'),
(205, 78, '2024-02-28', 8999, 'paid'),
(206, 78, '2024-02-28', 8999, 'paid'),
(207, 79, '2024-02-28', 3999, 'paid'),
(208, 81, '2024-02-28', 2999, 'paid'),
(209, 78, '2024-03-01', 8999, 'paid'),
(210, 106, '2024-03-01', 8999, 'paid'),
(211, 107, '2024-03-01', 7999, 'paid'),
(212, 78, '2024-03-04', 8999, 'unpaid'),
(213, 79, '2024-03-04', 3999, 'unpaid'),
(214, 81, '2024-03-04', 2999, 'unpaid');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `pay_id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`pay_id`, `orderId`, `type`, `date`, `amount`, `status`) VALUES
(15, 0, 'online', '2024-02-27', 8999, 'paid'),
(16, 0, 'online', '2024-02-27', 7999, 'paid'),
(17, 0, 'online', '2024-02-27', 8999, 'paid'),
(18, 0, 'online', '2024-02-27', 7999, 'paid'),
(19, 0, 'online', '2024-02-27', 5999, 'paid'),
(20, 0, 'online', '2024-02-27', 6999, 'paid'),
(21, 0, 'online', '2024-02-27', 8999, 'paid'),
(22, 0, 'online', '2024-02-27', 1999, 'paid'),
(23, 0, 'online', '2024-02-27', 1999, 'paid'),
(24, 0, 'online', '2024-02-27', 1999, 'paid'),
(25, 0, 'online', '2024-02-27', 4999, 'paid'),
(42, 0, 'online', '2024-02-28', 8999, 'paid'),
(43, 0, 'online', '2024-02-28', 7999, 'paid'),
(44, 0, 'online', '2024-02-28', 1999, 'paid'),
(45, 0, 'online', '2024-02-28', 1999, 'paid'),
(46, 0, 'online', '2024-02-28', 1999, 'paid'),
(47, 0, 'online', '2024-02-28', 8999, 'paid'),
(48, 0, 'online', '2024-02-28', 7999, 'paid'),
(49, 0, 'online', '2024-02-28', 7999, 'paid'),
(50, 0, 'online', '2024-02-28', 8999, 'paid'),
(51, 0, 'online', '2024-02-28', 7999, 'paid'),
(52, 0, 'online', '2024-02-28', 8999, 'paid'),
(53, 0, 'online', '2024-02-28', 8999, 'paid'),
(54, 0, 'online', '2024-02-28', 7999, 'paid'),
(55, 0, 'online', '2024-02-28', 5999, 'paid'),
(56, 0, 'online', '2024-02-28', 6999, 'paid'),
(57, 0, 'online', '2024-02-28', 8999, 'paid'),
(58, 0, 'online', '2024-02-28', 1999, 'paid'),
(59, 0, 'online', '2024-02-28', 4999, 'paid'),
(60, 0, 'online', '2024-02-28', 8999, 'paid'),
(61, 0, 'online', '2024-02-28', 8999, 'paid'),
(62, 0, 'online', '2024-02-28', 3999, 'paid'),
(63, 0, 'online', '2024-02-28', 3999, 'paid'),
(64, 0, 'online', '2024-02-28', 8999, 'paid'),
(65, 0, 'online', '2024-02-28', 3999, 'paid'),
(66, 0, 'online', '2024-03-01', 8999, 'paid'),
(67, 0, 'online', '2024-03-04', 8999, 'paid'),
(68, 81, 'online', '2024-03-04', 2999, 'paid'),
(69, 81, 'online', '2024-03-04', 2999, 'paid'),
(70, 212, 'online', '2024-03-04', 8999, 'paid'),
(71, 113, 'online', '2024-03-04', 7999, 'paid'),
(72, 114, 'online', '2024-03-04', 8999, 'paid'),
(73, 115, 'online', '2024-03-04', 7999, 'paid'),
(74, 116, 'online', '2024-03-04', 5999, 'paid'),
(75, 214, 'online', '2024-03-04', 2999, 'paid'),
(76, 213, 'online', '2024-03-04', 3999, 'paid'),
(77, 214, 'online', '2024-03-04', 2999, 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `p_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `category` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_id`, `title`, `image`, `description`, `category`, `price`) VALUES
(78, 'Nike Air max solo', 'image_1709052208954.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 8999),
(79, 'Nike Pegasus 89', 'image_1709052272356.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 3999),
(81, 'Nike Airforce 1', 'image_1709052390515.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2999),
(82, 'Nike Airforce 1', 'image_1709052431028.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2999),
(83, 'Nike Jordan 1', 'image_1709052455523.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 3999),
(84, 'Nike Jordan 1', 'image_1709052478434.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 3999),
(86, 'Nike Downshifter 12', 'image_1709052587523.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2299),
(88, 'Nike Invincible 3', 'image_1709052810119.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 7999),
(89, 'Nike Invincible 3', 'image_1709052838602.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 7999),
(90, 'Nike Juniper Trail', 'image_1709052876208.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 8999),
(91, 'Nike Pegasus 40', 'image_1709052947523.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 7999),
(92, 'Nike Fly 3', 'image_1709053217327.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 5999),
(93, 'Nike Revolution 6', 'image_1709053258071.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2599),
(94, 'Nike Revolution 7', 'image_1709053279160.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2999),
(95, 'Nike Revolution 7', 'image_1709053312537.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2999),
(96, 'Nike Revolution 7', 'image_1709053340888.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'men', 2999),
(97, 'Nike Downshifter 12', 'image_1709053403439.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 2599),
(98, 'Nike Downshifter 13', 'image_1709053427960.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 2999),
(100, 'Nike Infitnityrn 4', 'image_1709053507519.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 5999),
(101, 'Nike Infinityrn 4', 'image_1709053535689.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 5999),
(102, 'Nike Infinityrn 4', 'image_1709053581407.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 5999),
(103, 'Nike Interact run', 'image_1709053615818.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 6999),
(104, 'Nike Invincible 3', 'image_1709053656634.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 8999),
(105, 'Nike Invincible 3', 'image_1709053680283.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 8999),
(106, 'Nike Invincible 3', 'image_1709053717569.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 8999),
(107, 'Nike Pegasus 40', 'image_1709053749808.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 7999),
(108, 'Nike Pegasus 40', 'image_1709053780762.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 7999),
(109, 'Nike Pegasus Trail', 'image_1709053840047.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 9999),
(110, 'Nike Quest 5', 'image_1709053870456.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 5999),
(111, 'Nike Revolution 6', 'image_1709053899729.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 2599),
(112, 'Nike Revolution 7', 'image_1709053918180.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 3599),
(113, 'Nike Revolution 7', 'image_1709053945584.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 3599),
(114, 'Nike Swift 3', 'image_1709053976674.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 4999),
(115, 'Nike Streakfly', 'image_1709054001008.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'women', 9999),
(116, 'Nike Air zoom', 'image_1709054058750.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(117, 'Nike Flex plus', 'image_1709054097232.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 3999),
(118, 'Nike Infinity flow', 'image_1709054120669.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 2999),
(119, 'Nike Jordan 1', 'image_1709054141260.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(120, 'Nike Jordan 1', 'image_1709054167884.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(121, 'Nike Jordan 1', 'image_1709054181349.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(122, 'Nike Jordan 1', 'image_1709054198823.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(123, 'Nike Jordan 1', 'image_1709054211427.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(124, 'Nike Jordan 1', 'image_1709054229717.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(125, 'Nike Jordan 1', 'image_1709054243913.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 1999),
(126, 'Nike Jordan 3', 'image_1709054267894.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 3999),
(127, 'Nike Jordan 23', 'image_1709054322856.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 3999),
(128, 'Nike Jordan 23', 'image_1709054475899.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 3999),
(129, 'Nike Jordan Max', 'image_1709054497909.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 3999),
(130, 'Nike Omni Court', 'image_1709054534888.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 4999),
(131, 'Nike Revolution 7', 'image_1709054562781.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 2299),
(132, 'Nike Start runner 4', 'image_1709054601498.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 2999),
(133, 'Nike Start runner 4', 'image_1709054611417.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eu neque cursus ullamcorper. Nulla facilisi. Mauris efficitur augue eget diam accumsan, ', 'kids', 2999);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `fname`, `lname`, `mail`, `pass`) VALUES
(39, 'User', 'S', 'user@gmail.com', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `w_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`w_id`, `product_id`) VALUES
(57, 92),
(58, 91),
(59, 115),
(62, 90);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`w_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
