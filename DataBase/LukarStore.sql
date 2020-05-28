/*
SQLyog Community v8.71 
MySQL - 5.5.5-10.1.34-MariaDB : Database - lukarstore
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`lukarstore` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `lukarstore`;

/*Table structure for table `banners` */

DROP TABLE IF EXISTS `banners`;

CREATE TABLE `banners` (
  `id_banner` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_promo` varchar(50) NOT NULL,
  `img` longtext NOT NULL,
  PRIMARY KEY (`id_banner`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `banners` */

insert  into `banners`(`id_banner`,`nombre_promo`,`img`) values (1,'promo1','banner8.jpg'),(2,'promo2','banner10.jpg');

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `id_categorias` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categorias`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `categorias` */

insert  into `categorias`(`id_categorias`,`categoria`) values (2,'Hogar'),(3,'Vestuario'),(4,'Accesorios'),(5,'Tecnología'),(6,'Belleza');

/*Table structure for table `estados` */

DROP TABLE IF EXISTS `estados`;

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `estados` */

insert  into `estados`(`id_estado`,`estado`) values (1,'Aprobado'),(2,'Pendiente');

/*Table structure for table `pedidos` */

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id_pedidos` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuarios` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pedidos`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `pedidos` */

insert  into `pedidos`(`id_pedidos`,`id_usuarios`,`fecha`) values (1,2,'2020-05-26 14:34:32'),(2,12,'2020-05-26 14:34:48'),(3,12,'2020-05-14 15:34:48'),(4,34,'2020-05-27 16:27:17'),(5,34,'2020-05-27 16:28:32'),(6,34,'2020-05-27 16:30:53'),(7,36,'2020-05-27 23:17:37'),(8,37,'2020-05-27 23:26:15');

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id_productos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `id_categorias` int(11) NOT NULL,
  `id_usuarios` int(11) NOT NULL DEFAULT '12',
  `id_estado` int(11) NOT NULL DEFAULT '2',
  `imagen` text NOT NULL,
  PRIMARY KEY (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `productos` */

insert  into `productos`(`id_productos`,`nombre`,`marca`,`precio`,`descripcion`,`cantidad`,`id_categorias`,`id_usuarios`,`id_estado`,`imagen`) values (1,'HUAWEI Y9 2019','Huawei','5000','Teléfono inteligente mega pro',40,5,12,1,'product1.jpg'),(2,'karlaEsclava','Karlita','123','Te hago lo que quieras bb',40,2,12,1,'product5.jpg'),(5,'Agua Micelar','Fauno','7000','Limpia y desmaquilla para todo tipo de piel',40,6,36,1,'aguamicelar.png'),(9,'Control de Consola','Sony','213000','2da Generación, Dualshock 4, morado: Edición Especial, Original',40,5,33,2,'productbig.jpg'),(10,'Iphone','Apple','1500000','Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consona',40,2,33,2,'productbig1.jpg'),(11,'SmartWatch','Apple','4000000','Funciones ¿ Realiza & recibe llamadas ¿ Recibe Notificaciones (WhatsApp,SMS,Facebook,Twitter,etc.) ¿',40,4,12,2,'product13.jpg'),(12,'Manilla','Sin especificar','15000','Luce hermosa con este accesorio en tu mano',40,4,12,2,'product-11.jpg'),(13,'Gafas','RayBand','300000','Esto es una pruebaaa',40,4,36,2,'product-7-white.jpg'),(14,'Medias','Adidas','15000','Para mujeres y hombres, 100% nuevo y de alta calidad, Material: 85% Poliester tacto algodón y 15% El',40,3,36,2,'product-12.jpg'),(15,'Monitor','Acer','23322','ULTRA HD 4K',40,5,36,1,'product21.jpg');

/*Table structure for table `productos_pedidos` */

DROP TABLE IF EXISTS `productos_pedidos`;

CREATE TABLE `productos_pedidos` (
  `id_productos` int(11) NOT NULL,
  `id_pedidos` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `productos_pedidos` */

insert  into `productos_pedidos`(`id_productos`,`id_pedidos`,`precio`,`cantidad`) values (1,1,'5000',2),(1,3,'5000',5),(1,5,'5000',1),(11,5,'50000',1),(15,6,'23322',1),(15,7,'23322',1),(1,7,'5000',3),(1,8,'5000',5);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `roles` */

insert  into `roles`(`id_rol`,`rol`) values (1,'Administrador'),(2,'Usuario');

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values ('-Or23BLumEwmFKHj73AI6qGg8IzIApi3',1590701347,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('A8_IZHclN6wISWUBMKB9_R89O3BVcE3T',1590701331,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('WZdzJXus_UW6Fm-9VKnizIOGco3_ApzE',1590681315,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('bjoq77KprN130UIRLlYeviRP85RLwzF4',1590702510,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"carro\":[],\"passport\":{\"user\":34}}'),('dmmUOWXnEWKfl0ypC1A6rgZMEDHWIhgu',1590730101,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\"]},\"passport\":{},\"carro\":[{\"id_productos\":\"15\",\"nombre\":\"Monitor\",\"precio\":\"23322\",\"cantidad\":\"1\",\"total\":23322}]}'),('h6gSniNEprFCzj2Y71-UJXvL8xSsVr-E',1590657097,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":33}}');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `id_rol` int(11) DEFAULT '2',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id_usuario`,`nombre_usuario`,`email`,`pass`,`id_rol`) values (2,'Alberto Cruz','Alberto@fet.edu.co','3455',2),(3,'Jesus Mauricio','Yisususus','1233',2),(5,'Leonardo Jiménez','LeoJiP','123321',2),(6,'Erick','erick@fet.edu.co','1234',2),(9,'Lucero','lucerodonato@hotmail.com','123456',2),(10,'Residente','residente@fet.edu.co','1233321',2),(12,'Karla Diaz Donato','karla695@gmail.com','123',1),(13,'Alberto','alberto_cruz@gmail.com','123',2),(14,'karalaalal','12312312312',NULL,2),(15,'karla12344','djaksldjasldjaskld@gmail.com','$2a$10$yhAc62t2rf91p01cSSxsTeH24q93H23TtmbkLkbCecJ',2),(16,'juanchisss','juan_quintero@fet.edu.co','$2a$10$nQGqXXFLLBltLdH8XrRh7uD943scOb0h2UU6w.0AQd9',2),(17,'juan','juan_quintero@fet.edu.co','$2a$10$DRWnF9pPjahv9mvoHddwFuF.PHlAaVy5xOMHIdUsIRl',2),(18,'juanchisss','juan_quintero@fet.edu.co','$2a$10$QiBp0zJKXl5tXpoEFZjwROqXiGZZmmZA1PntNVcQvYI',2),(19,'juanchisss','juan_quintero@fet.edu.co','$2a$10$3ay7IMrUBlm.Mu3yZwvD4u2Vr4Vun5lh1x/To7L6wc6',2),(20,'Erick','erick_vergarano@fet.edu.co','$2a$10$OBvxm1xocMfbZEdWNB3zW.BweIs8i6vAv2KV3JtjQ5/',2),(21,'Erick','erick_vergarano@fet.edu.co','$2a$10$LQh.SQ.cjFh15bDZB/hLBuFf5sN67jQ3/trs50n4J.l',2),(27,'karla','123wdasj','12312',2),(28,'mklk','kl','kl',2),(29,'lamejor','lamejor123','febrero17',2),(30,'elmejor','elmejorerick','$2a$10$wFe7GzKYmCPm/8Sfkkw43O6d3mcmeRnnpmhh.atBHyW',2),(31,'Evergara','evergara@gmail.com','$2a$10$CaBwgOdmBKYkImxjLfI1XOKk03wZeaiNrccxo9rEMPr',2),(32,'karla','karla1@gmail.com','$2a$10$sL86iJZgH1PbV6Btt1qr0eTpcM5Rfwzi20S2O9GyNZq',2),(33,'Alberto','1@gmail.com','erick',2),(34,'2','2@gmail.com','$2a$10$C2umx/TsAaofr8JJCOJf1OVjgkNvkV0nV3dmEadSxzNe5MgOo6WGS',2),(35,'Developer','karla_diazdonato@gmail.com','$2a$10$HKdGqac8Fvmp8jMJ2SPXcOy.yZn.tCu5TcgltZDOWusENjAL3rQga',1),(36,'Admin','alv@gmail.com','$2a$10$8ra7ZKuBUDAoI.f1.n7aH.Nm6.oNHbKdoh9o7mB/zl18xMd1GfFKu',2),(37,'Albertico','123@gmail.com','$2a$10$QglRIogxElotKEdfEy1/bO39tVbm9V2XmtdMUn8hLEhtjgQKLN8UW',2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
