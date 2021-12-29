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
    <link rel="stylesheet" href="../../../node_modules/bootstrap/dist//css/bootstrap.min.css"></link>
    <!-- Include page local stylesheet -->
    <link rel="stylesheet" href="../css/login.min.css">
</head>
<body>
    <div class="container">
        <header>
            <span class="highlight-primary">Covid-19</span> Tracing
        </header>

        <form class="card card-login">
            <div class="form-group">
                <label for="input-username">Username</label>
                <input type="username" class="form-control" id="input-username">
            </div>
            <div class="form-group">
                <label for="input-password">Password</label>
                <input type="password" class="form-control" id="input-password" aria-describedby="passwordHelp">
                <small id="passwordHelp" class="form-text text-muted">We'll never share your password with anyone else.</small>
            </div>
            <div class="card-footer-login">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="remember-check">
                    <label class="form-check-label" for="remember-check">Remember me</label>
                </div>
                <button type="submit" class="btn btn-custom-primary btn-login">Login</button>
            </div>
        </form>

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

        <div class="ellipses">
            <div class="ellipsis large"></div>
            <div class="ellipsis small"></div>
        </div>
    </div>
</body>
</html>