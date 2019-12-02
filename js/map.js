//-----------------------------------------------------MAPAS
var map;
var global_markers = []; 
var unofecha = [];
 
var unovelocidad = [];
var rumbo = [];
var velocidad  ;
var Latitud   ;
var Longitud   ;

var universalvalor=1;

//GEOCERCA CIRCULAR
var arr_point=[];
var arr_point_radios=[];
arr_point[0]=new google.maps.LatLng(-9.1054194,-78.563675);//CHIMBOTE

arr_point_radios[0]=6437.38;//CHIMBOTE
//var radius = 2414.02;



var DentroTemp=[];
var FueraTemp=[];

var infowindow = new google.maps.InfoWindow({});
function initialize() {

    var coords = {};
    navigator.geolocation.getCurrentPosition(position => {
        console.log("position");
        console.log(position.coords.latitude);
        coords = {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          };
          console.log("coords");
          console.log(coords);
      });
      console.log("coords");
console.log(coords);

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(coords.lng,coords.lat);
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false ,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER
        }
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    for(var i = 0; i < arr_point.length; i++){
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: arr_point[i],
            radius: arr_point_radios[i]
        });
    }
    
  
    PonerTodos(); 
   var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    
    
}
function centrarmapa(){
            
    var limites = new google.maps.LatLngBounds();
        for(var i = 0; i < global_markers.length; i++){
                var markado = global_markers[i] ; 
                limites.extend(markado.getPosition());
    } 
    map.fitBounds(limites);
}
function addMarker(markers) {
    clearOverlays();
    
    var limites = new google.maps.LatLngBounds();
    var cercazona = "";
    var iconobarco = "";
    var geo = "";

    var markertemp=[];
    var array_markers=[];
    var markers_data=[];
    var myLatlngTEMP;

    var array_dentro=[];
    var array_fuera=[];
    var array_dentro_poli=[];
    var array_fuera_poli=[];

    var array_dentro_all=[];
    var array_fuera_all=[];


    for (var i = 0; i < markers.length; i++) {
        markers_data[i]={
            lat: parseFloat(markers[i][0])/60000,
            lng: parseFloat(markers[i][1])/60000,
            nombre: markers[i][2],
        }
        myLatlngTEMP = new google.maps.LatLng(markers_data[i].lat,markers_data[i].lng);
        array_markers[i]=myLatlngTEMP;

        markertemp[i]=new google.maps.Marker({
            position: myLatlngTEMP
          
        });
    }
    for (var i = 0; i < markertemp.length; i++) {
        console.log(markertemp[i].getPosition());

    }

    var array_fuera_Temp=[];
    var array_fuera_Temp2=[];
    var index;
    var index1;
    for(var i = 0; i < arr_point.length; i++){
        for(var j = 0; j < array_markers.length; j++){
            if(google.maps.geometry.spherical.computeDistanceBetween(array_markers[j],arr_point[i]) <=arr_point_radios[i]){
                if(array_dentro.length==0){
                    array_dentro.push(markers_data[j]);
                  
                }else{
                    index=array_dentro.indexOf(markers_data[j]);
                    if(index==-1){
                        array_dentro.push(markers_data[j]);
                     
                    }
                }
            }else{
                if(array_fuera_Temp.length==0){
                    array_fuera_Temp.push(markers_data[j]);
                }else{
                    index=array_fuera_Temp.indexOf(markers_data[j]);
                    if(index==-1){
                        array_fuera_Temp.push(markers_data[j]);
                    }
                }
            }
        }
    } 
    
    for(var i = 0; i < array_fuera_Temp.length; i++){
        if(array_dentro.indexOf(array_fuera_Temp[i])==-1){
            array_fuera.push(array_fuera_Temp[i]);
           
        }
    }
    var imagebarco;
    for(var i = 0; i < array_dentro.length; i++){
        geo="1";
    
        iconobarco = "barcoin.png";	
        	
        imagebarco = {
        url: "img_barco/"+iconobarco,
        scale : 1,
        };
        var myLatlng = new google.maps.LatLng(array_dentro[i].lat, array_dentro[i].lng);
    
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
        label: {text: array_dentro[i].nombre+"",color: 'white',fontSize: '10px' ,fontWeight: "bold"},
    
        icon: imagebarco,
            
        zIndex: (i+1) ,
            title: array_dentro[i].titulo_name
        });
        
        var contentString = "<html><body><div>" + array_dentro[i].nombre + "<br>Geocerca: "+geo+"</div></body></html>";
        marker['infowindow'] = contentString;
        limites.extend(marker.position);
        
        global_markers[i] = marker;
        
        google.maps.event.addListener(global_markers[i], 'click', function() {
            infowindow.setContent(this['infowindow']);
            infowindow.open(map, this);
        });  
    } 
    for(var i = 0; i < array_fuera.length; i++){
        geo="0";
        if(array_fuera[i].bnwas_energia==1){
            iconobarco = "barco_out_on.png";	
        }else{
            iconobarco = "barco_out_off.png";	
        } 	
        
        imagebarco = {
            url: "img_barco/"+iconobarco,
            scale : 1,
            };
            var myLatlng = new google.maps.LatLng(array_fuera[i].lat, array_fuera[i].lng);
        
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
            label: {text: array_fuera[i].nombre+"",color: 'white',fontSize: '10px' ,fontWeight: "bold"},
        
            icon: imagebarco,
                
            zIndex: (i+1) ,
                title: array_fuera[i].titulo_name
            });
            
            var contentString = "<html><body><div>" + array_fuera[i].nombre + "<br>Geocerca: "+geo+"</div></body></html>";
            marker['infowindow'] = contentString;
            limites.extend(marker.position);
            
            global_markers[global_markers.length] = marker;
           
            google.maps.event.addListener(global_markers[i], 'click', function() {
                infowindow.setContent(this['infowindow']);
                infowindow.open(map, this);
            });  
        }
       
        
        
        for(var i = 0; i < array_fuera_Temp2.length; i++){
            if(array_dentro_poli.indexOf(array_fuera_Temp2[i])==-1){
                array_fuera_poli.push(array_fuera_Temp2[i]);
            }
        }
        console.log("array_dentro");
        console.log(array_dentro);
        console.log("array_dentro_poli");
        console.log(array_dentro_poli);
        console.log("array_fuera");
        console.log(array_fuera);
        console.log("array_fuera_poli");
        console.log(array_fuera_poli);

        


    for(var i = 0; i < array_dentro.length; i++){
        array_dentro_all.push(array_dentro[i]);
    }
    for(var i = 0; i < array_dentro_poli.length; i++){
        array_dentro_all.push(array_dentro_poli[i]);
    }
    for(var i = 0; i < array_fuera.length; i++){
        array_fuera_all.push(array_fuera[i]);
    }
    for(var i = 0; i < array_fuera_poli.length; i++){
        array_fuera_all.push(array_fuera_poli[i]);
    }
    console.log("array_dentro_all");
    console.log(array_dentro_all);
    console.log("array_fuera_all");
    console.log(array_fuera_all);
    if(DentroTemp.length!=0){
        for(i=0;i<DentroTemp.length;i++){
            if(array_dentro_all.indexOf(DentroTemp[i])!=-1){

            }
        }
    }




    DentroTemp=array_dentro_all;
    FueraTemp=array_fuera_all;


    //llevarTodos(array_dentro_all,array_fuera_all);
    map.fitBounds(limites);	
    
}
function llevarTodos(array_dentro,array_fuera){
     
    $.ajax({
        url:'time.php',
        type: 'post',
        datatype: 'json',
        data: {
            dentro: array_dentro,
            fuera: array_fuera
        }
    }).done(function(res){
        //$('#contenido').html(res);
    }).fail(function(){
        alert("An error occurred, try again please");
    })
}
function PonerTodos(){
    clearOverlays();
    var todo = new Array(); 
    $.ajax({
        url:'getallgps.php',
        type: 'get',
    }).done(function(data){
        onmapa =JSON.parse(data);
        
        for (var i = 0; i < onmapa.length; i++ ) {
            var nombre = onmapa[i]["nombre"];
            var Latitud = parseFloat(onmapa[i]["latitud"]) ;
            var Longitud = parseFloat(onmapa[i]["longitud"]);
            todo[i] = new Array((Latitud), (Longitud),nombre); 

        }
        addMarker(todo);
    }).fail(function(){
        alert("An error occurred, try again please");
    })
     
    
}

function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '15px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click para centrar las EP';
    controlDiv.appendChild(controlUI);
    
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Centrar Mapa';
    controlUI.appendChild(controlText);
    
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        centrarmapa();
    });
                                
}

function clearOverlays() {

    for (var i = 0; i < global_markers.length; i++ ) {
        global_markers[i].setMap(null);
    }
    global_markers.length = 0;
}

window.onload = initialize;

setInterval(function(){
   
 PonerTodos();
    global_markers=[];
    array_dentro=[];
    array_fuera=[];
    array_dentro_all=[];
    array_fuera_all=[];
    array_dentro_poli=[];
    array_fuera_poli=[];

}, 120000);
