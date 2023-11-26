const m$user = require("../modules/user.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const userController = Router();

userController.get("/", async (req, res) => {
    const result = await m$user.getUser();

    return response.sendResponse(res, result);
});

userController.get("/:id", async (req, res) => {
    const result = await m$user.getUserById(req.params.id);

    return response.sendResponse(res, result);
});

userController.put("/update/:id", async (req, res) => {
    const result = await m$user.updateUser(req.params.id, req.body);

    return response.sendResponse(res, result);
});

userController.delete("/delete/:id", async (req, res) => {
    const result = await m$user.deleteUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.put("/update/status/user/:id", async (req, res) => {
    const result = await m$user.updateStatusUser(req.params.id);

    return response.sendResponse(res, result);
});

userController.put("/update/status/mitra/:id", async (req, res) => {
    const result = await m$user.updateStatusMitra(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = userController;
