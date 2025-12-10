CREATE TABLE `families` (
  `id` int(100) NOT NULL,
  `familyId` varchar(100) NOT NULL,
  `familyName` varchar(100) NOT NULL,
  `parents` longtext NOT NULL,
  `students` longtext NOT NULL,
  `address` JSON NOT NULL,
  `registrationPrice` DECIMAL NOT NULL,
  `schoolPrice` DECIMAL NOT NULL,
  `siblingsPrice` DECIMAL NOT NULL,
  `registrationDate` DATE NOT NULL,
  `billingType` int(10) NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `families`
ADD PRIMARY KEY (`id`),
ADD KEY `familyId` (`familyId`);

ALTER TABLE `families`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

CREATE TABLE `parents` (
  `id` int(100) NOT NULL,
  `parentId` varchar(100) NOT NULL,
  `familyId` varchar(100) NOT NULL,
  `parentRol` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `parents`
ADD PRIMARY KEY (`id`),
ADD KEY `parentId` (`parentId`),
ADD KEY `familyId` (`familyId`);

ALTER TABLE `parents`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

CREATE TABLE `students` (
  `id` int(100) NOT NULL,
  `studentId` varchar(100) NOT NULL,
  `familyId` varchar(100) NOT NULL,
  `class` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `students`
ADD PRIMARY KEY (`id`),
ADD KEY `studentId` (`studentId`),
ADD KEY `familyId` (`familyId`);

ALTER TABLE `students`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

CREATE TABLE `classes` (
  `id` int(100) NOT NULL,
  `classId` varchar(100) NOT NULL,
  `className` varchar(100) NOT NULL,
  `students` longtext NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `classes`
ADD PRIMARY KEY (`id`),
ADD KEY `classId` (`classId`);

ALTER TABLE `classes`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

CREATE TABLE `parentRols` (
  `id` int(100) NOT NULL,
  `rolId` varchar(100) NOT NULL,
  `rolName` varchar(100) NOT NULL,
  `privileges` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `parentRols`
ADD PRIMARY KEY (`id`),
ADD KEY `rolId` (`rolId`);

ALTER TABLE `parentRols`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

CREATE TABLE `invoices` (
  `id` int(100) NOT NULL,
  `invoiceId` varchar(100) NOT NULL,
  `familyId` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `month` varchar(100) NOT NULL,
  `dateCreation` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `data` JSON NOT NULL,
  `state` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `invoices`
ADD PRIMARY KEY (`id`),
ADD KEY `invoiceId` (`invoiceId`),
ADD KEY `familyId` (`familyId`);

ALTER TABLE `invoices`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;