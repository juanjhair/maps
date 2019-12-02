<?php
date_default_timezone_set('America/Lima');  
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>



<script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8wLGS5CZVS0QpvEY3PuWPkOFDxC0rvno&libraries=geometry">
</script>
<script type="text/javascript" src="js/map.js"></script>
</head>
    <body>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div id="map_canvas"  class="map_canvasdiv" >
                </div>
            </div>
            <div class="col-6">
                <div id="contenido"  class="contentdiv">
                </div>
            </div>
        </div>
    </div>
       
    </body>
</html>