module.exports = app => {
	app.set("port", 3000);
	app.set("json spaces", 4);
	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({ extended: true}));
};