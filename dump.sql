/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categoria
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UX_categoria_nombre` (`nombre`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cliente
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cedula` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cliente_nombre_key` (`nombre`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: factura
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `factura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `total` decimal(10, 2) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `numero_factura` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Factura_numero_factura_key` (`numero_factura`),
  KEY `Factura_cliente_id_fkey` (`cliente_id`),
  KEY `factura_usuarioId_fkey` (`usuarioId`),
  CONSTRAINT `Factura_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `factura_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: factura_producto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `factura_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `factura_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` decimal(10, 2) NOT NULL,
  `totalPorProducto` decimal(10, 2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Factura_Producto_factura_id_fkey` (`factura_id`),
  KEY `Factura_Producto_producto_id_fkey` (`producto_id`),
  CONSTRAINT `Factura_Producto_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `factura` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Factura_Producto_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: producto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad` decimal(10, 2) NOT NULL,
  `unidad_medida` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10, 2) NOT NULL,
  `categoria_id` int DEFAULT NULL,
  `proveedor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Producto_codigo_key` (`codigo`),
  UNIQUE KEY `Producto_nombre_key` (`nombre`),
  KEY `Producto_categoria_id_fkey` (`categoria_id`),
  KEY `Producto_proveedor_id_fkey` (`proveedor_id`),
  CONSTRAINT `Producto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `Producto_proveedor_id_fkey` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Proveedor_nombre_key` (`nombre`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contrasenya` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombreUsuario` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_nombreUsuario_key` (`nombreUsuario`),
  UNIQUE KEY `usuario_rol_nombreUsuario_key` (`rol`, `nombreUsuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categoria
# ------------------------------------------------------------

INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (1, 'Alimentos Secos y Enlatados');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (2, 'Bebés');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (3, 'Bebidas');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (4, 'Carnes y Pescados');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (5, 'Cereales y Barras de Cereal');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (6, 'Congelados');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (7, 'Frutas y Verduras');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (8, 'Lácteos');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (9, 'Limpieza del Hogar');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (10, 'Mascotas');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (11, 'Panadería y Repostería');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (12, 'Productos de Higiene Personal');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (13, 'Productos Internacionales');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (14, 'Productos Orgánicos y Naturales');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (15, 'Salud y Belleza');
INSERT INTO
  `categoria` (`id`, `nombre`)
VALUES
  (16, 'Snacks y Dulces');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cliente
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: factura
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: factura_producto
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: producto
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedor
# ------------------------------------------------------------

INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (7, 'Alimentos Enlatados y Secos C.A.');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (16, 'Cosecha Orgánica C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (6, 'Delicias Congeladas C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (3, 'Delicias Lácteas C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (8, 'Desayunos Esenciales C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (9, 'Dulces y Snacks C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (13, 'Esenciales para Bebés C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (14, 'Importaciones Alimentarias Globales C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (2, 'Mar y Tierra C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (5, 'Mundo Bebidas C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (4, 'Panadería Dulce Hogar C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (1, 'Productos Frescos del Campo C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (11, 'Soluciones de Limpieza Hogar C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (15, 'Suministros de Belleza y Salud C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (10, 'Suministros de Higiene Personal C.A');
INSERT INTO
  `proveedor` (`id`, `nombre`)
VALUES
  (12, 'Suministros para Mascotas C.A');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

INSERT INTO
  `usuario` (
    `id`,
    `contrasenya`,
    `nombre`,
    `apellido`,
    `nombreUsuario`,
    `email`,
    `rol`
  )
VALUES
  (
    7,
    '$2a$10$zsQZqEjf/WBQ.OrkcPNC9eTMKZMxFw7WvJYfKcUFk5c3G8kCYOmJS',
    'Astrid',
    'Hidalgo',
    'ahidalgo',
    'astrid.ahm29@gmail.com',
    'admin'
  );
INSERT INTO
  `usuario` (
    `id`,
    `contrasenya`,
    `nombre`,
    `apellido`,
    `nombreUsuario`,
    `email`,
    `rol`
  )
VALUES
  (
    9,
    '$2a$10$E2va5e2U08Ey4myBwYrVp.JF0KQIhsRYzpnH51YVd.lD2.ix763Sm',
    'Astrid',
    'Hidalgo',
    'ahidalgoT',
    'astrid.ahm29@gmail.com',
    'empleado'
  );
INSERT INTO
  `usuario` (
    `id`,
    `contrasenya`,
    `nombre`,
    `apellido`,
    `nombreUsuario`,
    `email`,
    `rol`
  )
VALUES
  (
    10,
    '$2a$10$PlISanD.bEJbawZbncxaM.MKRaVANBO8kTn6BL4H7Wm/qrSs49SQO',
    'juan',
    'perez',
    'jperez',
    'astrid.ahm29@gmail.com',
    'empleado'
  );
INSERT INTO
  `usuario` (
    `id`,
    `contrasenya`,
    `nombre`,
    `apellido`,
    `nombreUsuario`,
    `email`,
    `rol`
  )
VALUES
  (
    13,
    '$2a$10$mNbh9e0a5XB262H/ldM.O.qHrqcfA2dzk7UtqHqtUslny/KwzbGg2',
    'maria',
    'parra',
    'mparra',
    'astrid.ahm29@gmail.com',
    'empleado'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
