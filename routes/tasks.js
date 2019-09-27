module.export = app => {

	const TasksModel = app.models.tasks;

	app.get("/tasks", function (req, res){
		TasksModel.findAll({}, (tasks) => {
			res.json({tasks: tasks})
		})
	})
}