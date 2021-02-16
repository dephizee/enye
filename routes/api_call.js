var express = require('express');
const fetch = require('node-fetch');

var router = express.Router();

/* GET users listing. */
router.get('/rates', async function (req, res, next)  {
  try {

	var query = req.query;
    console.log(query);
    query.currency = undefined == query.currency? "": query.currency;
    const apiResponse = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${query.base}&symbols=${query.currency}`
    )
    var apiResponseJson = await apiResponse.json();
    apiResponseJson = {
    	"results" : apiResponseJson,
    }
    console.log(apiResponseJson)
    res.status(200).send(apiResponseJson)
  } catch (err) {
    console.log(err)
    res.status(500).send({
	  	'error': "Internal Server Issue",
	  	'hint': "try again",
	  })
  }
});



module.exports = router;
