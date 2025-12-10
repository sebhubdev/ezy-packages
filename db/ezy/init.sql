SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE users (
  id int(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userId varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  userName varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  userEmail varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  userPassword varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  userType varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  userData longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  state varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
);

INSERT INTO users (userId, userName, userEmail, userPassword, userType, userData, state) VALUES
('hjystebdgetrs', 'seba', 'neumann.tecnica@gmail.com', 'sebaseba', 'admin', '{}', 'active'),
('kjhdfkljsdhff', 'jaeden', 'jaeden@gmail.com', 'jaeden', 'admin', '{}', 'active');



CREATE TABLE `ezy_sites` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `siteId` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_sites`
  ADD KEY `siteId` (`siteId`),
  ADD KEY `state` (`state`);


CREATE TABLE `ezy_pages` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `pageId` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_pages`
  ADD KEY `pageId` (`pageId`),
  ADD KEY `state` (`state`);

INSERT INTO ezy_pages (pageId, name, url, data, state) VALUES 
('pageId', 'name', 'test-page', '[{"elementId":10,"elementData":{"name":"TestBlock1","type":"block","classes":"","styles":" padding: 5rem 2rem; background-color: orange;","content":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. ","items":[{"image":{"url":"https://images.prismic.io/chiro-bressuire/b14a19d9-e1aa-4c89-bda8-cc1f15b0e617_Photo+salle+d%27ajustement.jpg?auto=compress%2Cformat&rect=132%2C124%2C835%2C626&w=800&h=800&fit=max","alt":"texte alternative"}},{"image":{"url":"https://images.prismic.io/chiro-bressuire/65de6e569c42d04f7d968721_IMG_20220809_133216.jpg?auto=compress%2Cformat&rect=0%2C0%2C3968%2C2976&w=800&h=800&fit=max","alt":"texte alternative 2"}}]}},"component":"ImagesSlider","childrens":[]},{"elementId":10,"elementData":{"name":"TestBlock12","type":"block","classes":"","styles":" padding: 5rem 2rem; background-color: orange;","content":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. ","image":{"url":"https://images.prismic.io/chiro-bressuire/65de99ab9c42d04f7d96881d_JLE_9849.jpg?auto=compress%2Cformat&w=800&h=800&fit=max","alt":"texte alternative"}}},"component":"TextImage","childrens":[]}]
', 'state');

INSERT INTO ezy_pages (pageId, name, url, data, state) VALUES 
('pageId', 'name', 'test-page2', '[{"elementId":10,"elementData":{"name":"TestBlock12","type":"block","classes":"","styles":" padding: 5rem 2rem; background-color: orange;","content":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. Sed rutrum dictum iaculis. Fusce ultrices eget nulla sit amet tempor. Vestibulum venenatis odio et lacinia tempor. Duis eget sem ultrices, aliquet eros ut, tincidunt sapien. Sed posuere metus quis sapien tincidunt consequat. Maecenas et lorem sem. Etiam non diam maximus, malesuada tortor eget, hendrerit neque. Praesent sodales nisl vel velit suscipit, sed facilisis tortor porta. Pellentesque facilisis ex a mi semper tincidunt. Curabitur libero mi, auctor eu venenatis eleifend, eleifend at neque. Nullam eget erat a mi gravida euismod non in est. Donec vel sagittis lorem, ac facilisis lorem. ","image":{"url":"https://images.prismic.io/chiro-bressuire/65de99ab9c42d04f7d96881d_JLE_9849.jpg?auto=compress%2Cformat&w=800&h=800&fit=max","alt":"texte alternative"}}},"component":"TextImage","childrens":[]},{"elementId":10,"elementData":{"name":"TestBlock1","type":"block","classes":"","styles":" padding: 5rem 2rem; background-color: orange;","content":{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed risus eget tellus rhoncus tristique. Vivamus nec ullamcorper ante, eget venenatis leo. Aliquam a tempus augue. ","items":[{"image":{"url":"https://images.prismic.io/chiro-bressuire/b14a19d9-e1aa-4c89-bda8-cc1f15b0e617_Photo+salle+d%27ajustement.jpg?auto=compress%2Cformat&rect=132%2C124%2C835%2C626&w=800&h=800&fit=max","alt":"texte alternative"}},{"image":{"url":"https://images.prismic.io/chiro-bressuire/65de6e569c42d04f7d968721_IMG_20220809_133216.jpg?auto=compress%2Cformat&rect=0%2C0%2C3968%2C2976&w=800&h=800&fit=max","alt":"texte alternative 2"}}]}},"component":"ImagesSlider","childrens":[]}]
', 'state');



CREATE TABLE `ezy_elements` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `elementId` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_elements`
  ADD KEY `elementId` (`elementId`),
  ADD KEY `state` (`state`);



CREATE TABLE `ezy_sections` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sectionId` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `thumb` varchar(250) DEFAULT NULL,
  `component` varchar(100) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_sections`
  ADD KEY `sectionId` (`sectionId`),
  ADD KEY `state` (`state`);



CREATE TABLE `ezy_blocks` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `blockId` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `thumb` varchar(250) DEFAULT NULL,
  `component` varchar(100) DEFAULT NULL,
  `data` json DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_blocks`
  ADD KEY `blockId` (`blockId`),
  ADD KEY `state` (`state`);



CREATE TABLE `ezy_modules` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `moduleId` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_modules`
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `state` (`state`);



CREATE TABLE `ezy_users` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_users`
  ADD KEY `userId` (`userId`),
  ADD KEY `state` (`state`);


CREATE TABLE `ezy_images` (
  `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `imageId` varchar(100) NOT NULL,
  `imageName` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `alt` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `ezy_images`
  ADD KEY `imageId` (`imageId`),




