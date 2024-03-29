<?php
    define('ROOT_PATH', dirname(__DIR__));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="../../../resources/EllipseGraphic.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Covid-19 Tracing</title>
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <!-- Include Fontawesome -->
    <link rel="stylesheet" href="../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"/>
    <!-- Include leaflet -->
    <link rel="stylesheet" href="../../../node_modules/leaflet/dist/leaflet.css">
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/navbar/navbar.min.css">
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="reg-loc.min.css">
</head>
<body>
    <div class="container">
        <?php include("../php_partials/navbar/navbar.php") ?>
        <script src="../php_partials/navbar/navbar.js"></script>

        <header id="regLoc-header">
            Register your current location
        </header>

        <section class="reg-loc">
            <form class="col g-2">
                <div class="form-group">
                    <label class="form-label">Name:</label>
                    <input type="text" id="name" class="form-control" readonly>
                </div>

                <div class="form-group">
                    <label class="form-label">Address:</label>
                    <input type="text" id="address" class="form-control" readonly>
                </div>
                
                <div class="form-group col-md-3 col-sm-3 col-3">
                    <label class="form-label">Estimation:</label>
                    <input type="number" id="estim" class="form-control" min="0">
                </div>

                <div class="row justify-content-end">
                    <button class="btn col-3 btn-outline-success" id ="submitButton" type="submit">Submit</button>
                </div>
            </form>
        </section>

        <section class="regLoc-map">
            <div id="map"></div>
        </section>
        
        </div>
    </div>
</body>
<script src="../../../node_modules/leaflet/dist/leaflet.js"></script>
<script type="module" src="reg-loc.js"></script>
</html>