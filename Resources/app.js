
var Map = require('ti.map');
var win = Ti.UI.createWindow({backgroundColor: 'white'});



var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    //top: 110,
    //height: 350,
    region: {latitude:4.635986, longitude:-74.061992,
            latitudeDelta:0.05, longitudeDelta:0.05},
    animate:true,
    regionFit:true,
    userLocation:true,
    regionFit: true,
    animate: true
    //annotations:[mountainView]
});

// Bogotá borders

bogota_points = [
	{latitude:4.841874,longitude:-74.082419},
	{latitude:4.824940,longitude:-74.002940},
	{latitude:4.805354,longitude:-73.996675},
	{latitude:4.716272,longitude:-74.005743},
	{latitude:4.673488,longitude:-73.995963},
	{latitude:4.639526,longitude:-74.012614},
	{latitude:4.620009,longitude:-73.992525},
	{latitude:4.560933,longitude:-74.003789},
	{latitude:4.551607,longitude:-74.026363},
	{latitude:4.508952,longitude:-74.040309},
	{latitude:4.454017,longitude:-74.080306},
	{latitude:4.368440,longitude:-74.093095},
	{latitude:4.311944,longitude:-74.113140},
	{latitude:4.254846,longitude:-74.147783},
	{latitude:4.182837,longitude:-74.104571},
	{latitude:4.136687,longitude:-74.102778},
	{latitude:4.060025,longitude:-74.123640},
	{latitude:4.012963,longitude:-74.137589},
	{latitude:3.999192,longitude:-74.139760},
	{latitude:3.814228,longitude:-74.292539},
	{latitude:3.732009,longitude:-74.396222},
	{latitude:3.724130,longitude:-74.458707},
	{latitude:3.751194,longitude:-74.463514},
	{latitude:3.986862,longitude:-74.382146},
    {latitude:4.139567,longitude:-74.336170},
	{latitude:4.499808,longitude:-74.187861},
	{latitude:4.629514,longitude:-74.237300},
	{latitude:4.629514,longitude:-74.237300},
	{latitude:4.707603,longitude:-74.179603},
	{latitude:4.792535,longitude:-74.115740},
	//{latitude:4.841874,longitude:-74.082419}
];

var bogota_route = Map.createRoute({
    width: 4,
    color: '#f00',
    points: bogota_points,
});

mapview.addRoute(bogota_route);

// Label

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});




// Avoid that camera center go back from a region

/*
 * function turn
 * a, b, c are Points
 */
function turn(a, b, c) {
	z = (b.latitude - a.latitude) * (c.longitude - a.longitude) - (b.longitude - a.longitude) * (c.latitude - a.latitude);
	if(Math.abs(z) < 1e-9) return 0.0;
	return z;
}

function insideConvexBogotaPoligon(a){
	var lo = 0, hi = bogota_points.length - 1, mid, mul = 1.0;
	var z = turn(bogota_points[0], bogota_points[1], a);
	
	if(z * turn(bogota_points[hi], bogota_points[1], a) <= 0.0) return false;
	else{
		if(z < 0.0) mul = -1.0;
		
		while(hi - lo > 1){
		    mid = parseInt((lo + hi) / 2);
		    
		    if(turn(bogota_points[0], bogota_points[mid], a) * mul > 0.0) lo = mid;
		    else hi = mid;
		}
		return turn(bogota_points[lo], bogota_points[hi], a) * mul > 0.0;
	}
	return null;
}

var mountainView = Map.createAnnotation({
    latitude:4.635986,
    longitude:-74.061992,
    title:"ini",
    subtitle:'Mountain View, CA',
    //image: 'working.png',
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});
	
mapview.addAnnotation(mountainView);
	
mapview.addEventListener('regionchanged', function(evt) {
	var center = mapview.getRegion();

	if(center != null){
		//mountainView.setLatitude(center.latitude);
		//mountainView.setLongitude(center.longitude);
		alert(center.latitude + " " + center.longitude);
		
		if(insideConvexBogotaPoligon(center) == true){
			alert("Dentro");
		} else {
			alert("Fuera");
		}
	} else {
		alert("null");
	}
});

// Move region map

Ti.App.currentLat = 20;
Ti.App.currentLon = 10;

function rgnChanged(evt)
{
    //alert('map moved');
    Ti.App.currentLat = evt.latitude;
    Ti.App.currentLon = evt.longitude;
}

win.add(mapview);

// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
});

win.open();

/*
var MapModule = require('ti.map');
var rc = MapModule.isGooglePlayServicesAvailable();
switch (rc) {
    case MapModule.SUCCESS:
        Ti.API.info('Google Play services is installed.');
        break;
    case MapModule.SERVICE_MISSING:
        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
        
        break;
    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
        alert('Google Play services is out of date. Please update Google Play services.');
        break;
    case MapModule.SERVICE_DISABLED:
        alert('Google Play services is disabled. Please enable Google Play services.');
        break;
    case MapModule.SERVICE_INVALID:
        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
        break;
    default:
        alert('Unknown error.');
        break;
}


*/


/*
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();*/



