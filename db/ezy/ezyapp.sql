-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 16 sep. 2025 à 20:07
-- Version du serveur : 5.7.41
-- Version de PHP : 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ezyapp`
--

-- --------------------------------------------------------

--
-- Structure de la table `ezy_blocks`
--

CREATE TABLE `ezy_blocks` (
  `id` int(10) NOT NULL,
  `blockId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumb` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `component` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` json DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ezy_blocks`
--

INSERT INTO `ezy_blocks` (`id`, `blockId`, `name`, `thumb`, `component`, `data`, `state`) VALUES
(1, NULL, 'Text and image', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dpyyAtfvnWjgunpOtOE_JClHa5Ajc7xYgg&s', 'TextImage', '{\"childrens\": [], \"component\": \"TextImage\", \"elementId\": 3, \"elementData\": {\"name\": \"TestBlock12\", \"type\": \"block\", \"styles\": \"padding: 5rem 2rem; background-color: orange;\", \"classes\": \"\", \"content\": {\"text\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. \", \"image\": {\"alt\": \"texte alternative\", \"url\": \"https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg\"}, \"title\": \"Here the suuuper title\", \"with_bg\": true, \"btn_link\": \"boo\", \"btn_label\": \"click me\", \"image_position\": \"right\"}}}', 'active'),
(2, NULL, 'Hero', 'https://media.istockphoto.com/id/1021908014/photo/word-writing-text-free-sample-business-concept-for-portion-of-products-given-to-consumers-in.jpg?s=612x612&w=0&k=20&c=eAgjkxxxb4UcD2XgFSuOF6ALXHPkcwB-iOpi71wnmqc=', 'Hero', '{\"childrens\": [], \"component\": \"Hero\", \"elementId\": 3, \"elementData\": {\"name\": \"TestBlock12\", \"type\": \"block\", \"styles\": \"padding: 5rem 2rem; background-color: orange;\", \"classes\": \"\", \"content\": {\"text\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. \", \"image\": {\"alt\": \"texte alternative\", \"url\": \"https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg\"}, \"title\": \"Here the suuuper title\", \"with_bg\": true, \"btn_link\": \"boo\", \"btn_label\": \"click me\", \"image_position\": \"right\"}}}', 'active'),
(3, 'kjhkh', 'Faqs', 'https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg', 'Faqs', '{\"childrens\": [], \"component\": \"Faqs\", \"elementId\": 3, \"elementData\": {\"name\": \"TestBlock12\", \"type\": \"block\", \"styles\": \"padding: 5rem 2rem; background-color: orange;\", \"classes\": \"\", \"content\": {\"items\": [{\"answer\": \"First answer\", \"question\": \"First question\"}, {\"answer\": \"Second answer\", \"question\": \"Second question\"}, {\"answer\": \"Thirst answer\", \"question\": \"Thirst question\"}], \"title\": \"Faqs block\"}}}', 'active');

-- --------------------------------------------------------

--
-- Structure de la table `ezy_elements`
--

CREATE TABLE `ezy_elements` (
  `id` int(10) NOT NULL,
  `elementId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ezy_images`
--

CREATE TABLE `ezy_images` (
  `id` int(100) NOT NULL,
  `imageId` varchar(100) NOT NULL,
  `imageName` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `alt` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ezy_images`
--

INSERT INTO `ezy_images` (`id`, `imageId`, `imageName`, `url`, `alt`) VALUES
(29, 'testId', 'Capture d’écran du 2024-11-08 12-26-24.png', 'Capture d’écran du 2024-11-08 12-26-24.png', ''),
(30, 'testId', 'storeloc-holder.png', 'storeloc-holder.png', ''),
(31, 'testId', 'Capture d’écran du 2024-11-06 11-28-34.png', 'Capture d’écran du 2024-11-06 11-28-34.png', ''),
(32, 'testId', 'storeloc-holder.png', 'storeloc-holder.png', ''),
(33, 'testId', 'Capture d’écran du 2024-10-31 12-30-50.png', 'Capture d’écran du 2024-10-31 12-30-50.png', ''),
(34, 'testId', 'Capture d’écran du 2024-11-13 11-00-56.png', 'Capture d’écran du 2024-11-13 11-00-56.png', ''),
(35, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(36, 'testId', 'Capture d’écran du 2024-11-13 20-09-13.png', 'Capture d’écran du 2024-11-13 20-09-13.png', ''),
(37, 'testId', 'Capture d’écran du 2024-11-13 15-35-31.png', 'Capture d’écran du 2024-11-13 15-35-31.png', ''),
(38, 'testId', 'Capture d’écran du 2024-11-13 10-57-06.png', 'Capture d’écran du 2024-11-13 10-57-06.png', ''),
(39, 'testId', 'Capture d’écran du 2024-11-13 11-00-56.png', 'Capture d’écran du 2024-11-13 11-00-56.png', ''),
(40, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(41, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(42, 'testId', 'Capture d’écran du 2024-11-13 20-09-13.png', 'Capture d’écran du 2024-11-13 20-09-13.png', ''),
(43, 'testId', 'Capture d’écran du 2024-11-13 20-09-13.png', 'Capture d’écran du 2024-11-13 20-09-13.png', ''),
(44, 'testId', 'Capture d’écran du 2024-11-13 20-09-13.png', 'Capture d’écran du 2024-11-13 20-09-13.png', ''),
(45, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(46, 'testId', 'Capture d’écran du 2024-11-13 11-00-56.png', 'Capture d’écran du 2024-11-13 11-00-56.png', ''),
(47, 'testId', 'Capture d’écran du 2024-10-31 12-30-50.png', 'Capture d’écran du 2024-10-31 12-30-50.png', ''),
(48, 'testId', 'Capture d’écran du 2024-10-31 12-30-50.png', 'Capture d’écran du 2024-10-31 12-30-50.png', ''),
(49, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(50, 'testId', 'Capture d’écran du 2024-11-06 11-28-34.png', 'Capture d’écran du 2024-11-06 11-28-34.png', ''),
(51, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(52, 'testId', 'Capture d’écran du 2024-11-08 12-26-24.png', 'Capture d’écran du 2024-11-08 12-26-24.png', ''),
(53, 'testId', 'Capture d’écran du 2024-11-13 10-57-06.png', 'Capture d’écran du 2024-11-13 10-57-06.png', ''),
(54, 'testId', 'Capture d’écran du 2024-10-31 16-11-38.png', 'Capture d’écran du 2024-10-31 16-11-38.png', ''),
(55, 'testId', 'Capture d’écran du 2024-11-13 15-35-31.png', 'Capture d’écran du 2024-11-13 15-35-31.png', ''),
(56, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(57, 'testId', 'marker2.png', 'marker2.png', ''),
(58, 'testId', 'storeloc-holder.png', 'storeloc-holder.png', ''),
(59, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(60, 'testId', 'Capture d’écran du 2024-11-13 10-57-06.png', 'Capture d’écran du 2024-11-13 10-57-06.png', ''),
(61, 'testId', 'marker2.png', 'marker2.png', ''),
(62, 'testId', 'Capture d’écran du 2024-10-31 16-11-38.png', 'Capture d’écran du 2024-10-31 16-11-38.png', ''),
(63, 'testId', 'Capture d’écran du 2024-11-13 10-57-06.png', 'Capture d’écran du 2024-11-13 10-57-06.png', ''),
(64, 'testId', 'Capture d’écran du 2024-10-31 16-11-38.png', 'Capture d’écran du 2024-10-31 16-11-38.png', ''),
(65, 'testId', 'marker2.png', 'marker2.png', ''),
(66, 'testId', 'Capture d’écran du 2024-11-13 11-00-56.png', 'Capture d’écran du 2024-11-13 11-00-56.png', ''),
(67, 'testId', 'Capture d’écran du 2024-10-31 12-30-50.png', 'Capture d’écran du 2024-10-31 12-30-50.png', ''),
(68, 'testId', 'Capture d’écran du 2024-11-13 15-35-31.png', 'Capture d’écran du 2024-11-13 15-35-31.png', ''),
(69, 'testId', 'Capture d’écran du 2024-11-13 10-57-06.png', 'Capture d’écran du 2024-11-13 10-57-06.png', ''),
(70, 'testId', 'Capture d’écran du 2024-10-31 16-11-38.png', 'Capture d’écran du 2024-10-31 16-11-38.png', ''),
(71, 'testId', 'Capture d’écran du 2024-11-13 15-35-31.png', 'Capture d’écran du 2024-11-13 15-35-31.png', ''),
(72, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(73, 'testId', 'Capture d’écran du 2024-11-08 12-26-24.png', 'Capture d’écran du 2024-11-08 12-26-24.png', ''),
(74, 'testId', 'Capture d’écran du 2024-11-13 10-56-09.png', 'Capture d’écran du 2024-11-13 10-56-09.png', ''),
(75, 'testId', 'Capture d’écran du 2024-11-13 15-35-31.png', 'Capture d’écran du 2024-11-13 15-35-31.png', ''),
(76, 'testId', 'Capture d’écran du 2024-12-24 11-45-19.png', 'Capture d’écran du 2024-12-24 11-45-19.png', '');

-- --------------------------------------------------------

--
-- Structure de la table `ezy_modules`
--

CREATE TABLE `ezy_modules` (
  `id` int(10) NOT NULL,
  `moduleId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ezy_pages`
--

CREATE TABLE `ezy_pages` (
  `id` int(10) NOT NULL,
  `pageId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ezy_pages`
--

INSERT INTO `ezy_pages` (`id`, `pageId`, `name`, `url`, `data`, `state`) VALUES
(1, 'pageId', 'name', 'test-page', '[{\"elementId\":10,\"elementData\":{\"name\":\"TestBlock1\",\"type\":\"block\",\"classes\":\"\",\"styles\":\" padding: 5rem 2rem; background-color: orange;\",\"content\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. \",\"items\":[{\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/b14a19d9-e1aa-4c89-bda8-cc1f15b0e617_Photo+salle+d%27ajustement.jpg?auto=compress%2Cformat&rect=132%2C124%2C835%2C626&w=800&h=800&fit=max\",\"alt\":\"texte alternative\"}},{\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/65de6e569c42d04f7d968721_IMG_20220809_133216.jpg?auto=compress%2Cformat&rect=0%2C0%2C3968%2C2976&w=800&h=800&fit=max\",\"alt\":\"texte alternative 2\"}}]}},\"component\":\"ImagesSlider\",\"childrens\":[]},{\"elementId\":10,\"elementData\":{\"name\":\"TestBlock12\",\"type\":\"block\",\"classes\":\"\",\"styles\":\" padding: 5rem 2rem; background-color: orange;\",\"content\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. \",\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/65de99ab9c42d04f7d96881d_JLE_9849.jpg?auto=compress%2Cformat&w=800&h=800&fit=max\",\"alt\":\"texte alternative\"}}},\"component\":\"TextImage\",\"childrens\":[]}]\n', 'state'),
(2, 'pageId', 'name', 'test-page2', '[{\"elementId\":10,\"elementData\":{\"name\":\"TestBlock12\",\"type\":\"block\",\"classes\":\"\",\"styles\":\" padding: 5rem 2rem; background-color: orange;\",\"content\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. \",\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/65de99ab9c42d04f7d96881d_JLE_9849.jpg?auto=compress%2Cformat&w=800&h=800&fit=max\",\"alt\":\"texte alternative\"}}},\"component\":\"TextImage\",\"childrens\":[]},{\"elementId\":10,\"elementData\":{\"name\":\"TestBlock1\",\"type\":\"block\",\"classes\":\"\",\"styles\":\" padding: 5rem 2rem; background-color: orange;\",\"content\":{\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. \",\"items\":[{\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/b14a19d9-e1aa-4c89-bda8-cc1f15b0e617_Photo+salle+d%27ajustement.jpg?auto=compress%2Cformat&rect=132%2C124%2C835%2C626&w=800&h=800&fit=max\",\"alt\":\"texte alternative\"}},{\"image\":{\"url\":\"https://images.prismic.io/chiro-bressuire/65de6e569c42d04f7d968721_IMG_20220809_133216.jpg?auto=compress%2Cformat&rect=0%2C0%2C3968%2C2976&w=800&h=800&fit=max\",\"alt\":\"texte alternative 2\"}}]}},\"component\":\"ImagesSlider\",\"childrens\":[]}]\n', 'state');

-- --------------------------------------------------------

--
-- Structure de la table `ezy_sections`
--

CREATE TABLE `ezy_sections` (
  `id` int(10) NOT NULL,
  `sectionId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumb` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `component` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ezy_sections`
--

INSERT INTO `ezy_sections` (`id`, `sectionId`, `state`, `name`, `thumb`, `component`, `data`) VALUES
(1, 'Text and image', 'active', 'Text and image', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dpyyAtfvnWjgunpOtOE_JClHa5Ajc7xYgg&s', 'TextImage', '{\"content\": [{\"id\": \"text\", \"type\": \"text\", \"label\": \"Texto\", \"value\": \"Here the long, loooooong... very very long text\", \"component\": \"text\"}, {\"id\": \"image\", \"type\": \"image\", \"label\": \"Imagen\", \"value\": {\"alt\": \"Test image\", \"url\": \"https://mytechdecisions.com/wp-content/uploads/2019/10/AdobeStock_256229414.jpg\"}, \"component\": \"image\"}, {\"id\": \"title\", \"type\": \"text\", \"label\": \"Titulo\", \"value\": \"Here the title\", \"component\": \"text\"}, {\"id\": \"btnLabel\", \"type\": \"text\", \"label\": \"Etiqueta del boton\", \"value\": \"Click here !\", \"component\": \"text\"}, {\"id\": \"marginTop\", \"type\": \"style\", \"label\": \"Margen superior\", \"style\": \"marginTop\", \"value\": 20, \"element\": \".text-image\", \"component\": \"range\"}, {\"id\": \"imagePosition\", \"type\": \"select\", \"label\": \"Position de l\'imagen\", \"value\": \"right\", \"options\": [{\"label\": \"Droite\", \"value\": \"right\"}, {\"label\": \"Gauche\", \"value\": \"left\"}], \"component\": \"select\"}, {\"id\": \"bgColor\", \"type\": \"style\", \"label\": \"Color de fondo\", \"style\": \"backgroundColor\", \"value\": \"#63b2e0\", \"element\": \".text-image__inner\", \"component\": \"color\"}, {\"id\": \"textColor\", \"type\": \"style\", \"label\": \"Color del texto\", \"style\": \"color\", \"value\": \"#ffffff\", \"element\": \".text-image__inner\", \"component\": \"color\"}, {\"id\": \"marginTop\", \"type\": \"style\", \"label\": \"Margen superior\", \"style\": \"marginTop\", \"value\": 20, \"element\": \".text-image__inner\", \"component\": \"range\"}], \"component\": \"TextImage\", \"sectionName\": \"Text and image\", \"sectionType\": \"\"}'),
(2, 'Hero', 'active', 'Hero', 'https://media.istockphoto.com/id/1021908014/photo/word-writing-text-free-sample-business-concept-for-portion-of-products-given-to-consumers-in.jpg?s=612x612&w=0&k=20&c=eAgjkxxxb4UcD2XgFSuOF6ALXHPkcwB-iOpi71wnmqc=', 'Hero', '{\"content\": [{\"id\": \"title\", \"type\": \"text\", \"label\": \"Titulo\", \"value\": \"Here the title\", \"component\": \"text\"}, {\"id\": \"text\", \"type\": \"text\", \"label\": \"Texto\", \"value\": \"Here the long, loooooong... very very long text\", \"component\": \"text\"}, {\"id\": \"btnLabel\", \"type\": \"text\", \"label\": \"Etiqueta del boton\", \"value\": \"Click here !\", \"component\": \"text\"}, {\"id\": \"image\", \"type\": \"image\", \"label\": \"Imagen\", \"value\": {\"alt\": \"Test image\", \"url\": \"https://mytechdecisions.com/wp-content/uploads/2019/10/AdobeStock_256229414.jpg\"}, \"component\": \"image\"}, {\"id\": \"imagePosition\", \"type\": \"select\", \"label\": \"Posicion de la imagen\", \"value\": \"right\", \"options\": [{\"label\": \"Derecha\", \"value\": \"right\"}, {\"label\": \"Izquierda\", \"value\": \"left\"}], \"component\": \"select\"}, {\"id\": \"bgColor\", \"type\": \"style\", \"label\": \"Color de fondo\", \"style\": \"backgroundColor\", \"value\": \"#63b2e0\", \"element\": \".block-hero__left__inner\", \"component\": \"color\"}, {\"id\": \"textColor\", \"type\": \"style\", \"label\": \"Color del texto\", \"style\": \"color\", \"value\": \"#ffffff\", \"element\": \".block-hero__left__inner\", \"component\": \"color\"}, {\"id\": \"marginTop\", \"type\": \"style\", \"label\": \"Color del texto\", \"style\": \"marginTop\", \"value\": 20, \"element\": \".block-hero__left__inner\", \"component\": \"range\"}], \"component\": \"Hero\", \"sectionName\": \"Text and image\", \"sectionType\": \"\"}'),
(3, 'faqs', 'active', 'Faqs', 'https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg', 'Faqs', '{\"content\": [{\"id\": \"title\", \"type\": \"text\", \"label\": \"Titulo\", \"value\": \"Dropdown list\", \"component\": \"text\"}, {\"id\": \"items\", \"type\": \"array\", \"items\": [{\"answer\": {\"type\": \"text\", \"label\": \"Answer\", \"value\": \"First answer\", \"component\": \"text\"}, \"question\": {\"type\": \"text\", \"label\": \"Question\", \"value\": \"First question\", \"component\": \"text\"}}, {\"answer\": {\"type\": \"text\", \"label\": \"Answer\", \"value\": \"Second answer\", \"component\": \"text\"}, \"question\": {\"type\": \"text\", \"label\": \"Question\", \"value\": \"Second question\", \"component\": \"text\"}}, {\"answer\": {\"type\": \"text\", \"label\": \"Answer\", \"value\": \"Thirst answer\", \"component\": \"text\"}, \"question\": {\"type\": \"text\", \"label\": \"Question\", \"value\": \"Thirst question\"}}], \"label\": \"Items\", \"component\": \"array\"}], \"component\": \"Faqs\", \"sectionName\": \"Text and image\", \"sectionType\": \"\"}');

-- --------------------------------------------------------

--
-- Structure de la table `ezy_sites`
--

CREATE TABLE `ezy_sites` (
  `id` int(10) NOT NULL,
  `siteId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ezy_users`
--

CREATE TABLE `ezy_users` (
  `id` int(10) NOT NULL,
  `userId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ezy_blocks`
--
ALTER TABLE `ezy_blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blockId` (`blockId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_elements`
--
ALTER TABLE `ezy_elements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `elementId` (`elementId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_images`
--
ALTER TABLE `ezy_images`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ezy_modules`
--
ALTER TABLE `ezy_modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_pages`
--
ALTER TABLE `ezy_pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pageId` (`pageId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_sections`
--
ALTER TABLE `ezy_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sectionId` (`sectionId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_sites`
--
ALTER TABLE `ezy_sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siteId` (`siteId`),
  ADD KEY `state` (`state`);

--
-- Index pour la table `ezy_users`
--
ALTER TABLE `ezy_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `state` (`state`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ezy_blocks`
--
ALTER TABLE `ezy_blocks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ezy_elements`
--
ALTER TABLE `ezy_elements`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ezy_images`
--
ALTER TABLE `ezy_images`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pour la table `ezy_modules`
--
ALTER TABLE `ezy_modules`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ezy_pages`
--
ALTER TABLE `ezy_pages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `ezy_sections`
--
ALTER TABLE `ezy_sections`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ezy_sites`
--
ALTER TABLE `ezy_sites`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ezy_users`
--
ALTER TABLE `ezy_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
