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
    <link rel="stylesheet" href="user-profile.min.css">
</head>
<body>
    <div class="container">
        <?php include("../php_partials/navbar/navbar.php") ?>
        <script src="../php_partials/navbar/navbar.js"></script>

        <header id="profile-picture-header">
            <div class="profile-picture"></div>
            <div class="profile-picture-text">My profile</div>
        </header>


        <form class="card" id="profile-form">
        <div class="form-group">
            <label for="input-username">Username</label>
            <div class="username-group">
                <input class="form-control username" formControlName="username" disabled>
            </div>
        </div>
        <div class="form-group">
            <label for="input-password">Email</label>
            <div class="password-group">
                <input class="form-control email" formControlName="email" disabled>
            </div>
        </div>
        <div class="form-group">
            <label for="input-password">Password</label>
            <div class="password-group">
                <input class="form-control password" id="input-password" aria-describedby="passwordHelp" formControlName="password">
                <button class="btn-pass"><i class="fas fa-eye-slash"></i></button>
            </div>
        </div>
        <button class="btn btn-custom-primary" id="prof-change-pass">Change password</button>
        </form>

        <div class="collapse-group">
            <button class="btn-custom-collapse" id="btn-registered-locations"
                type="button" data-bs-toggle="collapse" data-bs-target="#collapse-registered-locations"
                aria-expanded="false" aria-controls="collapseExample">
                Locations Registered <i class="fas fa-angle-down"></i>
            </button>
            <div class="collapse" id="collapse-registered-locations">
                <div class="card card-body">
                At a place with a really long name in order to cause overflow
                and for the scrollbar to be visible. I also changed its width so it
                is a lot thinner, just to look better.
                </div>
                <div class="card card-body">
                A poi
                </div>
            </div>
        </div>

        <div class="collapse-group">
            <button class="btn-custom-collapse" id="btn-days-positive"
                type="button" data-bs-toggle="collapse" data-bs-target="#collapse-days-positive"
                aria-expanded="false" aria-controls="collapseExample">
                Dates I declaired positive to Covid-19 <i class="fas fa-angle-down"></i>
            </button>
            <div class="collapse" id="collapse-days-positive">
                <div class="card card-body">
                Monday 14 August 2021, 13:24:23
                </div>
                <div class="card card-body">
                Wednesday 23 March 2022, 10:40:01
                </div>
            </div>
        </div>

        <?php include("../php_partials/ellipses/ellipses.php") ?>
    </div>
</body>
<script src="report-case.js"></script>
</html>