const m$promo = require("../modules/promo.module");
const upload = require("../middlewares/multer");
const response = require("../helpers/response");

const { Router } = require("express");

const promoController = Router();

promoController.post("/add", upload.single("photo"), async (req, res) => {
    const result = await m$promo.addPromo(req.body, req.file);

    return response.sendResponse(res, result);
});

promoController.get("/", async (req, res) => {
    const result = await m$promo.getPromo();

    return response.sendResponse(res, result);
});

promoController.get("/:id", async (req, res) => {
    const result = await m$promo.getPromoById(req.params.id);

    return response.sendResponse(res, result);
});

promoController.delete("/delete/:id", async (req, res) => {
    const result = await m$promo.deletePromo(req.params.id);

    return response.sendResponse(res, result);
});

module.exports = promoController;
