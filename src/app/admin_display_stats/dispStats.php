<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include Bootstrap -->
    <script src="../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <!-- Include required files for the partials -->
    <link rel="stylesheet" href="../php_partials/admin_navbar/admin_navbar.min.css">
    <!-- Include local stylesheet -->
    <link rel="stylesheet" href="./dispStats.min.css">
    <title>Document</title>
</head>
<body>
    <?php include "../php_partials/admin_navbar/admin_navbar.php"?>
    <div class="mt-3">
        <div class="row">
            <div class="col">
                <label class="form-label">Location Registrations Counter:</label>
            </div>
            <div class="col">
                <label class="form-label">Covid Cases Registered:</label> 
            </div>
            <div class="col">
                <label class="form-label">Total Number of visits by patients that have Covid:</label>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="text" id="loc-regs" class="form-control" readonly>
            </div>
            <div class="col">
                <input type="text" id="cases-regs" class="form-control" readonly> 
            </div>
            <div class="col">
                <input type="text" id="patient-visits" class="form-control" readonly>
            </div>
        </div>
    </div>
    <div>
        <label class="form-label" id="classify-d">Classification of POI types based on the amount of visits:</label>
        <section class="ds-table-section">
            <table class="table table-responsive" id="f-table">
                <thead class="table-dark">
                    <tr>
                        <th scope="col" class="col-1">Number</th>
                        <th scope="col" class="col-1">Type of POI</th>
                        <th scope="col" class="col-1">Amount of visits</th>
                    </tr>
                </thead>
                <tbody id="f-table-body">

                </tbody>
            </table>
        </section>
    </div>
    <div>
        <label class="form-label" id="classify-e">Classification of POI types based on the amount of visits by covid patients:</label>
        <section class="ds-table-section">
            <table class="table table-responsive" id="g-table">
                <thead class="table-dark">
                    <tr>
                        <th scope="col" class="col-1">Number</th>
                        <th scope="col" class="col-1">Type of POI</th>
                        <th scope="col" class="col-1">Amount of visits by covid patients</th>
                    </tr>
                </thead>
                <tbody id="g-table-body">

                </tbody>
            </table>
        </section>
    </div>
</body>
<script src="./dispStats.js"></script>
</html>