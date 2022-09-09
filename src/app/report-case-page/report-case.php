<?php
    define('ROOT_PATH', dirname(__DIR__));
?>

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
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/navbar/navbar.min.css">
    <link rel="stylesheet" href="../php_partials/ellipses/ellipses.min.css">
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="report-case.min.css">
</head>
<body>
    <div class="container">
        <?php include("../php_partials/navbar/navbar.php") ?>
        <script src="../php_partials/navbar/navbar.js"></script>

        <header id="rc-header">
            <div class="header">
                <span class="highlight-primary">Report </span>your case
            </div>
        </header>

        <div class="card card-info">
            <div class="card-group">
                <b class="highlight-primary">Hey!</b> &nbsp Have you tested positive for Covid within the last &nbsp <b class="highlight-primary">14 days?</b>
                You may report it here and let the people around you know they have been exposed to Covid.
            </div>
            <div class="card-group">
                <b class="highlight-primary"> Do not worry!</b> &nbsp
                We will NOT share your name, no one will ever know it was you. &nbsp<i class="far fa-laugh-wink"></i>
            </div>
        </div>

        <section class="rc-form">
            <form>
                <label id="rc-form-label">The day you tested positive:</label>
                <input type="date" id="datepicker" name="date-tested-positive">
                <button class="btn btn-custom-primary" id="rc-register" type="submit">Report</button>
            </form>
        </section>

        <?php include("../php_partials/ellipses/ellipses.php") ?>
    </div>
</body>
<script src="report-case.js"></script>
</html>