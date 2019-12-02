
<?php
    $link = mysqli_connect('190.117.153.92', 'monitor', 'monitor2019.', 'estadosat'); 
   
    if(isset($_POST['dentro'])){
        $dentro=$_POST['dentro'];
    }else{
        $dentro=array();
    }
    if(isset($_POST['fuera'])){
        $fuera=$_POST['fuera'];
    }else{
        $fuera=array();
    }



?>
<br>
    <?php 
    echo "<font face='Impact' size='5' color='#4A82F3'>DENTRO</font>";
    ?>
    <br>
    <br>
    <?php
    foreach($dentro as $key=>$value){
        echo $value['nombre'];
        echo "<br>";
    }
    ?>
    <br>
    <br>
    <?php 
    echo "<font face='Impact' size='5' color='#4A82F3'>FUERA</font>";
    ?>
    <br>
    <br>
    <?php
    foreach($fuera as $key=>$value){
        echo $value['nombre'];
        echo "<br>";
    }
    ?>
