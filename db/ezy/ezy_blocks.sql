-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 16 sep. 2025 à 20:04
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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ezy_blocks`
--
ALTER TABLE `ezy_blocks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
