<?php
    define('ROOT_PATH', dirname(__DIR__));
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="../../../resources/EllipseGraphic.png">
    <!-- TODO: ADD MORE METADATA -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Covid-19 Tracing</title>
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <!-- Include Fontawesome -->
    <link rel="stylesheet" href="../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"/>
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/navbar/navbar.min.css">
    <!-- Include leaflet -->
    <link rel="stylesheet" href="../../../node_modules/leaflet/dist/leaflet.css">
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="home.min.css">
</head>
<body>
    <div class="container">
        <?php include("../php_partials/navbar/navbar.php") ?>
        <script src="../php_partials/navbar/navbar.js"></script>

        <header id="home-header">
            Home
        </header>

        <section class="home-search">
            <form class="form" id="search-pois-form">
                <input class="form-control" id="search-pois-inp" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" id="search-pois-btn" type="submit">Search</button>
            </form>
        </section>

        <section class="home-map">
            <div id="map"></div>
        </section>
    </div>
</body>
<script src="../../../node_modules/leaflet/dist/leaflet.js"></script>
<!-- <script src="../auth_helper.js"></script> -->
<script type="module" src="home.js"></script>
</html>