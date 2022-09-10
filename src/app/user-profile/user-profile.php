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
    <!-- Include jQuery -->
    <script src="../../../node_modules/jquery/dist/jquery.min.js"></script>
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
        
        <!-- MODAL -->
        <div class="modal fade" id="confirmPasswordModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to update your info?</h5>
            </div>
            <div class="modal-body">
                <label>Enter your password to continue:</label>
                <div class="password-group">
                    <input class="form-control password" id="modal-password" type="password" formControlName="password">
                    <button class="btn-pass" id="modal-password-btn"><i class="fas fa-eye-slash"></i></button>
                </div>
            </div>
            <div class="text-danger" hidden>Password is required!</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="modal-close">Close</button>
                <button type="button" class="btn btn-custom-primary" id="modal-confirm">Confirm</button>
            </div>
        </div>
        </div>
        </div>
        <!-- MODAL END -->
        <header id="profile-picture-header">
            <div class="profile-picture"></div>
            <div class="profile-picture-text">My profile</div>
        </header>

        <form class="card" id="profile-form">
        <div class="form-group">
            <label for="input-username">Username</label>
            <div class="username-group">
                <input class="form-control username" id="prof-form-username" formControlName="username">
            </div>
        </div>
        <div class="form-group">
            <label for="input-password">Email</label>
            <div class="password-group">
                <input class="form-control email" id="prof-form-email" formControlName="email" disabled>
            </div>
        </div>
        <div class="form-group">
            <label for="input-password">Password</label>
            <a tabindex=0 class="fas fa-info-circle" 
                data-toggle="tooltip" data-placement="right" data-trigger="focus hover click" title="Insert your new password.">
            </a>
            <div class="password-group">
                <input class="form-control password" id="prof-form-password" type="password" formControlName="password">
                <button class="btn-pass" id="prof-show-pass"><i class="fas fa-eye-slash"></i></button>
            </div>
            <small id="passwordHelp" class="form-text text-muted">
                    Password must contain numbers, upper and lower case letters, a special character #$*&@ and be 8 characters minimum.
            </small>
            <div class="text-danger" id="prof-password-invalid" hidden>
                Password must contain numbers, upper and lower case letters, a special character #$*&@ and be 8 characters minimum!
            </div>
        </div>
        <button class="btn btn-custom-primary" id="prof-update-info">Update Info</button>
        <div id="response-messages-container" hidden></div>
        </form>

        <div class="collapsables-wrapper">
            <div class="collapse-group" id="collapse-group-locations">
                <button class="btn-custom-collapse" id="btn-registered-locations"
                    type="button" data-bs-toggle="collapse" data-bs-target="#collapse-registered-locations"
                    aria-expanded="false">
                    Locations Registered <i class="fas fa-angle-down"></i>
                </button>
                <div class="collapse" id="collapse-registered-locations">
                </div>
            </div>

            <div class="collapse-group" id="collapse-group-covid-positive">
                <button class="btn-custom-collapse" id="btn-days-positive"
                    type="button" data-bs-toggle="collapse" data-bs-target="#collapse-days-positive"
                    aria-expanded="false">
                    Dates I declaired positive to Covid-19 <i class="fas fa-angle-down"></i>
                </button>
                <div class="collapse" id="collapse-days-positive">
                </div>
            </div>
        </div>

        <?php include("../php_partials/ellipses/ellipses.php") ?>
    </div>
</body>
<script type="module" src="user-profile.js"></script>
</html>