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
    <link rel="stylesheet" href="../angular_components/dist/angular-register/styles.css">
    <script type="text/javascript" src="../angular_components/dist/angular-register/scripts.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-register/runtime.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-register/polyfills.js"></script>
    <script type="text/javascript" src="../angular_components/dist/angular-register/main.js"></script>
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="register.min.css">
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/ellipses/ellipses.min.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="title">
                <span class="highlight-primary">Create</span> your account here!
            </div>
        </header>

        <register-card></register-card>

        <?php include(ROOT_PATH.'/php_partials/ellipses/ellipses.php'); ?>
    </div>
</body>
</html>