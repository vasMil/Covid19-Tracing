-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: database_ct
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `poi_table`
--

DROP TABLE IF EXISTS `poi_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poi_table` (
  `id` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `rating` float NOT NULL,
  `rating_n` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name_address_idx` (`name`,`address`),
  KEY `lat_long_idx` (`latitude`,`longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poi_table`
--

LOCK TABLES `poi_table` WRITE;
/*!40000 ALTER TABLE `poi_table` DISABLE KEYS */;
INSERT INTO `poi_table` VALUES ('ChIJ_cM58sE3XhMRCHVgkJkjUeQ','Σχολή Οδηγών - Δώρα Κ. Γιαννακοπούλου','Ionias 62, Patra',38.2362059,21.7399308,5,7),('ChIJ-f8_0B82XhMRGO3574T-GbY','Happytails','Ionias 23, Patra',38.2372047,21.7399468,4.6,69),('ChIJ-TKYmx02XhMRhtJ7X9WTjPI','Eurobank','Kalavriton 32, Patra',38.23566259999999,21.7460654,3.3,23),('ChIJ04Xm-h02XhMRovY8-bw3Cpg','Building Cleaning - ESTIA','Fokeas 49, Patra',38.2364033,21.7441721,4.6,25),('ChIJ0a4YHeBJXhMRgESyORq9JSo','DERMATOLOGOS GIANNAKOPOULOS Patras KOSTAS','Voulgareos 27, Patra',38.2381785,21.73845210000001,2.3,9),('ChIJ0RiAPOJJXhMR9e-rNN13X9o','Moto Shop Sotirios Andreou','Dimitriou Gounari 229, Patra',38.2384409,21.7446494,4.6,51),('ChIJ0We6ISc2XhMR0JstwP2xC6s','CHEINOPOROS PANAGIOTIS','Charilaou Trikoupi 17, Patra',38.2373118,21.7302905,5,4),('ChIJ0xg-_4BJXhMRADzrgzcpuh4','ΖΕΛΕΚΤ ΑΕ','Kalavriton 2, Patra',38.2377884,21.7451985,4.4,115),('ChIJ0YP89yw3XhMRu0_gcptybS4','GroupTime Fitness','Akti Dimeon 35, Patra',38.2338052,21.725142,5,92),('ChIJ17ejkhk2XhMRPsEejntj8Mc','Kafekouti','Kalavriton 23, Patra',38.2365668,21.7460363,4.3,213),('ChIJ1f_1SOJJXhMRgrZ3x59ZKNw','Coffeebrands','3ou Oreivatikoy 10, Patra',38.2387101,21.7452574,4.3,82),('ChIJ24KnIg83XhMRX_b9V6y7PKE','Chrysanthakopoulos - Idiotropo','Korinthou 451, Patra',38.2388773,21.7285079,4.5,11),('ChIJ34_kIOBJXhMR7imf2tRjF3o','Hardwarestore.gr Χρωματοπωλείο Κωνσταντέλλος','Voulgareos 42, Patra',38.2380054,21.73934999999999,4.9,8),('ChIJ3WNjGMpJXhMRP2_Mlwzs7Ag','C\'est Cafe','Kalavriton 10, Patra',38.2372038,21.7453741,4.8,29),('ChIJ4bvbRlU3XhMRizrDqc9I6fU','Flocafe','Akti Dimeon 17, Patra',38.2376827,21.7259359,4.1,246),('ChIJ5-bc-wc3XhMRtRMtoIpDJDw','Paris house 1','Selefkias 11, Patra',38.2297166,21.7302191,4,1),('ChIJ53SyUV83XhMRKCtMj0KPkBI','Nafsika\'s hair salon','Nikaias 139, Patra',38.2344958,21.7452054,5,50),('ChIJ6-g47SM2XhMRoBC9mS6dkKE','Αχαϊκό Εντελβάις','Eleftheriou Venizelou 69, Patra',38.232962,21.732502,4.4,209),('ChIJ71wmUS82XhMRKso4jVV3SaI','Coffeebox Str','Akti Dimeon 27, Patra',38.2349755,21.72532379999999,4.3,124),('ChIJ7f_lJyY2XhMRnOqNQJfMj3g','Goody\'s Burger House','Akti Dimeon 17, Patra',38.2379767,21.7259916,4.2,546),('ChIJ7SdGoCg2XhMRGcnVpa4dU0g','Petite Boutique','Akti Dimeon 18, Patra',38.23679099999999,21.7259139,4.4,413),('ChIJ88kULCM2XhMRXqQTjKQz9-s','La Taste Ζαχαροπλαστείο','Agiou Ioanni Pratsika 71, Patra',38.2290611,21.7343507,4.6,103),('ChIJ8e14Y_k3XhMRwkBFeA4sA44','Πλατεία Ελευθερίας (Μικράς Ασίας)','Patras',38.2358026,21.7419403,3.7,125),('ChIJ8Uhwphk2XhMR0eyLMUIgSEk','Piraeus Bank','Γ. Παπανδρέου, & Ιωνίας 104, Patra',38.2296495,21.7412741,2.3,23),('ChIJ8YFRQhs3XhMRSTMUbYu6zCw','Pet Beauty G.S.','Βορείου Ηπείρου 170 και, Maizonos, Patra',38.2334675,21.7267902,4.2,34),('ChIJa4Go5yc2XhMR-30hKzhbx_c','My market','12, Akti Dimeon 14, Patra',38.2392673,21.7262653,4.5,504),('ChIJA8EOiMk3XhMRfLK_6kRsJS4','ΕΙΔΙΚΗ ΘΕΡΑΠΕΥΤΙΚΗ ΠΑΡΕΜΒΑΣΗ - Λογοθεραπεία, Λογοθεραπευτές Πάτρα - Σακκογιάννη Ράνια','Kalavriton 24-26, Patra',38.2363018,21.7458576,5,10),('ChIJA8XmnCc2XhMRoA2h45hqTg4','ComTech Systems Pc-Δίκτυα-Software-Service','Korinthou 358, Patra',38.2393434,21.7283489,4.9,30),('ChIJaeHBPuBJXhMRuNbzVocLWWA','Kokkonis Bros O.E.','Mpoukaouri 158, Patra',38.2381317,21.7395629,4.7,198),('ChIJaSelXrpJXhMRn8muKjS7tz8','Γιαννης Χριστοπουλος ΚΡΕΟΠΩΛΕΙΟ','Dimitriou Gounari 212, Patra',38.2387755,21.7436722,5,3),('ChIJaVrgkCU2XhMRvIk-RC18hoM','Αρτο...Ποίηση','Maizonos 348, Patra',38.2333467,21.72667019999999,4.7,65),('ChIJAVs4m443XhMRBbxmCCI6f5Y','εν σωματι','Ελευθερίου Βενιζέλου 59 &, Delvinou, Patra',38.2326975,21.7307916,4.8,6),('ChIJB0BpiiM2XhMR0j9vb-iKkoc','Play Opap Ε. Βενιζέλου 65','Eleftheriou Venizelou 65, Patra',38.23284700000001,21.7317312,4,39),('ChIJb6ZtRxw2XhMR3wPLklk4dic','elastika falieris TROXOEXPRESS','Leoforos Georgiou Papandreou 60, Patra',38.2330385,21.744757,4.9,66),('ChIJB9uOmYM3XhMRcG8fh_Xmz7o','Car wash elefante','Solomous 86, Patra',38.23481719999999,21.7298984,4.1,17),('ChIJbaPLFeJJXhMRYPqDu15HzSs','Kotsokolos Konstantinos','Karatza 116, Patra',38.2378572,21.7447693,4.6,87),('ChIJbzH1X0E3XhMRIZIsCrlLqgY','Το Φωτεινό Αστέρι','Themistokleous 116, Patra',38.2331756,21.72813919999999,4.7,27),('ChIJCdQRw0Y3XhMRHeQx2bwPEAw','Καφέ \'Πνύκα\'','Michail Psellou 5, Patra',38.2332736,21.7338762,4.4,21),('ChIJCw-wuz5JXhMRd2DwyJ14sxg','Períptero','3ou Oreivatikoy 48, Patra',38.240147,21.7454329,5,1),('ChIJD_GT-iQ2XhMRbFWExhIn4sI','butcher Cacoyannis','Solomous 148, Patra',38.2317336,21.72934619999999,5,30),('ChIJD12aA_c3XhMR3g61s7cKpQc','Πασαγιάννης Όμηρος','Kontogouri 10, Patra',38.2313294,21.7315513,4.8,4),('ChIJDU4ldCU2XhMRhYQRDJHqYB8','Carspa','Parnassou 17, Patra',38.2325802,21.7271952,4.6,10),('ChIJdz60KyA2XhMRiCVdmLDxyx8','Φαρμακείο Δήμητρας Κοτσιρίλου & ΣΙΑ Ο.Ε.','Αγίας Τριάδος 52 & Βορείου Ηπείρου 3, Patra',38.2359522,21.7374126,5,6),('ChIJE5rqhOFJXhMREi7B5EA45Dw','Tip Top','Dimitriou Gounari 223, Patra',38.2385156,21.7444552,4.6,102),('ChIJeRBLIEo3XhMRJQF6V6sC6MI','Πλυντήριο αυτοκινήτων (self service)','Ionias 133, Patra',38.2300179,21.7407132,5,5),('ChIJESBMBBk2XhMRi2SbsZ_zvMU','WODBOX','Leoforos Georgiou Papandreou 91, Patra',38.230732,21.742805,4.8,25),('ChIJeT2kxTo2XhMRCntpyoHXt2A','ΚΟΥΝΑΒΗΣ ΑΝΔΡΕΑΣ','Salaminos 30, Patra',38.2293827,21.727438,4.2,11),('ChIJeWquqyE2XhMRLB_819PA_b0','Sotiris Koulis Family','Archiepiskopou Ierotheou 105, Patra',38.2370706,21.7345796,5,1),('ChIJEzGdRic2XhMRYTCEu8QXinw','ΑΡΤΟΓΕΥΣΕΙΣ ΑΝΔΡΙΚΟΠΟΥΛΟΣ ΧΑΡ. & ΣΙΑ Ο.Ε.','Solomous 30, Patra',38.2387705,21.7306217,4.5,60),('ChIJF-Rg6dI3XhMRMNxaFTBLchg','Coffee stay','Charilaou Trikoupi 17, Patra',38.2373118,21.7302905,5,3),('ChIJf0kcnSc2XhMRu-Lg9p3PZjI','Music Power ΠΕΛΕΚΟΥΔΑΣ Β.','Korinthou 443, Patra',38.2391879,21.7285765,4.9,24),('ChIJf1c-xyU2XhMRQaIzEdB_B7k','www.abbyspaws.gr','Themistokleous 56, Patra',38.2373518,21.7303909,5,1),('ChIJFaU1TBw2XhMRq87NWxs61hA','Μυλωνάς Ζαχαροπλαστείο','Leoforos Georgiou Papandreou 44, Patra',38.23405150000001,21.7457064,4.4,107),('ChIJfdC04No3XhMR8JrkZLvazh4','AlfaEstiasi','Selefkias 14, Patra',38.2294601,21.73060079999999,5,3),('ChIJFUgUqwY3XhMR_pCBkFi8rdI','Μπαρμπέρικο - Barber Shop','Agias Triados 20, Patra',38.23728699999999,21.736776,5,57),('ChIJG5AcGCY2XhMRmpnpUDVG6Lc','Our Great Circus','Archiepiskopou Kirillou 14, Patra',38.23651510000001,21.7264312,4.6,583),('ChIJg67Oa4g3XhMRfLQlSnNC9hg','Σαπουναρία Πάτρας (S.P)','Πόντου κ, Efesou 47, Patra',38.235325,21.741015,4.8,4),('ChIJGfuRsONJXhMRQ-9vUU0WSjI','KARELIS KONSTANTINOS','Paleon Patron Germanou 179, Patra',38.2401851,21.7451425,5,2),('ChIJgwBl6SU2XhMRMjbygjBSboQ','Patras Moto Technology','Dimitriou Maximou 8, Patra',38.2343377,21.7259251,4.9,105),('ChIJGYPtKyY2XhMRDq5n0hrb108','Media Markt Πάτρα','Akti Dimeon 17, Patra',38.23773599999999,21.72625249999999,4.1,1257),('ChIJGyYZay82XhMRYIH_uvIjIH8','Patras\' South Park - Notio Parko Patras','Akti Dimeon 28, Patra',38.23485300000001,21.7243963,4.5,2085),('ChIJh003YSY2XhMRXA3c9sHdMAw','GMC-SHOP_Super Market Θεοδωρόπουλος','Archiepiskopou Ierotheou 51, Patra',38.236013,21.7283456,4.6,58),('ChIJH1FcPxw2XhMRzjMDiIppoZg','Max Perry','Leoforos Georgiou Papandreou 59, Patra',38.2331948,21.745112,4.3,155),('ChIJH2IPqSU2XhMRx52dM-Uwiwc','Σκλαβενίτης','Parnassou 16, Patra',38.2326749,21.72816259999999,4.5,725),('ChIJhTC7IiA2XhMRDXXA5keTbkU','The Juice Bar','Smirnis 110, Patra',38.2370436,21.7369206,4.4,139),('ChIJhVyNxiU2XhMR-047iPt8FPY','Δ.ΕΠΙΣΚΕΥΑΣΤΙΚΗ','Korinthou 426-430, Patra',38.23407700000001,21.727605,4.7,7),('ChIJHz0GwiY2XhMRl8CM130I0qw','CyberArena Internet Cafe','Solomous 72-76, Patra',38.2361853,21.7301181,4.7,124),('ChIJizF4o5o3XhMRYFqw0tvXBHM','Ο ΛΕΩΝΙΔΑΣ & ΟΙ 300','Fanariou 73, Patra',38.2331936,21.7431569,4.6,5),('ChIJj56MreNJXhMRWAsKa0J8W4k','Δακόλα Αγγελική Α','Paleon Patron Germanou 183-193, Patra',38.239739,21.7458183,4.9,25),('ChIJJU-orzo2XhMRWpzclnuGfzw','Φραγκάκης ΟΕ','Souniou 119, Patra',38.2299034,21.7262048,5,7),('ChIJJXZNNjtJXhMR_2Oug8KxoHw','Παραδοσιακό Οπωροπαντοπωλείο','6 συντάγματος 2, Πάτρα',38.2401769,21.7456062,4.9,16),('ChIJk0zmsB82XhMRaUVxT1MhpGY','Gitsis Konstantinos','Ionias 54, Patra',38.2359271,21.7399551,4.3,99),('ChIJK2mtFN9JXhMRQgGlzRIXc6k','Vasiliki Andrikopoulou','Mesologgiou 11, Patra',38.240273,21.7334759,5,35),('ChIJkRhinSg2XhMRipOQ12_hPzI','Libido','Akti Dimeon 17, Patra',38.23771229999999,21.72594149999999,4.5,569),('ChIJKT-X7SA2XhMR2dSVr5pougg','Arapis Market \'3A Arapis\' Ltd','Panachaikou 65, Patra',38.237414,21.733877,4.2,91),('ChIJKy7R3SY2XhMReaxikN_Jbb0','NIKOLOPOULOS PANAGIOTIS \'TO PARADOSIAKO PSOMI\'','Solomous 75, Patra',38.2367694,21.7303194,3,2),('ChIJl4E8Nd1JXhMRIItSjXdfOXo','Φροντιστήριο Φάσμα','Ελευθερίου Βενιζέλου και Γεωργιου Παπανδρέου ,Πάτρα 262 21, Patra',38.22967259999999,21.7411852,5,6),('ChIJLbeqKhk2XhMRKRTbz6Mkha4','ΓΑΣΠΑΡΙΝΑΤΟΥ ΠΑΥΛΙΝΑ ΘΕΟΦΑΝΗΣ','Ionias 103, Patra',38.23256370000001,21.74072280000001,5,21),('ChIJlQV3HyY2XhMRpjjYBlws0d4','RAPTI Boutri Vasiliki Zakinthinos Xristos Accounting Tax office','Archiepiskopou Kirillou 2, Patra',38.2365548,21.7259375,4.4,7),('ChIJlQzUWic2XhMRRj2o3g9QiWw','Αχαϊκή Διαχειριστική (Επαγγ. Καθαρισμοί)','Solomou 24, Patra',38.238876,21.730667,4.1,20),('ChIJMQP6EbU3XhMRBtsPNWT_DiQ','liberis ψωμι-καφες-γλυκο','Alexandrou Papanastasiou 16, Patra',38.2303443,21.7279804,4.5,24),('ChIJMSeG8hk2XhMRRhwsF8fhP3Y','The Bright Star','Themistokleous 116, Patra',38.2331756,21.72813919999999,4.7,27),('ChIJmxF_PCc2XhMRJpnrz44FtbU','Ανδρικόπουλος Super Market','Solomous 53, Patra',38.2378785,21.7305419,4.4,107),('ChIJmzSR7SA2XhMRpWcgvrhnQEY','ΣΥΜΕΩΝΙΔΗΣ ΠΕΡΙΚΛΗΣ','Smirnis 72, Patra',38.2374742,21.7338221,5,32),('ChIJn_SgKe03XhMRvsbE3xFr8Ao','Συνεργείο Αυτοκινήτων παντός τύπου Κατσικάκης Νικόλας','Pindou 3, Patra',38.23078,21.7434569,5,13),('ChIJn65BbOJJXhMRRvBmSjqKNX0','Zelekt S.A.','Kalavriton 2, Patra',38.23776830000001,21.7452253,4.4,115),('ChIJNce1WSQ2XhMRCxdWbKOr_8M','Cafe Ανδρέας','Solomous 140, Patra',38.2324011,21.7295204,3.2,18),('ChIJNQv7Pxw2XhMReRJTJFtt4xc','Et Cafe','Leoforos Georgiou Papandreou 59A, Patra',38.23302,21.7450344,4.5,167),('ChIJnyLA8iM2XhMR2MQ82SsQXww','Micromed Διαγνωστικά','Eleftheriou Venizelou 67, Patra',38.2330242,21.7323019,4.8,4),('ChIJOfXygiQ2XhMRZmdy1DIIEg4','\'Η Καλή\' Καρβελά Καλιρρόη','Σολωμού κ Δελφων 32Πάτρα, Patra',38.2315032,21.7296407,4.7,43),('ChIJowSURxM3XhMRmbAxgMezpuk','Areti Textile','Ionias 39, Patra',38.2364395,21.7400384,5,3),('ChIJOztsXBk2XhMRIu0EEdF27js','PHARMACY Damvounelis G. Kon / nos','Leoforos Georgiou Papandreou 85, Patra',38.2310536,21.7431452,5,3),('ChIJoZu2ICE2XhMRaYhwPdvHLkY','Axizei','Mesologgiou 69, Patra',38.2365135,21.7328594,4.8,4),('ChIJP-URlSY2XhMRXXseyEczfzI','MY COFFEE','Solomous 82Α, Patra',38.2357848,21.7300455,4.6,62),('ChIJP1bzTS82XhMRKDyRa4_p-j4','Κολυμβητήριο ΝΟΠ (Nautical Club of Patras)','Akti Dimeon, Patra',38.2390031,21.7249076,4.4,314),('ChIJpxBoqb43XhMRPoXjQGIk2C0','Edgy Cuts','Archiepiskopou Ierotheou 89, Patra',38.2366599,21.7333179,5,24),('ChIJpYe_5iM2XhMRxwCviSFImLA','ΝΤΟΥΒΑΣ ΑΘΑΝΑΣΙΟΣ','Voriou Ipirou 73, Patra',38.233711,21.7328662,4.7,17),('ChIJq8ifLjQ3XhMRwe_o9v8rl_M','Kōnstantínos','Platia Voriou Ipirou 102, Patra',38.2337332,21.7313892,5,10),('ChIJqXfObCc2XhMRnI9QBuMheio','Abige Hair&Style','Kapodistriou 28, Patra',38.2385109,21.7296609,4.9,51),('ChIJqXT_xCU2XhMRc5ulGeOpCoc','Coffee Island','Κορίνθου &, Dimitriou Maximou 22, Patra',38.2341489,21.7279444,4.7,177),('ChIJQZbR3xQ3XhMRyaR2SBYu29I','Excellent Car Wash','Dimitriou Maximou 22, Patra',38.2343274,21.7281153,4.4,7),('ChIJR56ibOhJXhMRc3gu6QZZ8ek','Μπουκέτο Μπαλόνια','Korinthou, Patra',38.2357305,21.7278594,4.4,34),('ChIJRb9uAz43XhMRexZ2BgsH0cs','Paris house 2','Selefkias 11, Patra',38.2297166,21.7302191,3.5,2),('ChIJRbfvEiY2XhMRy1BekwIyAC4','Subaru Service - Παπανδρέου Παναγιώτης','Maizonos 313, Patra',38.2359621,21.7270514,4.8,75),('ChIJReMkcU03XhMRHtlq-RGG_Mc','Καφεκοπτείο Μεξικάνος','Korinthou 453, Patra',38.2386062,21.7284374,4.7,110),('ChIJs13fMVdJXhMRdfoTBribjjc','Moccup','Dimitriou Gounari 195, Patra',38.23973549999999,21.7423175,4.7,17),('ChIJs26l3KI3XhMR7NBzdimtWlc','Σκλαβενιτης','Ιωνίας 90 &, Damonos, Patra',38.2348349,21.7401493,4.5,66),('ChIJS8X0pWY3XhMRzrGX7803y-8','Coffee Lab ΠΑΠΑΝΔΡΕΟΥ 49 ΠΑΤΡΑ','Leoforos Georgiou Papandreou 49, Patra',38.2338846,21.7458634,4.6,28),('ChIJsTB4eiQ2XhMRYHsB0svbUhI','AutoSport','Eleftheriou Venizelou 42-46, Patra',38.23253649999999,21.7311391,4.7,87),('ChIJsVkvueNJXhMRB3fJo2F0Eg8','Καφε Φιλικων','Paleon Patron Germanou 161-163, Patra',38.24014040000001,21.7452834,4.6,51),('ChIJSWbYERM3XhMRX5qduCDaczY','ΦΙΛΙΠΠΟΣ ΑΛΕΥΡΑ-ΜΠΑΧΑΡΙΚΑ-ΖΩΟΤΡΟΦΕΣ','Ionias 114, Patra',38.2339731,21.7402237,4.6,35),('ChIJSxcz2FI2XhMRkB05AbcRmlI','ΝΑΥΤΙΚΟΣ ΟΜΙΛΟΣ ΠΑΤΡΩΝ','Akti Dimeon 151, Patra',38.23881739999999,21.7251731,4.7,13),('ChIJt-jvWxk2XhMRmqTBLN1y4Fg','Coffee Amargo','Leoforos Georgiou Papandreou 51, Patra',38.233572,21.7455452,4.6,51),('ChIJt7LpHPs3XhMRn1RE73k4Bbs','Παραδοσιακό Παντοπωλείο Στασινόπουλος','Korinthou 370-374, Patra',38.2382114,21.7281936,4.6,14),('ChIJTyCVWvA3XhMRnNgdFRaTWE8','Κωτσόπουλος \'Ευθυγραμισεις\'','Dimitriou Maximou 6, Patra',38.23433560000001,21.7257251,4.9,162),('ChIJU_nWAOk3XhMRiIye0cMSMTE','Πέντε Δρόμοι','Agias Triados 20, Patra',38.23710550000001,21.7369131,0,0),('ChIJu-vWGU03XhMRQPtHWoqT688','Φούρνος Δημητρόπουλος','Skoufa 11, Patra',38.23240670000001,21.730495,4.6,11),('ChIJU2cC_5A3XhMRTltBi0TpJVo','Opap play Γ. Παπανδρεου 49','Leoforos Georgiou Papandreou 49, Patra',38.2337199,21.7457107,3.7,18),('ChIJu8vyBuJJXhMRfm0zkEgJDWU','SPORTS HOUSE','Smirnis 250, Patra',38.23710729999999,21.7438912,4.6,57),('ChIJU9iH_p83XhMRvlOk16boN8k','Grill house πατρα','Voriou Ipirou 89, Patra',38.2334066,21.7312731,4.4,33),('ChIJU9lb5SQ2XhMRC-mT4k-qJ5I','DIVINE CAFE','Delfon 30, Patra',38.23157129999999,21.7293953,4.5,24),('ChIJUb5ZXC82XhMRXaOkeHvXc_Y','Lazaridis, J., Ltd','Akti Dimeon 35, Patra',38.233859,21.7251125,4.9,282),('ChIJUf_lbyY2XhMRg9OS_Tm8jC4','auto giannakopoulos','Korinthou 483, Patra',38.23571010000001,21.7278575,4.4,30),('ChIJV-Z3PRw2XhMRP_npsTE0kOI','Kokois George','Dorileou 4, Patra',38.2337265,21.7454872,4.8,25),('ChIJv6i6xt9JXhMRVp9vNGd6MLY','Andrikópoulos','Nikita 60, Patra',38.2400806,21.736366,4.5,126),('ChIJVeODuCE2XhMRcDFqFETdzdw','Theos, Lambros, & Co. O.E.','Voriou Ipirou 23, Patra',38.2350382,21.735943,4.8,36),('ChIJVfLnrMVJXhMRkzUAT7CxG4U','Ζαχαροπλαστείο Γιώργος','Smirnis 231, Patra',38.2372635,21.7433585,4.6,21),('ChIJVQ35PeJJXhMRfqL9-SJiiv0','Marouda square','Karatza 114, Patra',38.2381883,21.7446046,3.9,299),('ChIJVzAMZC82XhMRbhndkrdgnck','Ena Cash And Carry','Akti Dimeon 28, Patra',38.2346426,21.7252919,4.2,69),('ChIJw1cp-C9JXhMR8v9XtGbMjCc','Mary Flogera Hairdressing Room','Georgiou Olimpiou 80, Patra',38.2387977,21.7346318,4.9,12),('ChIJw3Fe5Cc2XhMRHcQgQkfA6ok','House Art - Είδη Διακόσμησης - Αυτοκόλλητα, ταπετσαρίες, πίνακες & παραβάν','Ακτή Δυμαίων 10 & Ευμήλου, Georgiou Olimpiou, Patra',38.2397708,21.7266125,4.7,604),('ChIJW42MUT03XhMRGUH6OjHcTac','Didachos Bros - Auto','Dimitriou Maximou 54, Patra',38.23408060000001,21.7296291,4.9,68),('ChIJW666Vxk2XhMRo_D2yOU6YsY','Ευθυγραμμίσεις Μπαρδάκης','Leoforos Georgiou Papandreou 72, Patra',38.2316211,21.7434209,4.8,167),('ChIJw7aMQeJJXhMR4F6A4HR7Kio','Cooper Coffee & Snack','3ου ορειβατικού κ, Maragkopoulou, Patra',38.23815349999999,21.7453787,4.4,415),('ChIJwdFpF-JJXhMRFRwIQP7phY8','Ανδρικοπουλος Super Market','Karatza 114, Patra',38.2378692,21.7444974,4.3,123),('ChIJWQ__HeBJXhMRAKH10ZawcdQ','Nina Cafe Bar','Voulgareos 35, Patra',38.2380662,21.739193,4,1),('ChIJWz0kmCU2XhMR4zd8MYHwoOQ','Σταματόπουλος Βασίλειος - Ο Γερμανός','Voriou Ipirou 139, Patra',38.2333117,21.7270617,4.9,18),('ChIJWzSxwiY2XhMR0MLasqi7eJs','Theodosiou','Solomous 68, Patra',38.23646749999999,21.7302342,4.3,3),('ChIJx3OiIMg3XhMRFJiKIFiuXjs','ΚΡΕΑΤΑ ΑΧΑΙΑΣ Μανίκας Βασίλειος','Μεσολογγίου, Kapodistriou 44, Patra',38.2383148,21.7312379,4.7,6),('ChIJXw7utONJXhMRtc156JXTs80','MILOS','3ou Oreivatikoy 24, Patra',38.2393423,21.7453243,4.5,49),('ChIJxyaKVWlJXhMRKU0T1zcjjBo','nias hair art','Mesologgiou 19, Patra',38.2397484,21.7333301,4.3,6),('ChIJxZ_BF0lJXhMRgcQowKpjoQ8','Way Out Cafe','Ionias 1, Patra',38.23845540000001,21.7395409,4.9,23),('ChIJY4432yU2XhMR2jrWEN7aWls','Loukopoulou Georgia','Korinthou 418-420, Patra',38.2345139,21.7276574,4.4,7),('ChIJYdZBLCY2XhMRZRAQwVO1aEg','JUMBO','Akti Dimeon 17, Patra',38.2373882,21.7263741,4.1,1960),('ChIJYQIxGyE2XhMRupS59ERDUNc','Galaxias','Panachaikou 76, Patra',38.2360767,21.7337615,4.4,248),('ChIJz_07-W03XhMRvRymy1Ccda0','KEEP THE CUP','Solomous 83, Patra',38.2362409,21.7303368,4.7,60),('ChIJZSZOWxk2XhMRx_ZGHpVteCc','Κοσμοπουλος Θεοφάνης&Γεώργιος','Leoforos Georgiou Papandreou 80, Patra',38.2308628,21.7427149,4.5,146);
/*!40000 ALTER TABLE `poi_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-18 23:10:49