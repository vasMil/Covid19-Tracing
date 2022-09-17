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
    <!-- Include Chart.js -->
    <script src="../../../node_modules/chart.js/dist/chart.min.js"></script>
    <!-- Include required files for the partials -->
    <link rel="stylesheet" href="../php_partials/admin_navbar/admin_navbar.min.css">
    <!-- Include local stylesheet -->
    <link rel="stylesheet" href="./dispStats.min.css">
    <title>Document</title>
</head>
<body>
    <?php include "../php_partials/admin_navbar/admin_navbar.php"?>
    <script src="../php_partials/admin_navbar/admin_navbar.js"></script>
    
    <div class="container">
        <section class="stats-numbers">
            <div class="stats-group" id="stats-locations-registered">
                <label class="form-label">Location Registrations Counter</label>
                <div id="loc-regs" class="form-control"></div>
            </div>

            <div class="stats-group" id="stats-cases-registered">
                <label class="form-label">Covid Cases Registered</label> 
                <div id="cases-regs" class="form-control"></div>
            </div>

            <div class="stats-group" id="stats-visits-by-patients">
                <label class="form-label">Total Number of visits by patients that have Covid</label>
                <div id="patient-visits" class="form-control"></div>
            </div>
        </section>

        <section class="ds-table-section">
            <label class="form-label">Points Of Interest in DB:</label>
            <table class="table table-responsive" id="ds-table">
                <thead class="table-light">
                    <tr>
                        <th scope="col" class="col-1">
                            Number
                        </th>
                        <th scope="col" class="col-2">
                            Type of POI
                        </th>
                        <th scope="col" class="col-2">
                            <button id="amount-visits-col" class="sort-col">
                                Amount of Visits
                                <span id="sort-col-span"> &nbsp <i class='fas fa-angle-down'></i></span>
                            </button>
                        </th>
                        <th scope="col" class="col-2">
                            <button id="amount-covid-visits-col">Number of Covid Cases Visited</button>
                        </th>
                    </tr>
                </thead>
                <tbody class="ds-table-body" id="ds-table-body">
                </tbody>
            </table>
        </section>

        <section class="stats-diagram-filters">
            <label class="form-label">Diagrams:</label>
            <div class="stats-diagram-filters">
                <div class="stats-diagram-group" id="per-day-filters">
                    <label class="stats-diagram-text">Per Day:</label>
                    <div class="stats-date-group">
                        <label for="datepicker-start-date" class="stats-diagram-text">Starting Date</label>
                        <input class="stats-datepicker" id="startdate-day" type="date" name="datepicker-start-date">
                    </div>
                    <div class="stats-date-group">
                        <label for="datepicker-end-date" class="stats-diagram-text weekpicker" id="end-date-label"
                            data-toggle="tooltip" data-placement="top" title="Click here to change the range!">End Date - </label>
                        <input class="stats-datepicker" id="enddate-day" type="date" name="datepicker-end-date" readonly>
                    </div>
                    <div class="stats-checkboxes">
                        <div class="stats-checkbox-group">
                            <input class="form-check-input"
                                id="check-per-day-visits" type="checkbox" name="day-visits" value="">
                            <label for="day-visits">Show amount of visits</label>
                        </div>

                        <div class="stats-checkbox-group">
                            <input class="form-check-input"
                                id="check-per-day-covid-visits" type="checkbox" name="day-visits-covid" value="">
                            <label for="day-visits-covid">Number of visits by Covid19 cases</label>
                        </div>
                    </div>
                    <button class="btn btn-custom-primary fetch-chart-data" id="refresh-day">Refresh</button>
                </div>

                <div class="stats-diagram-group" id="per-hour-filters">
                    <label class="stats-diagram-text">Per Hour:</label>
                    <div class="stats-date-group">
                        <label for="datepicker-date" class="stats-diagram-text">Date</label>
                        <input class="stats-datepicker" id="hour-datepicker" type="date" name="datepicker-date">
                    </div>
                    <div class="stats-checkboxes">
                        <div class="stats-checkbox-group">
                            <input class="form-check-input" 
                                id="check-per-hour-visits" type="checkbox" name="hour-visits" value="">
                            <label for="hour-visits">Show amount of visits</label>
                        </div>

                        <div class="stats-checkbox-group">
                            <input class="form-check-input" 
                                id="check-per-hour-covid-visits" type="checkbox" name="hour-visits-covid" value="">
                            <label for="hour-visits-covid">Number of visits by Covid19 cases</label>
                        </div>
                    </div>
                    <button class="btn btn-custom-primary fetch-chart-data" id="refresh-hour">Refresh</button>
                </div>
            </div>
        </section>

        <section class="stats-diagrams">
            <div class="stats-digram-group" id="per-day-chart-group" hidden>
                <label for="per-day-canvas" class="stats-diagram-text">Per Day Graph:</label>
                <canvas id="per-day-chart" height="100" name="per-hour-canvas"></canvas>
                <div class="diagram-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sit amet enim sed purus pellentesque mollis. Etiam nec dictum risus, vitae faucibus
                    libero. Nulla quis nisl placerat, porta nunc ac, ullamcorper arcu. Mauris eget tempor tellus, velf!
                </div>
            </div>

            <div class="stats-digram-group" id="per-hour-chart-group" hidden>
                <label for="per-hour-canvas" class="stats-diagram-text">Per Hour Graph:</label>
                <canvas id="per-hour-chart" height="100" name="per-hour-canvas"></canvas>
                <div class="diagram-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sit amet enim sed purus pellentesque mollis. Etiam nec dictum risus, vitae faucibus
                    libero. Nulla quis nisl placerat, porta nunc ac, ullamcorper arcu. Mauris eget tempor tellus, velf!
                </div>
            </div>
        </section>
    </div>
</body>
<script type="module" src="./dispStats.js"></script>
</html>
