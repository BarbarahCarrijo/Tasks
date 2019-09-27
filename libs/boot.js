module.exports = app => {

	app.listen(app.get("port"), () => {
		console.log("API de Tarefas rodando....")
	});

}