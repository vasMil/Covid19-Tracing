<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <!-- TODO: ADD MORE METADATA -->
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
    <link rel="stylesheet" href="../php_partials/ellipses/ellipses.min.css">
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="exposed-covid.min.css">
</head>
<body>
    <div class="container">
        <?php include("../php_partials/navbar/navbar.php") ?>
        <script src="../php_partials/navbar/navbar.js"></script>

        <header id="ec-header">
            <div class="header">
                The<span class="highlight-primary"> POIs </span> where you have been <span class="highlight-primary">exposed </span>to the virus.
            </div>
        </header>


        <section class="ec-table-section">
            <table class="table table-responsive" id="ec-table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="col-1">#</th>
                        <th scope="col" class="col-6">Name</th>
                        <th scope="col" class="col-4">Address</th>
                        <th scope="col" class="col-5">Timestamp</th>
                    </tr>
                </thead>
                <tbody id="ec-table-body">

                </tbody>
            </table>
        </section>

        <section class="ec-map">
            <div id="map"></div>
        </section>

        <?php include("../php_partials/ellipses/ellipses.php") ?>
    </div>
</body>
<script src="../../../node_modules/leaflet/dist/leaflet.js"></script>
<script src="exposed-covid.js"></script>
</html>