const m$mitra = require("../modules/user.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const mitraController = Router();

mitraController.get("/", async (req, res) => {
    const result = await m$mitra.getMitra();

    return response.sendResponse(res, result);
});

mitraController.get("/:id", async (req, res) => {
    const result = await m$mitra.getMitraById(req.params.id);

    return response.sendResponse(res, result);
});

mitraController.put("/update/:id", async (req, res) => {
    const result = await m$mitra.updateMitra(req.params.id, req.body);

    return response.sendResponse(res, result);
});

mitraController.delete("/delete/:id", async (req, res) => {
    const result = await m$mitra.deleteMitra(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = mitraController;
