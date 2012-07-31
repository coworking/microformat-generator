//Declare the variable that will store the geocode object
var geocoder;
var map;
function initialize() {
	//Set the geocoder variable equal to an instance of the google maps geocoder object as new google.maps.Geocoder()
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(47.6097, -122.3331);
	var myOptions = {
		center: latlng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	myOptions);
}

//Add a second function to your javascript code, call it codeAddress.  It will not have any values passed to it.
function codeAddress() {
	// grabs values for overlay box
	var spaceName = document.getElementById("spaceName").value;
	var sAddress = document.getElementById("inputTextAddress").value;
	var url = document.getElementById("url").value;
	var email = document.getElementById("email").value;
	//Call the geocode method of the geocoder object, this will take two passed in parameters.  The first is the GeocoderRequest, this says what kind of request is being made and what the request value is. The second is the callback function that will be used to process the results.
	geocoder.geocode( { 'address': sAddress}, function(results, status) {
		//The callback function should first check the status value of the callback function.  Use an IF statement to test the result, check to see if the status equal google.maps.GeocoderStatus.OK.  Also add an ELSE clause to the if statement as well.
		if (status == google.maps.GeocoderStatus.OK) {
			//If the status equals OK, call the setCenter method of the map object variable.  You will pass this method the results first geometry location.
			map.setCenter(results[0].geometry.location);
			var contentString = '<h2 id="firstHeading" class="firstHeading">' + spaceName + '</h2><div id="bodyContent">'+'<p>' + sAddress + '<br/><a href="' + url + '">' + url + '</a><br/><a href="mailto:' + email + '">' + email + '</a></p></div>';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			//Next use the same result geometry location to add a map marker to the map object variable.  Create a new variable, we'll call it oMarker, it will be created as a new google.maps.Marker.  The new method take two parameters, the first is the map object that you're adding the marker to, and the second is the position to place the marker which is again the first results geometry location.
			var marker = new google.maps.Marker({
				map: map, 
				position: results[0].geometry.location,
				title: sAddress,
				animation: google.maps.Animation.DROP
			});
			
			marker.setMap(map);
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		} else {
			//Finally we're going to add an alert message to the ELSE to let the user know that the Geocode didn't work like it should have.  You can use the status to give a bit more information rather than just saying that it didn't work.
			alert("Please enter an address"/* + status*/);
		}
	
		var coord = "" + results[0].geometry.location;
		var codeString = '&lt;meta name="description" content="Coworking Space Name: ' + spaceName + '"/&gt;\n&lt;meta name="ICBM" content="' + coord.substring(1, coord.length - 1) + '"/&gt;';
		$('pre').html(codeString);
	});
}