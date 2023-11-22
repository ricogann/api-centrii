const m$auth = require("../modules/auth.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const authController = Router();

authController.post("/login/user", async (req, res) => {
    const result = await m$auth.login(req.body);

    return response.sendResponse(res, result);
});

authController.post("/register/user", async (req, res) => {
    const result = await m$auth.register(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login/mitra", async (req, res) => {
    const result = await m$auth.loginMitra(req.body);

    return response.sendResponse(res, result);
});

authController.post("/register/mitra", async (req, res) => {
    const result = await m$auth.registerMitra(req.body);

    return response.sendResponse(res, result);
});

authController.post("/login/admin", async (req, res) => {
    const result = await m$auth.loginAdmin(req.body);

    return response.sendResponse(res, result);
});

authController.post("/register/admin", async (req, res) => {
    const result = await m$auth.registerAdmin(req.body);

    return response.sendResponse(res, result);
});

module.exports = authController;
