const authController = require("./controllers/auth.controller");
const serviceController = require("./controllers/service.controller");
const bookingController = require("./controllers/booking.controller");

const routes = (app) => {
    const _routes = [
        ["auth", authController],
        ["service", serviceController],
        ["booking", bookingController],
    ];
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/v1/${url}`, controller);
    });
};

module.exports = routes;
