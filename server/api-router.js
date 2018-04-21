module.exports = api => {
	api.route('/getInit', (req, res) => {
		console.log("Jo");
		// res.render('./index', { req, res });
		res.send({name:"läuft"});
	});
};
