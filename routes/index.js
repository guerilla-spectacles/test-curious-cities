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
      res.render('index');
    });


});



router.post('/p/:id', function(req, res) {
  var id = req.param("id")
  , post = {
    text: req.param("answer")
  }

  db.newEventBuilder()
    .from(dbCollectionName, id)
    .type('post')
    .data(post)
    .then(function (results){
      res.redirect("/p/" + id);
    });
});

/** POST / create a new thing **/
router.post('/api', function (req, res){
  var name = "ian";
  console.log("POST?")

  db.post(dbCollectionName, {
    "name" : name
  })
  .then(function (result) {
    console.log("here i am");
  })
  .fail(function (err) {

  });
});

module.exports = router;
