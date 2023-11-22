const authController = require("./controllers/auth.controller");

const routes = (app) => {
    const _routes = [["auth", authController]];
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/v1/${url}`, controller);
    });
};

module.exports = routes;
