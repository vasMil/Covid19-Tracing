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
            Report your case
        </header>

        <div class="card card-info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vero sapiente ab hic quos maxime a quidem dolorem accusamus recusandae molestias sunt sit, numquam totam libero iste quibusdam ipsam.
                Odio cupiditate ad quos reprehenderit qui consectetur quod sed, a architecto, 
                culpa fugiat assumenda quas eligendi omnis totam esse natus perferendis ratione!
        </div>

        <section class="rc-form">
            <form>
                <input type="date" id="datepicker" name="date-tested-positive">
                <button class="btn btn-custom-primary" type="submit">Report</button>
            </form>
        </section>

        <?php include("../php_partials/ellipses/ellipses.php") ?>
    </div>
</body>
<script src="report-case.js"></script>
</html>