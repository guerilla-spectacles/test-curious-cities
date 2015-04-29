//////////////////  Creates Sidebar View //////////////////
var sidebars = Backbone.View.extend({
	el: '#info-contents',
	events: {
		'click #save' : 'save',
		// 'click #save' : 'test',
		// 'change #location-file-input': 's3_upload',
		'change #location-file-input': 'extractLocation',
		'markerClick' : 'renderMarkerInfo'
	},

	initialize: function(opts){
		var self = this;

		//////////////////  Selected marker sidebar //////////////////
		
		//Template for marker info
		var template = "<div id='guide-button-div' class='info-dropdown center'><h2>Closest Curiosties</h2><div class='curiousProfile'><h3>{{title}}</h3><img class='curious-img' src='{{img}}'><p class='curious-description'>{{description}}</p><p class='curious-type'>Category:{{curiousType}}</p></div>"
		
		//Converts marker info into template material
		var theCode = Mustache.to_html(template, fakeDB.locations[1]);

		//makes the sidebar section
		oddity = theCode;

		var $name     

		///////////Working on populating the "what's nearby" list with titles from the markers
		// <div id='guide-button-div' class='info-dropdown center'><h2>Closest Curiosties</h2>
		// for (i = 0; i <= locationList.length; i++) {

		// }
		// console.log(locationList);

		//////////////////  About Curious Cities Sidebar//////////////////
		about = "<div id=\"about-button-div\" class=\"info-dropdown center\">\
			<h2>About Curious Cities</h2>\
			<p>\
				HI HI HI Magnis eros enim cursus. Et cursus adipiscing mauris ut aenean scelerisque tortor, facilisis adipiscing placerat scelerisque auctor platea, arcu in habitasse nunc pellentesque! Ut auctor et ut vel. In magna aliquet non! Ultrices sit sit nunc, enim turpis placerat ultricies dis lacus? Aliquet nec et in integer in ac elit placerat sed magna sagittis scelerisque!\
			</p>\
			<p>\
				Sed! Urna! Egestas turpis hac enim nascetur arcu integer, risus augue sit ultrices facilisis egestas, massa amet, porttitor montes nisi, pulvinar est vut porttitor enim? Tincidunt? Mus, sed platea a etiam eu aliquam ut enim. Etiam risus porttitor adipiscing velit mus, urna dapibus, nec! Natoque placerat, urna, non in magna, nisi elit odio! Vel risus nunc urna mauris urna facilisis et urna facilisis rhoncus integer.\
			</p>\
		</div>";
		
		//////////////////  Add Location Sidebar //////////////////
		addLoc = "<div id=\"add-button-div\" class=\"info-dropdown center\">\
			<h2>Add a new location</h2>\
			<form>\
				<input type='text' id='locationName' required name='location-name' placeholder='Location name'>\
				<br>\
				<textarea id='description' name='location-description' maxlength='140' placeholder='Description'></textarea>\
				<br>\
				<select id='catType' name='oddity-type'>\
				<option value='Unspecified'>Category</option>\
				<option value='Art'>Art</option>\
				<option value='Nature'>Nature</option>\
				<option value='Architecture'>Architecture</option>\
				<option value='Other'>Other</option>\
				</select>\
				<p>Upload an image of the location!<br>\
				</p>\
				<!--\
				HOPING TO MAKE THIS DECORATIVE\
				<div class='fileUpload' required>\
    				<span>Upload</span>\
    				<input placeholder='choose file' id='selectedFile' type='file' class='form-button'>\
				</div>\
				-->\
				<span>Upload file to see location in console</span>\
				<input id=\"location-file-input\" type=\"file\" accept=\"image/jpeg\" />\
				<p id=\"status\"></p>\
				<p id=\"locationURL\"></p>\
				<p id=\"latitideP\"></p>\
				<p id=\"longitudeP\"></p>\
				<div id=\"preview\"><img src=\"images/uploadPlaceholder.png\" style=\"width:300px;\" /></div>\
				<br>\
				<input type='submit' id='save' value='Submit'>\
			</form>\
		</div>";

		//////////////////  Connects opts with render //////////////////		
		if (opts == 'guide') {
			this.render('guide')
		} else if (opts == 'add') {
			this.render('add')
		} else if (opts == 'info') {
			;this.render('info')
		}

	},

	//////////////////  Renders the sidebars //////////////////
	render: function(which){

		// document.getElementById(#info-contents).innerHTML = " ";
		$('#info-contents').empty();
		$('#info-contents').children().remove();
		// $('#info-contents').innerHTML = "";
		if (which == 'guide'){
			$('#info-contents').append(oddity)
		} else if (which == 'add'){
			$('#info-contents').append(addLoc)
		} else if (which == 'info'){
			$('#info-contents').append(about)
		};

	},



	//////////////////  Controls the sumbit/save button event //////////////////
	save: function(event){
		event.preventDefault();
		var $locationName = $(this.el).find('#locationName').val();
		var $locationDesc = $(this.el).find('#description').val();
		var $categoryType = $(this.el).find("#selected").val();
		var $locationURL = $(this.el).find("#locationURL").html();
		var $locationLatitude = $(this.el).find("#latitideP").html();
		var $locationLongitude = $(this.el).find("#longitudeP").html();
		var newMarker = {
				img: ($locationURL),
				title: ($locationName),
				description: ($locationDesc ),
				category: ($categoryType),
				latitude: ($locationLatitude),
				longitude: ($locationLongitude)
			}
		//event.preventDefault();
		console.log('yep, got a click');
		console.log($locationName);
		console.log($locationDesc);
		console.log($categoryType);
		console.log($locationURL);
		console.log("test photo long." +$locationLongitude);
		console.log("test photo lat" + $locationLatitude);


		toMap = function() {


			///////FOR WHEN ORCHESTRATE IS SET UP!
			// mapLocs.create(newMarker);

			//////////Delete when orchestrate is set up
			mapLocs.add(newMarker);

			
				// var newMarkerView = new MarkerView({model: newMarker});
			// console.log('before markerView Render');
		};
		toMap();

		toOrchestrate = function(){

		};
		//console.log($locationURL);
		//var photoLoc = $('#photoInput').get(0).files[0];
		//console.log(photoLoc);
	// 	(function() {
 //    	var input_element = document.getElementById("files");
 //    	input_element.onchange = s3_upload;
	// })()
	},

	//////////////////  Controls the upload  //////////////////
	// s3_upload: function() {
	// 	        ////////s#_upload ////////////////
	// 	        var status_elem = document.getElementById("status");
	// 		    // var url_elem = document.getElementById("picture_url");
	// 		    var preview_elem = document.getElementById("preview");
	// 		    var s3upload = new S3Upload({
	// 		        file_dom_selector: 'location-file-input',
	// 		        s3_sign_put_url: '/sign_s3',
	// 		        onProgress: function(percent, message) {
	// 		            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
	// 		        },
	// 		        onFinishS3Put: function(public_url) {
	// 		            status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
	// 		            // url_elem.value = public_url;
	// 		            preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
	// 		            console.log(public_url);
	// 		        },
	// 		        onError: function(status) {
	// 		            status_elem.innerHTML = 'Upload error: ' + status;
	// 		        }
	// 	    	});
	// },

	//////////////////  Gets location data  //////////////////

	extractLocation: function(e) {
	var photoFile = e.target.files[0];
	// if more than 1 file has been select, or if the selected file in bigger than 4MB
	if ((e.target.files.length !== 1) || (photoFile.size > 4000000)){
		alert("Please select a single jpeg file that is less that 4MB");
	} else {
			EXIF.getData(photoFile, function() {
	        var photoData = EXIF.getAllTags(this);
	        if (photoData.GPSLatitudeRef != null || photoData.GPSLatitudeRef != undefined){
	        	var location = {},
	        		degreesLat = photoData.GPSLatitude[0], 
	        		minutesLat = photoData.GPSLatitude[1], 
	        		secondsLat = photoData.GPSLatitude[2],
	        		degreesLong = photoData.GPSLongitude[0], 
	        		minutesLong = photoData.GPSLongitude[1], 
	        		secondsLong = photoData.GPSLongitude[2],

	        		latitude = degreesLat + (minutesLat / 60) + (secondsLat / 36000),
	        		longitude = degreesLong + (minutesLong / 60) + (secondsLong / 36000);
	        		
	        		if (photoData.GPSLatitudeRef === "S") {
	        			latitude = ("-" + latitude);
	        		} 
	        		if (photoData.GPSLongitudeRef === "W") {
	        			longitude = ("-" + longitude);
	        		}

	        		location.latitude = parseFloat(latitude);

	        		location.longitude = parseFloat(longitude);

		        //degrees is photoData.GPSLatitude[0], minutes is photoData.GPSLatitude[1], photoData.GPSLatitude[2]
		        // Decimal Degrees = Degrees + minutes/60 + seconds/3600
		        ////////s#_upload ////////////////
		        var locURL = document.getElementById("locationURL");
		        var locLatitude = document.getElementById("latitideP");
		        console.log(locLatitude);
		        var locLongitude = document.getElementById("longitudeP");
		        console.log(locLongitude);
		        var status_elem = document.getElementById("status");
			    // var url_elem = document.getElementById("picture_url");
			    var preview_elem = document.getElementById("preview");
			    var s3upload = new S3Upload({
			        file_dom_selector: 'location-file-input',
			        s3_sign_put_url: '/sign_s3',
			        onProgress: function(percent, message) {
			            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
			        },
			        onFinishS3Put: function(public_url) {
			            status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
			            // url_elem.value = public_url;
			            preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
			            //console.log(public_url);
			            var publicURL = public_url;
			            $(this.el).find("#status").val(public_url);
			            var $statusID = $(this.el).find("#status");
			            console.log($statusID);
			            locationURL.innerHTML = public_url;
			            locLatitude.innerHTML = location.latitude;
			            locLongitude.innerHTML = location.longitude;
			            console.log(public_url);
			            console.log('here we go');
			            console.log(publicURL);
			            //$(this.el).find("#status").val(public_url); //add public url to html id
			        },
			        onError: function(status) {
			            status_elem.innerHTML = 'Upload error: ' + status;
			        }
		    	});

		    	//$locationURL.val('changed location value');
		    	//console.log($locationURL).val();
		        // return location; 
		        //console.log(location);

		        // console.log(photoData);
			    } 
		    	else {
		    		alert("file contains no location data");
		    	}
	        }
		)}

	}

})









