var sidebars = Backbone.View.extend({
	el: '#info-contents',
	events: {
		'click #save' : 'save',
		'change #file': 's3_upload'
	},

	initialize: function(opts){
		var self = this;

		oddity = "<div id=\"guide-button-div\" class=\"info-dropdown center\">\
			<h2>Closest Curiosties</h2>\
			<div class='curiousProfile'>\
			<h3>Angst on Angst</h3>\
			<img class='curious-img' src='public/images/jollyRog.jpg'>\
			<p class='curious-description'>This is a weird and ugly mural of some sort of hipster meta-angst.  #ugly</p>\
			</div>\
			<p class='curious-type'>Category:<br>\
			Art</p>\
			</div>";

		about = "<div id=\"about-button-div\" class=\"info-dropdown center\">\
			<h2>About Curious Cities</h2>\
			<p>\
				HI HI HI Magnis eros enim cursus. Et cursus adipiscing mauris ut aenean scelerisque tortor, facilisis adipiscing placerat scelerisque auctor platea, arcu in habitasse nunc pellentesque! Ut auctor et ut vel. In magna aliquet non! Ultrices sit sit nunc, enim turpis placerat ultricies dis lacus? Aliquet nec et in integer in ac elit placerat sed magna sagittis scelerisque!\
			</p>\
			<p>\
				Sed! Urna! Egestas turpis hac enim nascetur arcu integer, risus augue sit ultrices facilisis egestas, massa amet, porttitor montes nisi, pulvinar est vut porttitor enim? Tincidunt? Mus, sed platea a etiam eu aliquam ut enim. Etiam risus porttitor adipiscing velit mus, urna dapibus, nec! Natoque placerat, urna, non in magna, nisi elit odio! Vel risus nunc urna mauris urna facilisis et urna facilisis rhoncus integer.\
			</p>\
		</div>";
		
		addLoc = "<div id=\"add-button-div\" class=\"info-dropdown center\">\
			<h2>Add a new location</h2>\
			<form>\
				<input type='text' required name='location-name' placeholder='Location name'>\
				<br>\
				<textarea id='description' name='location-description' maxlength='140' placeholder='Description'></textarea>\
				<br>\
				<select name='oddity-type'>\
				<option value='Unspecified'>Category</option>\
				<option value='Art'>Art</option>\
				<option value='Nature'>Nature</option>\
				<option value='Architecture'>Architecture</option>\
				<option value='Other'>Other</option>\
				</select>\
				<p>Select image<br>\
				</p>\
				<!--\
				HOPING TO MAKE THIS DECORATIVE\
				<div class='fileUpload' required>\
    				<span>Upload</span>\
    				<input placeholder='choose file' type='file' class='form-button'>\
				</div>\
				-->\
				<input type=\"file\" id=\"files\"/>\
<p id=\"status\">Please select a file</p>\
<div id=\"preview\"><img src=\"public/images/default.png\" style=\"width:300px;\" /></div>\
				<br>\
				<input type='submit' class='center' value='Submit'>\
			</form>\
		</div>";

		if (opts == 'guide') {
			this.render('guide')
		} else if (opts == 'add') {
			this.render('add')
		} else if (opts == 'info') {
			;this.render('info')
		}

	},

	render: function(which){
		$('#info-contents').children().remove();
		if (which == 'guide'){
			$('#info-contents').append(oddity)
		} else if (which == 'add'){
			$('#info-contents').append(addLoc)
		} else if (which == 'info'){
			$('#info-contents').append(about)
		};

	},

	save: function(event){
					//event.preventDefault();
					console.log('yep, got a click');
					//var photoLoc = $('#photoInput').get(0).files[0];
					//console.log(photoLoc);
				},

	s3_upload: function() {
		var status_elem = document.getElementById("status");
	    var url_elem = document.getElementById("picture_url");
	    var preview_elem = document.getElementById("preview");
	    var s3upload = new S3Upload({
	        file_dom_selector: 'files',
	        s3_sign_put_url: '/sign_s3',
	        onProgress: function(percent, message) {
	            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
	        },
	        onFinishS3Put: function(public_url) {
	            status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
	            url_elem.value = public_url;
	            preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
	        },
	        onError: function(status) {
	            status_elem.innerHTML = 'Upload error: ' + status;
	        }
    });

	}	
// (function() {
//     var input_element = document.getElementById("files");
//     input_element.onchange = s3_upload;
// })();

})