<?php 

   try{
        $conexion = new PDO("mysql:host=190.117.153.92;dbname=estadosat","monitor","monitor2019.");
        $conexion->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
        $data="";
        $stmt=$conexion->prepare("SELECT nombre,latitud,longitud FROM centinela");
        $stmt->execute();
        $data=$stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        if(!empty($data)){
            $i=0;
            foreach($data as $key=>$value){
                $nombre=$value["nombre"];
                $latitud=$value["latitud"];
                $longitud=$value["longitud"];
                $comptodos = array('nombre'=> $nombre,'latitud'=> $latitud ,'longitud'=> $longitud);
                $Alldata[$i] = $comptodos ;
                $i++;
            }
            $Alldata[$i]=array('nombre'=> 'prueba','latitud'=>(-13.831666*60000)  ,'longitud'=> (-76.260162*60000));
            $conexion=null;
            print_r(json_encode($Alldata)); 
        }
        
   }catch(\PDOException $e){
       echo "El error es ".$e->getMessage();
   }


?>