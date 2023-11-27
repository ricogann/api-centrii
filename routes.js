const authController = require("./controllers/auth.controller");
const serviceController = require("./controllers/service.controller");
const bookingController = require("./controllers/booking.controller");
const mitraController = require("./controllers/mitra.controller");
const userController = require("./controllers/user.controller");
const promoController = require("./controllers/promo.controller");
const midtransController = require("./controllers/midtrans.controller");

const routes = (app) => {
    const _routes = [
        ["auth", authController],
        ["service", serviceController],
        ["booking", bookingController],
        ["mitra", mitraController],
        ["user", userController],
        ["promo", promoController],
        ["midtrans", midtransController],
    ];
    _routes.forEach((route) => {
        const [url, controller] = route;

        app.use(`/v1/${url}`, controller);
    });
};

module.exports = routes;
