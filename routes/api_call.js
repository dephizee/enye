var express = require('express');
const fetch = require('node-fetch');

var router = express.Router();

/* GET users listing. */
router.get('/rates', async function (req, res, next)  {
  try {

	var query = req.query;
    console.log(query);
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
    res.status(500).send('Something went wrong')
  }
});

router.get('/rates_my_server', async function (req, res, next)  {
  try {

	var query = req.query;
    console.log(query);
    const apiResponse = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${query.base}` 
    )
    const apiResponseJson = await apiResponse.json()
    var rates = apiResponseJson.rates;
    var currencies = query.currency.split(",");
    apiResponseJson.rates = Object.keys(rates)
		  .filter(key => currencies.includes(key))
		  .reduce((obj, key) => {
		    obj[key] = rates[key];
		    return obj;
		  }, {});
    
    console.log(apiResponseJson)
    res.send(apiResponseJson)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
});

module.exports = router;
