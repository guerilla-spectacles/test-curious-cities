var OddView = Backbone.View.extend({
	el: '#info-contents',
	events: {
		'click #save' : 'save',
		'change #location-file-input': 'extractLocation',
	},

	initialize: function(){
		var self = this;
		//Template for marker info
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
				<input id=\"location-file-input\" type=\"file\" accept=\"image/jpeg\" />\
				<p id=\"status\"></p>\
				<p class='always-hidden' id=\"locationURL\"></p>\
				<p class='always-hidden' id=\"latitideP\"></p>\
				<p class='always-hidden' id=\"longitudeP\"></p>\
				<div id=\"preview\"><img src=\"images/uploadPlaceholder.png\" style=\"width:300px;\" /></div>\
				<br>\
				<input type='submit' id='save' value='Submit'>\
			</form>\
		</div>";
		$('#info-contents').append(addLoc);
		console.log("");
	},

	//////////////////  Controls the sumbit/save button event //////////////////
	save: function(event){
		// event.preventDefault();
		var $locationName = $(this.el).find('#locationName').val();
		var $locationDesc = $(this.el).find('#description').val();
		var $categoryType = $(this.el).find("#selected").val();
		var $locationURL = $(this.el).find("#locationURL").html();
		var $locationLatitude = $(this.el).find("#latitideP").html();
		var $locationLongitude = $(this.el).find("#longitudeP").html();
		// var $categoryType = $(this.el).find("#catType");
		var selectedCategory;
		function displayVals() {
			selectedCategory = $( "#catType" ).val();
		}
		$( "select" ).change( displayVals );
		displayVals();
		// var $selectedCategory = $categoryType.options[$categoryType.selectedIndex].value;
		var newMarker = {
			img: ($locationURL),
			title: ($locationName),
			description: ($locationDesc),
			category: (selectedCategory),
			latitude: ($locationLatitude),
			longitude: ($locationLongitude)
		}

		toMap = function() {
			mapLocs.create(newMarker);
		};
		toMap();
	},

	extractLocation: function(e) {
	var photoFile = e.target.files[0];
	// if more than 1 file has been select, or if the selected file in bigger than 4MB
	if ((e.target.files.length !== 1) || (photoFile.size > 4000000)){
		alert("Please select a single jpeg file that is less that 4MB");
	} else {
		EXIF.getData(photoFile, function() {
	    	var photoData = EXIF.getAllTags(this);
	    	console.log(this);
	    	console.log(photoData);
	        if (photoData.GPSLatitudeRef != null || photoData.GPSLatitudeRef != undefined){
	        	var location = {},
	        		degreesLat = photoData.GPSLatitude[0], 
	        		minutesLat = photoData.GPSLatitude[1], 
	        		secondsLat = photoData.GPSLatitude[2],
	        		degreesLong = photoData.GPSLongitude[0], 
	        		minutesLong = photoData.GPSLongitude[1], 
	        		secondsLong = photoData.GPSLongitude[2],
	        		latitude = degreesLat + (minutesLat / 60) + (secondsLat / 3600),
	        		longitude = degreesLong + (minutesLong / 60) + (secondsLong / 3600);
	        		
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
		        var locLongitude = document.getElementById("longitudeP");
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
			            status_elem.innerHTML = 'Upload completed.';
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