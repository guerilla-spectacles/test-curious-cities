
$( document ).ready(function() {
  /*
	$("#add-button").on('click', function() {
		$("#add-pic-div").toggleClass("hidden");
		$("#guide-me-div").addClass("hidden");
		$("#about-div").addClass("hidden");
	});
*/	
	$("#guide-button").on('click', function() {
	  	$("#guide-me-div").toggleClass("hidden");
	  	$("#add-pic-div").addClass("hidden");
		$("#about-div").addClass("hidden");	
	});

	$("#about-button").on('click', function() {
		$("#about-div").toggleClass("hidden");
	  	$("#add-pic-div").addClass("hidden");
		$("#guide-me-div").addClass("hidden");	
	});

});