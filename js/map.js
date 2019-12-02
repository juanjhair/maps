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
arr_point[1]=new google.maps.LatLng(-7.6933833,-79.38357777777779);//MALABRIGO
arr_point[2]=new google.maps.LatLng(-11.5792083,-77.26909444444445);//CHAMCAY
arr_point[3]=new google.maps.LatLng(-10.8001917,-77.74585277777778);//SUPE
arr_point[4]=new google.maps.LatLng(-12.0003056,-77.11521944444443);//CALLAO
arr_point[5]=new google.maps.LatLng(-11.0056194,-77.64852777777779);//VEGUETA
arr_point[6]=new google.maps.LatLng(-16.2332083,-73.69741111111111);//ATICO 1
arr_point[7]=new google.maps.LatLng(-16.402125,-73.22045);//LA PLANCHADA

arr_point_radios[0]=6437.38;//CHIMBOTE
arr_point_radios[1]=1931.21//MALABRIGO
arr_point_radios[2]=1609.34//CHAMCAY
arr_point_radios[3]=724.2048//SUPE
arr_point_radios[4]=6598.31//CALLAO
arr_point_radios[5]=1287.48//VEGUETA
arr_point_radios[6]=1609.34//ATICO 1
arr_point_radios[7]=2414.02;//LA PLANCHADA
//var radius = 2414.02;

//GEOCERCA POLINOMIAL
var arr_point_poligono=[];
var poligonos=[];
//PISCO
arr_point_poligono[0]=
[
    {lat: -13.440925, lng: -76.23163611111111},
    {lat: -13.4293167, lng: -76.16155},
    {lat: -13.8250083, lng: -76.23479166666667},
    {lat: -13.790875, lng: -76.28862777777778},
    {lat: -13.440925, lng: -76.23163611111111}
]; 
//MATARANI
arr_point_poligono[1]=
[
    {lat: -16.9774611, lng: -72.12498888888888},
    {lat: -17.0191306, lng: -72.13337222222223},
    {lat: -17.0397111, lng: -72.08549166666666},
    {lat: -17.01915, lng: -72.05490277777777},
    {lat: -16.9774611, lng: -72.12498888888888}
];
//MOLLENDO
arr_point_poligono[2]=
[
    {lat: -17.0181333, lng: -72.049425},
    {lat: -17.0229222, lng: -72.04934166666666},
    {lat:-17.0295694, lng: -72.03677499999999},
    {lat: -17.0270972, lng: -72.022825},
    {lat: -17.0181333, lng: -72.049425}
];
//ILO 1 Y 2
arr_point_poligono[3]=
[
    {lat: -17.5567778, lng: -71.36898333333333},
    {lat: -17.7083444, lng: -71.42060000000001},
    {lat: -17.7212361, lng: -71.33905},
    {lat: -17.5604917, lng: -71.34313888888889},
    {lat: -17.5567778, lng: -71.36898333333333}
];

var DentroTemp=[];
var FueraTemp=[];

var infowindow = new google.maps.InfoWindow({});
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-547033, -4714356);
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
    
    for(var i = 0; i < arr_point_poligono.length; i++){
         var flightPath = new google.maps.Polyline({
            path: arr_point_poligono[i],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          poligonos.push(flightPath);
          flightPath.setMap(map);
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
        for(var i = 0; i < poligonos.length; i++){
            for(var j = 0; j < markertemp.length; j++){
                if (google.maps.geometry.poly.containsLocation(markertemp[i].getPosition(), poligonos[i])) {
                    array_dentro_poli.push(markers_data[j]);
                }else{
                    if(array_fuera_Temp2.length==0){
                        array_fuera_Temp2.push(markers_data[j]);
                    }else{
                        index1=array_fuera_Temp2.indexOf(markers_data[j]);
                        if(index1==-1){
                            array_fuera_Temp2.push(markers_data[j]);
                        }
                    }
                   
                }
            }
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
