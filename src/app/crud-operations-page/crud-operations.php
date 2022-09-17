<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <!-- Include Fontawesome -->
    <link rel="stylesheet" href="../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"/>
    <!-- Include required files for the partials -->
    <link rel="stylesheet" href="../php_partials/admin_navbar/admin_navbar.min.css">
    <!-- Include local stylesheet -->
    <link rel="stylesheet" href="./crud-operations.min.css">
    <title>Document</title>
</head>
<body>
    <?php include "../php_partials/admin_navbar/admin_navbar.php"?>
    <script src="../php_partials/admin_navbar/admin_navbar.js"></script>
    
    <div class="container">
        <section class="create">
            <div class="title">Create POIs</div>
            <form enctype="multipart/form-data" id="insert-pois">
                <!-- Add appropriate name for the file input -->
                <label for="create-file">Select a file:</label>
                <input type="file" accept="json" name="pois" id="input-insert-pois">
                <button class="btn btn-custom-primary" id="btn-insert-pois" disabled>Insert Submitted POIs</button>
            </form>
        </section>

        <section class="update">
            <div class="title">Update POIs</div>
            <form enctype="multipart/form-data" id ="update-pois">
                <label for="update-file">Select a file:</label>
                <!-- Add appropriate name for the file input -->
                <input type="file" accept="json" name="pois" id="input-update-pois">
                <button class="btn btn-custom-primary" id="btn-update-pois" disabled>Update Submitted POIs</button>
            </form>
        </section>

        <section class="delete">
            <div class="title text-danger" id="dangerZone">Danger Zone</div>
            <form>
                <label for="delete-file">Delete all POIs from the database!</label>
                <button class="btn btn-danger" id="btn-delete-pois">Delete</button>
            </form>
        </section>
    </div>
    <section class="console"></section>
</body>
<script src="./crud-operations.js"></script>
</html>