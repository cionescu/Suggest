<?php
    if (!isset($_GET['query'])) {
?>     
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel='stylesheet' type='text/css' href='bootstrap.css' />
            <script type="text/javascript" src="jquery-2.0.3.min.js"></script>
            <script type="text/javascript" src="suggest.js"></script>
            <title>Suggestion plug-in demo</title>
            <script type="text/javascript">
                $(document).ready(function(){
                    $("#query").suggest({url: "/"});
                });
            </script>
        </head>
        <body>
            <div class="container-fluid" style="margin-top:2%;">
                <div class="col-md-4 col-md-offset-2">
                    <div class="input-group">
                        <input type="text" name="q" id="query" class="form-control" />
                        <span class="input-group-btn">
                            <button class="btn btn-default" id="search" type="button">Search</button>
                        </span>
                    </div><!-- /input-group -->
                </div>
            </div>
        </body>
    </html>

<?php } else { 
    echo '{"name": "blah"}';
} ?>


