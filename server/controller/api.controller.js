const express = require('express')
	, router = express.Router();

	const apiService = require('../services/api.service');

router.get('/getInit', function (req, res) {
	res.send(apiService.getData());
})

module.exports = router


