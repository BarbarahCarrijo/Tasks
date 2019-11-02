module.exports = app => {

	const Tasks = app.db.models.Tasks;

	app.route("/tasks") //Middleware de pré-execução das rotas
		.all(app.auth.authenticate())
		.get((req, res) => { // "/Tasks": Lista todas as Tasks
			Tasks.findAll({
				where: {user_id: req.user.id}
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			req.body.UserId = req.user.id;
			Tasks.create(req.body) // "/Tasks": Cadastra uma nova task
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/tasks/:id")
		.all(app.auth.authenticate())
		.get((req, res) => { // "/Tasks/1": Consulta apenas uma task expecífica
			Tasks.findOne({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
				.then(result => {
					if (result){
						res.json(result);
					} else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => { // "/Tasks/1":Atuliza a task
			Tasks.update(req.body,{where: {
				id: req.params.id,
				user_id: req.user.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				})
		})
		.delete((req, res) => { // "/Tasks/1":Exclui a task
			Tasks.destroy({where: {
				id: req.params.id,
				user_id: req.user.id
			}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({ msg: error.message });
				});

		});

}