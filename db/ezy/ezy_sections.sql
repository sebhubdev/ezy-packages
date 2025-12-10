-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 16 sep. 2025 à 20:05
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

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ezy_sections`
--
ALTER TABLE `ezy_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sectionId` (`sectionId`),
  ADD KEY `state` (`state`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ezy_sections`
--
ALTER TABLE `ezy_sections`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
