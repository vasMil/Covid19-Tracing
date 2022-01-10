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
    <!-- Include required files for the angular element: login-card -->
    <link rel="stylesheet" href="../angular_components/dist/angular-login/styles.css">
    <script type="text/javascript" src="../angular_components/dist/angular-login/scripts.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-login/runtime.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-login/polyfills.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-login/main.js"></script>
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist//css/bootstrap.min.css"></link>
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="login.min.css">
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/ellipses/ellipses.min.css">
</head>
<body>
    <div class="container">
        <header>
            <span class="highlight-primary">Covid-19</span> Tracing
        </header>

        <login-card></login-card>

        <section class="new-here">
            <div class="subtitle">
                    <span class="highlight-primary">New</span> here?
                    <span class="highlight-primary">Learn</span> what we do!
            </div>
            <div class="card card-info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vero sapiente ab hic quos maxime a quidem dolorem accusamus recusandae molestias sunt sit, numquam totam libero iste quibusdam ipsam.
                Odio cupiditate ad quos reprehenderit qui consectetur quod sed, a architecto, 
                culpa fugiat assumenda quas eligendi omnis totam esse natus perferendis ratione!
                <button class="btn btn-custom-primary">Join Us</button>
            </div>
        </section>

        <section class="our-team">
            <div class="subtitle">
                Our <span class="highlight-primary">Team</span>!
            </div>
            <div class="card card-info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vero sapiente ab hic quos maxime a quidem dolorem accusamus recusandae molestias sunt sit, numquam totam libero iste quibusdam ipsam.
            </div>
        </section>
        <?php include(ROOT_PATH.'/php_partials/ellipses/ellipses.php'); ?>
    </div>
</body>
</html>