var express = require('express'),
	router = express.Router(),
	db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY),
  dbCollectionName = 'A-Most-Curious-Notion';


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

   db.newSearchBuilder()
    .collection(dbCollectionName)
    .limit(10)
    .query('*')
    .then(function (things){
      console.log("hello from the server after newSearchBuilder");
      db.post(dbCollectionName, {
        "name": "Ian in /"
      })
        db.list('collection')
      .then(function (result) {
        console.log(result.body.results);
      })
      .fail(function (err) {

      })
      console.log("after db.post");
      res.render('index');
    });


});



router.post('/c/:id', function(req, res) {
  var id = req.param("id")
  , post = {
    text: req.param("answer")
  }

  db.newEventBuilder()
    .from(dbCollectionName, id)
    .type('post')
    .data(post)
    .then(function (results){
      res.redirect("/c/" + id);
    });
});

/** POST / create a new thing **/
router.post('/api', function (req, res){
  var location = req.param('#locationName'),
      description =  req.param('#description'),
      selected = req.param('#selected'),
      locationURL = req.param('#locationURL'),
      latitideP =  req.param('#latitideP'),
      longitudeP = req.param('#longitudeP');

  db.post(dbCollectionName, {
      "location" : location,
      "description" : description,
      "selected" : selected,
      "locationURL" : locationURL,
      "latitideP" : latitideP,
      "longitudeP" : longitudeP
      })
  .then(function (result) {
    var responseKey = result.headers.location.split("/")[3];
    res.redirect('/c/' + responseKey);
  })
  .fail(function (err) {

  });
  
});

module.exports = router;
