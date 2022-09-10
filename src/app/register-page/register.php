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
    <!-- Include required styles for the angular element: register-card -->
    <link rel="stylesheet" href="../angular_components/dist/angular-register/styles.css">
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"></link>
    <!-- Include the required stylesheets for the partials used in the current page -->
    <link rel="stylesheet" href="../php_partials/ellipses/ellipses.min.css">
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="register.min.css">
</head>
<body>
    <div class="container">
        <header>
            <span class="highlight-primary">Covid-19</span> Tracing
        </header>

        <div class="reg-form-container">
            <h3 class="title">
            Create your account <span class="highlight-primary">here!</span>
            </h3>
            <register-card id="register-card" apiUrl="http://localhost:8080/register"></register-card>

            <a class="already-have-account" href="../login-page/login.php">
                Already have an account?
            </a>
        </div>
        <?php include(ROOT_PATH.'/php_partials/ellipses/ellipses.php'); ?>
    </div>
</body>
<script src="./register.js"></script>
<!-- Include required scripts for the angular element: register-card -->
<script type="text/javascript" src="../angular_components/dist/angular-register/runtime.js"></script>
<script type="text/javascript" src="../angular_components/dist/angular-register/polyfills.js"></script>
<script type="text/javascript" src="../angular_components/dist/angular-register/main.js"></script>
</html>