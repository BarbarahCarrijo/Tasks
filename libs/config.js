module.exports = {
    database: "tasks",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "tasks.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "s$nh@",
    jwtSession: {session: false}
};